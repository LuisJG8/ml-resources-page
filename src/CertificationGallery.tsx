import { certificationProviders } from './resources.ts';
import type { Resource } from './resources.ts';
import { ResourceCard } from './ResourceCard.tsx';

export function CertificationGallery({ resources }: { resources: readonly Resource[] }) {
  const providers = certificationProviders.map(provider => ({
    ...provider,
    resources: resources.filter(resource => resource.category === 'certifications').filter(resource => resource.provider === provider.id),
  })).filter(provider => provider.resources.length);

  return <div className="certification-gallery">
    {providers.map(provider => <section className="certification-provider" key={provider.id} aria-labelledby={`certification-provider-${provider.id}`}>
      <h3 data-reveal="" id={`certification-provider-${provider.id}`}>{provider.name}</h3>
      <div className="resource-grid">
        {provider.resources.map(resource => <ResourceCard resource={resource} headingLevel={4} key={resource.id} />)}
      </div>
    </section>)}
  </div>;
}
