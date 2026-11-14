import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { App } from '../src/App.tsx';
import { resourceCategories } from '../src/resources.ts';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each(['Modeling', 'Production'])('opens the full resource library from %s', async stage => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  window.history.replaceState(null, '', '/');

  const homepage = render(<App />);
  const section = screen.getByRole('region', { name: new RegExp(`${stage}$`) });
  const libraryLink = within(section).getAllByRole<HTMLAnchorElement>('link')
    .find(link => new URL(link.href).pathname === '/resources');
  if (!libraryLink) throw new Error(`Missing library link in ${stage}`);
  const destination = libraryLink.href;
  homepage.unmount();

  // Model the same-tab navigation in jsdom, which cannot load a new document.
  window.history.pushState(null, '', destination);
  render(<App />);
  await screen.findByRole('heading', { name: 'Resource library', level: 1 });
  for (const category of resourceCategories) {
    expect(screen.getByRole('region', { name: new RegExp(`^${category.label}`) })).toBeTruthy();
  }
  expect(screen.getByRole('link', { name: /AWS Certified AI Practitioner/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Microsoft Certified: Azure Data Fundamentals/ })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'View all resources' })).toBeNull();
});
