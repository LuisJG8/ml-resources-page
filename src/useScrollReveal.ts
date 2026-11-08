import { useLayoutEffect } from 'react';
import { observeScrollReveals } from './scroll-reveal.ts';
import './scroll-reveal.css';

export function useScrollReveal() {
  // Classify the opening viewport before paint, avoiding a flash of hidden UI.
  useLayoutEffect(() => observeScrollReveals(document, window), []);
}
