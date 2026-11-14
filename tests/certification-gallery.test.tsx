import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it } from 'vitest';
import ResourceLibrary from '../src/ResourceLibrary.tsx';
import { certificationProviders, resources } from '../src/resources.ts';

beforeEach(() => window.history.replaceState(null, '', '/resources?category=certifications'));
afterEach(cleanup);

it('groups certifications beneath provider headings with only badges and titles visible', () => {
  render(<ResourceLibrary initialCategory="certifications" />);
  for (const provider of certificationProviders) {
    const section = screen.getByRole('region', { name: provider.name });
    expect(within(section).getByRole('heading', { name: provider.name, level: 3 })).toBeTruthy();
    const expected = resources.filter(resource => resource.category === 'certifications' && resource.provider === provider.id);
    const cards = within(section).getAllByRole('link');
    expect(cards.map(card => card.querySelector('h4')?.textContent)).toEqual(expected.map(cert => cert.title));
    for (const card of cards) {
      expect(card.querySelector('.certification-badge')).toBeTruthy();
      expect(card.querySelector('.resource-meta, p, svg')).toBeNull();
      expect(card.getAttribute('target')).toBe('_blank');
      expect(card.getAttribute('rel')).toContain('noopener');
    }
  }
  expect(screen.queryByRole('region', { name: 'IBM' })).toBeNull();
  expect(screen.queryByRole('region', { name: 'DataCamp' })).toBeNull();
  expect(screen.queryByRole('link', { name: /IBM Data Science Professional Certificate/ })).toBeNull();
  expect(screen.queryByRole('link', { name: /DataCamp Data Scientist Certification/ })).toBeNull();
});

it('searches by provider name and removes empty groups', async () => {
  const user = userEvent.setup();
  render(<ResourceLibrary initialCategory="certifications" />);
  await user.type(screen.getByRole('searchbox'), 'Amazon Web Services');
  expect(screen.getByRole('status').textContent).toBe('3 resources');
  expect(screen.getByRole('region', { name: 'Amazon Web Services' })).toBeTruthy();
  expect(screen.queryByRole('region', { name: 'Microsoft Azure' })).toBeNull();
  await user.clear(screen.getByRole('searchbox'));
  await user.type(screen.getByRole('searchbox'), 'Snowflake');
  expect(screen.getByRole('region', { name: 'Snowflake' })).toBeTruthy();
  expect(screen.queryByRole('region', { name: 'Amazon Web Services' })).toBeNull();
});

it('keeps chooser and reset working across the grouped certification cards', async () => {
  const user = userEvent.setup();
  render(<ResourceLibrary initialCategory="certifications" />);
  const results = document.getElementById('resource-results');
  if (!results) throw new Error('Missing resource results');
  const original = within(results).getAllByRole('link').map(link => link.getAttribute('href'));
  expect(original).toHaveLength(12);
  await user.click(screen.getByRole('button', { name: 'Choose for me' }));
  expect(within(results).getAllByRole('link')).toHaveLength(3);
  expect(screen.getByRole('status').textContent).toContain('3 picks from 12 matches');
  for (const provider of screen.getAllByRole('heading', { level: 3 })) {
    expect(provider.closest('section')?.querySelectorAll('a').length).toBeGreaterThan(0);
  }
  await user.click(screen.getByRole('button', { name: 'Show all matches' }));
  expect(within(results).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(original);
  expect(window.location.search).toBe('?category=certifications');
  const aws = screen.getByRole('link', { name: /AWS Certified AI Practitioner/ });
  aws.focus();
  expect(document.activeElement).toBe(aws);
});
