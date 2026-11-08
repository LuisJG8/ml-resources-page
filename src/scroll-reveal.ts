const selector = '[data-reveal]';

export interface ScrollRevealEnvironment {
  matchMedia: Window['matchMedia'];
  innerHeight: number;
  IntersectionObserver?: typeof IntersectionObserver;
  MutationObserver?: typeof MutationObserver;
  requestAnimationFrame?: Window['requestAnimationFrame'];
  cancelAnimationFrame?: Window['cancelAnimationFrame'];
  addEventListener: Window['addEventListener'];
  removeEventListener: Window['removeEventListener'];
}

export type RevealRect = Pick<DOMRect, 'width' | 'height' | 'top' | 'right' | 'bottom' | 'left'>;

export function isInOpeningViewport(rect: RevealRect, viewport: { width: number; height: number }): boolean {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < viewport.height && rect.left < viewport.width;
}

export function observeScrollReveals(root: Document, environment: ScrollRevealEnvironment): () => void {
  const preference = environment.matchMedia('(prefers-reduced-motion: reduce)');
  // Without observation or with reduced motion, the normal visible styles win.
  if (!environment.IntersectionObserver || preference.matches) return () => {};

  const targets = new Set<HTMLElement>();
  const waitingForImage = new Set<HTMLElement>();
  let active = true;
  let disabled = false;
  const viewport = () => ({ width: root.documentElement.clientWidth, height: environment.innerHeight });
  const reveal = (element: HTMLElement, immediate = false) => {
    if (!targets.has(element)) return;
    // An already queued observation must not animate content that was made
    // immediate by keyboard focus or native scroll restoration.
    if (!immediate && element.dataset.revealState !== 'pending') return;
    // Offscreen illustrations must fade their pixels, not an unloaded box.
    if (!immediate && element.tagName === 'IMG' && (!element.getAttribute('src') || !(element as HTMLImageElement).complete)) {
      waitingForImage.add(element);
      return;
    }
    element.dataset.revealState = immediate ? 'immediate' : 'visible';
    waitingForImage.delete(element);
    observer.unobserve(element);
  };
  const observer = new environment.IntersectionObserver(entries => {
    if (!active || disabled) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      else waitingForImage.delete(entry.target as HTMLElement);
    });
  }, { threshold: 0, rootMargin: '0px 0px -16px 0px' });

  const register = (element: HTMLElement, opening = false) => {
    if (targets.has(element)) return;
    targets.add(element);
    const focused = element.contains(root.activeElement);
    if (disabled || focused || (opening && isInOpeningViewport(element.getBoundingClientRect(), viewport()))) {
      reveal(element, true);
    } else {
      element.dataset.revealState = 'pending';
      observer.observe(element);
    }
  };
  root.querySelectorAll<HTMLElement>(selector).forEach(element => register(element, true));

  // Lazy library content and data bubbles join the same one-time reveal system.
  const mutations = environment.MutationObserver && new environment.MutationObserver(records => {
    if (!active) return;
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const element = node as HTMLElement;
      if (element.matches(selector)) register(element);
      element.querySelectorAll<HTMLElement>(selector).forEach(child => register(child));
    }));
    targets.forEach(element => {
      if (!element.isConnected) {
        observer.unobserve(element);
        waitingForImage.delete(element);
        targets.delete(element);
      }
    });
  });
  mutations?.observe(root.body, { childList: true, subtree: true });

  const focused = (event: Event) => {
    const target = event.target as Node | null;
    if (!target) return;
    targets.forEach(element => {
      if (element.contains(target) || target.contains(element)) reveal(element, true);
    });
  };
  const imageReady = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (target && waitingForImage.has(target)) reveal(target);
  };
  const showAll = () => targets.forEach(element => reveal(element, true));
  const respectMotionPreference = (event: MediaQueryListEvent) => {
    if (event.matches) {
      disabled = true;
      showAll();
      observer.disconnect();
    }
  };
  // Account for native scroll restoration before the initial page is shown.
  const pageShown = () => targets.forEach(element => {
    if (isInOpeningViewport(element.getBoundingClientRect(), viewport())) reveal(element, true);
  });
  let openingFrame: number | undefined;
  const scheduleOpeningViewport = () => {
    if (environment.requestAnimationFrame) {
      if (openingFrame !== undefined) environment.cancelAnimationFrame?.(openingFrame);
      openingFrame = environment.requestAnimationFrame(() => { if (active) pageShown(); });
    } else pageShown();
  };
  scheduleOpeningViewport();
  root.addEventListener('focusin', focused);
  root.addEventListener('load', imageReady, true);
  root.addEventListener('error', imageReady, true);
  environment.addEventListener('beforeprint', showAll);
  environment.addEventListener('pageshow', scheduleOpeningViewport);
  preference.addEventListener('change', respectMotionPreference);

  return () => {
    active = false;
    observer.disconnect();
    mutations?.disconnect();
    root.removeEventListener('focusin', focused);
    root.removeEventListener('load', imageReady, true);
    root.removeEventListener('error', imageReady, true);
    environment.removeEventListener('beforeprint', showAll);
    environment.removeEventListener('pageshow', scheduleOpeningViewport);
    if (openingFrame !== undefined) environment.cancelAnimationFrame?.(openingFrame);
    preference.removeEventListener('change', respectMotionPreference);
    targets.forEach(element => delete element.dataset.revealState);
    targets.clear();
    waitingForImage.clear();
  };
}
