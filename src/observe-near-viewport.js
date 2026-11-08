// Begin fetching shortly before an image is visible, rather than relying on
// browser lazy-loading distances that can include most of this short page.
export function observeNearViewport(element, load, environment = window) {
  let observer;
  let finished = false;
  const link = element.closest('a');
  const cleanup = () => {
    observer?.disconnect();
    environment.removeEventListener('beforeprint', beforePrint);
    link?.removeEventListener('focus', onFocus);
  };
  const reveal = (printing = false) => {
    if (finished) return;
    finished = true;
    cleanup();
    load(printing);
  };
  const beforePrint = () => reveal(true);
  const onFocus = () => reveal();

  if (!environment.IntersectionObserver) {
    reveal();
    return cleanup;
  }

  observer = new environment.IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) reveal();
  }, { rootMargin: '300px 0px', threshold: 0 });
  observer.observe(element);
  environment.addEventListener('beforeprint', beforePrint);
  link?.addEventListener('focus', onFocus);
  return () => {
    finished = true;
    cleanup();
  };
}
