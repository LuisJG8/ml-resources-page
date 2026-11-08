const selector = '[data-reveal]';

export function isInOpeningViewport(rect, viewport) {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < viewport.height && rect.left < viewport.width;
}

export function observeScrollReveals(root, environment) {
  const preference = environment.matchMedia('(prefers-reduced-motion: reduce)');
  // Without observation or with reduced motion, the normal visible styles win.
  if (!environment.IntersectionObserver || preference.matches) return () => {};

  const targets = new Set();
  const waitingForImage = new Set();
  let active = true;
  let disabled = false;
  const viewport = () => ({ width: root.documentElement.clientWidth, height: environment.innerHeight });
  const reveal = (element, immediate = false) => {
    if (!targets.has(element)) return;
    // An already queued observation must not animate content that was made
    // immediate by keyboard focus or native scroll restoration.
    if (!immediate && element.dataset.revealState !== 'pending') return;
    // Offscreen illustrations must fade their pixels, not an unloaded box.
    if (!immediate && element.tagName === 'IMG' && (!element.getAttribute('src') || !element.complete)) {
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
      if (entry.isIntersecting) reveal(entry.target);
      else waitingForImage.delete(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -16px 0px' });

  const register = (element, opening = false) => {
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
  root.querySelectorAll(selector).forEach(element => register(element, true));

  // Lazy library content and data bubbles join the same one-time reveal system.
  const mutations = environment.MutationObserver && new environment.MutationObserver(records => {
    if (!active) return;
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches(selector)) register(node);
      node.querySelectorAll(selector).forEach(element => register(element));
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

  const focused = event => targets.forEach(element => {
    if (element.contains(event.target) || event.target.contains(element)) reveal(element, true);
  });
  const imageReady = event => {
    if (waitingForImage.has(event.target)) reveal(event.target);
  };
  const showAll = () => targets.forEach(element => reveal(element, true));
  const respectMotionPreference = event => {
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
  let openingFrame;
  const scheduleOpeningViewport = () => {
    if (environment.requestAnimationFrame) {
      environment.cancelAnimationFrame(openingFrame);
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
    environment.cancelAnimationFrame?.(openingFrame);
    preference.removeEventListener('change', respectMotionPreference);
    targets.forEach(element => delete element.dataset.revealState);
    targets.clear();
    waitingForImage.clear();
  };
}
