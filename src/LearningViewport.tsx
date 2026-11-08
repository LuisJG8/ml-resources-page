import type { PropsWithChildren } from 'react';

// Keep the complete pipe entry visible for the new introductory heading.
export function LearningViewport({ children }: PropsWithChildren) {
  return <div className="learning-viewport">{children}</div>;
}
