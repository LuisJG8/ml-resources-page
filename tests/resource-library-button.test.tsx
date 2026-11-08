import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResourceLibrary from '../src/ResourceLibrary.tsx';
import { filterLibraryResources, resourceLibraryHref } from '../src/resource-library-state.ts';
import { resourceCategories } from '../src/resources.ts';

const chooseButton = () => screen.getByRole<HTMLButtonElement>('button', { name: /^Choose (for me|again)$/ });
const resultLinks = () => {
  const results = document.getElementById('resource-results');
  if (!results) throw new Error('Resource results are missing');
  return within(results).queryAllByRole<HTMLAnchorElement>('link');
};
const resultUrls = () => resultLinks().map(link => link.href);

beforeEach(() => window.history.replaceState(null, '', '/resources'));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Choose for me button', () => {
  it('clicks the real button and limits rendered cards to three per format', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary />);
    expect(resultLinks()).toHaveLength(19);
    const button = chooseButton();
    await user.click(button);

    expect(resultLinks()).toHaveLength(14);
    expect(new Set(resultUrls()).size).toBe(14);
    expect(screen.getByRole('status').textContent).toContain('14 picks from 19 matches');
    expect(document.activeElement).toBe(button);
    expect(button.textContent).toBe('Choose again');
    expect(screen.getByText('Up to 3 per category. Categories with 3 or fewer matches keep all their resources.')).toBeTruthy();
    expect(window.location.search).toBe('');
    for (const category of resourceCategories) {
      const section = document.getElementById(`category-${category.id}`)?.closest('section');
      if (!section) throw new Error(`Missing category section: ${category.id}`);
      const available = filterLibraryResources({ category: category.id });
      expect(within(section).getAllByRole('link')).toHaveLength(Math.min(3, available.length));
    }
  });

  it('redraws actual cards on another click and announces each selection', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary initialCategory="tutorials" />);
    const random = vi.spyOn(Math, 'random').mockReturnValue(0);
    await user.click(chooseButton());
    const first = resultUrls();
    expect(first).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toContain('Selection 1.');
    random.mockReturnValue(0.999999);
    await user.click(chooseButton());
    expect(resultUrls()).not.toEqual(first);
    expect(resultLinks()).toHaveLength(3);
    expect(screen.getByRole('status').textContent).toContain('Selection 2.');
  });

  it('respects combined filters and restores all matches without changing the URL', async () => {
    const user = userEvent.setup();
    const filters = { group: 'Modeling', query: 'model', category: 'tutorials' } as const;
    render(<ResourceLibrary initialGroup={filters.group} initialQuery={filters.query} initialCategory={filters.category} />);
    const expected = filterLibraryResources(filters).map(resource => resource.url);
    const url = resourceLibraryHref(filters.group, filters.query, filters.category);
    await user.click(chooseButton());
    expect(resultUrls().every(url => expected.includes(url))).toBe(true);
    expect(window.location.pathname + window.location.search).toBe(url);
    await user.click(screen.getByRole('button', { name: 'Show all matches' }));
    expect(resultUrls()).toEqual(expected);
    expect(window.location.pathname + window.location.search).toBe(url);
    expect(screen.queryByRole('button', { name: 'Show all matches' })).toBeNull();
    expect(chooseButton().textContent).toBe('Choose for me');
    expect(document.activeElement).toBe(chooseButton());
  });

  it('clears the shortlist when search or category changes', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary />);
    await user.click(chooseButton());
    await user.type(screen.getByRole('searchbox', { name: 'Search resources' }), 'pandas');
    expect(screen.getByRole('status').textContent).toBe('1 resource');
    expect(resultUrls()).toEqual(filterLibraryResources({ query: 'pandas' }).map(resource => resource.url));
    expect(chooseButton().textContent).toBe('Choose for me');
    await user.clear(screen.getByRole('searchbox'));
    await user.click(chooseButton());
    await user.click(screen.getByRole('button', { name: 'Tutorials & docs' }));
    expect(resultLinks()).toHaveLength(8);
    expect(screen.getByRole('status').textContent).toBe('8 resources');
    expect(screen.queryByRole('button', { name: 'Show all matches' })).toBeNull();
  });

  it('clears the shortlist when the stage reset is clicked while retaining other filters', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary initialGroup="Modeling" initialQuery="model" initialCategory="tutorials" />);
    await user.click(chooseButton());
    await user.click(screen.getByRole('button', { name: 'View all resources' }));
    expect(resultUrls()).toEqual(filterLibraryResources({ query: 'model', category: 'tutorials' }).map(resource => resource.url));
    expect(window.location.search).toBe('?category=tutorials&q=model');
    expect(screen.queryByRole('button', { name: 'Show all matches' })).toBeNull();
  });

  it('keeps all cards in small categories and explains why they stay the same', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary initialCategory="videos" />);
    const original = resultUrls();
    await user.click(chooseButton());
    expect(resultUrls()).toEqual(original);
    expect(screen.getByRole('status').textContent).toContain('1 pick from 1 match');
    expect(chooseButton().textContent).toBe('Choose again');
    expect(screen.getByText(/Categories with 3 or fewer matches keep all their resources/)).toBeTruthy();
  });

  it('disables choosing when no resources match', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary initialQuery="no-such-resource-xyz" />);
    expect(chooseButton().disabled).toBe(true);
    await user.click(chooseButton());
    expect(resultLinks()).toHaveLength(0);
    expect(screen.getByRole('status').textContent).toBe('0 resources');
    expect(screen.queryByRole('button', { name: 'Show all matches' })).toBeNull();
  });

  it('supports Tab, Enter, and Space without losing focus', async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary />);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('searchbox'));
    await user.tab();
    const button = chooseButton();
    expect(document.activeElement).toBe(button);
    await user.keyboard('{Enter}');
    expect(resultLinks()).toHaveLength(14);
    await user.keyboard(' ');
    expect(screen.getByRole('status').textContent).toContain('Selection 2.');
    expect(document.activeElement).toBe(button);
  });

  it('starts with the full filtered list on a fresh mount', async () => {
    const user = userEvent.setup();
    const view = render(<ResourceLibrary initialCategory="tutorials" />);
    await user.click(chooseButton());
    expect(resultLinks()).toHaveLength(3);
    view.unmount();
    render(<ResourceLibrary initialCategory="tutorials" />);
    expect(resultLinks()).toHaveLength(8);
    expect(chooseButton().textContent).toBe('Choose for me');
  });
});
