import type { Resource } from './resources.ts';
import { ProgressiveImage } from './ProgressiveImage.tsx';

export function ResourceCard({ resource, headingLevel = 3 }: { resource: Resource; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 4 ? 'h4' : 'h3';
  const certification = resource.category === 'certifications';

  return <a data-reveal="" className={`resource-card${certification ? ' certification-card' : ''}`} href={resource.url} target="_blank" rel="noopener noreferrer">
    <span className="resource-card-artwork" aria-hidden="true">
      <ProgressiveImage data-reveal={undefined} className={`resource-card-image${certification ? ' certification-badge' : ''}`} src={resource.image} width={400} height={400} alt="" />
    </span>
    <Heading className="resource-card-title">{resource.title}</Heading>
    <span className="sr-only">{resource.access && `${resource.access}. `}Opens in a new tab</span>
  </a>;
}
