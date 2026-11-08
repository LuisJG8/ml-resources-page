import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ExtendedPipe } from './ExtendedPipe.tsx';
import { PipeArtwork } from './PipeArtwork.tsx';
import { desktopPipeGeometry, PIPE_FINISH_START, PIPE_FINISH_BANDS } from './pipe-geometry.ts';
import type { Coupling } from './pipe-geometry.ts';
import { PacketPreview } from './PacketPreview.tsx';
import { packetSamples } from './packet-samples.ts';
import './pipeline.css';

const PACKET_COUNT = 3;
const MOBILE_PACKET_COUNT = 3;

function couplingMask(rectangles: readonly Coupling[]) {
  return {
    maskImage: ['linear-gradient(#000 0 0)', ...rectangles.map(() => 'linear-gradient(#000 0 0)')].join(','),
    maskSize: ['100% 100%', ...rectangles.map(([, , width, height]) => `${width}px ${height}px`)].join(','),
    maskPosition: ['0 0', ...rectangles.map(([left, top]) => `${left}px ${top}px`)].join(','),
    maskRepeat: 'no-repeat',
    maskComposite: 'exclude',
  };
}

interface PacketSelection { index: number; compact: boolean; anchor: HTMLButtonElement }

export function Pipeline({ paused }: { paused: boolean }) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const desktopPacketsRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobilePacketsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<PacketSelection | null>(null);
  const closePreview = useCallback(() => setSelected(null), []);
  const motionPaused = paused || selected !== null;

  function packet(index: number, compact = false) {
    const active = selected?.index === index && selected?.compact === compact;
    return <button
      key={index}
      type="button"
      className={`${compact ? 'mobile-data-packet' : 'data-packet'} packet-trigger`}
      aria-label={`Preview ${packetSamples[index].title.toLowerCase()}`}
      aria-haspopup="dialog"
      aria-expanded={active}
      aria-controls={active ? 'packet-preview' : undefined}
      onClick={event => setSelected(active ? null : { index, compact, anchor: event.currentTarget })}
      style={{ animationDelay: `${-index * ((compact ? 105 : 180) / PACKET_COUNT)}s` }}
    ><img data-reveal="" src="/assets/data-document.webp" alt="" width={compact ? 20 : 32} height={compact ? 20 : 32} draggable="false" /></button>;
  }

  useLayoutEffect(() => {
    const desktop = desktopRef.current;
    const mobile = mobileRef.current;
    const desktopPackets = desktopPacketsRef.current;
    const mobilePackets = mobilePacketsRef.current;
    const page = desktop?.closest<HTMLElement>('.page');
    const production = document.getElementById('production');
    if (!desktop || !mobile || !desktopPackets || !mobilePackets || !page || !production) return;
    const syncLayout = () => {
      const { width } = page.getBoundingClientRect();
      const desktopScale = width / 941;
      page.style.setProperty('--pipe-scale', String(desktopScale));
      const geometry = desktopPipeGeometry(desktopScale);
      geometry.extras.forEach((extra, index) => desktop.style.setProperty(`--pipe-extra-${index}`, String(extra)));
      desktop.style.setProperty('--desktop-route', `path('${geometry.route}')`);
      Object.assign(desktopPackets.style, couplingMask(geometry.couplings));
      const { height } = page.getBoundingClientRect();
      const railHeight = height + production.getBoundingClientRect().height;
      // Continue the same straight rail through the Production section.
      const route = `M 18 -32 L 18 ${railHeight + 32}`;
      mobile.style.height = `${railHeight}px`;
      mobile.style.setProperty('--mobile-route', `path('${route}')`);
      mobile.style.setProperty('--mobile-rail-height', `${railHeight}px`);
      // The 724 × 2172 mobile tube repeats every 270px at its 90px CSS width.
      const mobileCouplings: Coupling[] = [];
      for (let top = 131.5; top < railHeight; top += 270) {
        mobileCouplings.push([0, top, 36, Math.min(7, railHeight - top)]);
      }
      Object.assign(mobilePackets.style, couplingMask(mobileCouplings));
    };
    const resize = new ResizeObserver(syncLayout);
    resize.observe(desktop);
    resize.observe(page);
    resize.observe(production);
    syncLayout();
    return () => resize.disconnect();
  }, []);

  return <>
    <div ref={desktopRef} className="pipeline-flow" data-paused={motionPaused}>
      <div className="pipeline-canvas">
        <div ref={desktopPacketsRef} className="pipeline-packets">
          {Array.from({ length: PACKET_COUNT }, (_, index) => packet(index))}
        </div>
        <ExtendedPipe />
        <div className="desktop-pipe-end" data-reveal="">
          <div className="pipe-end-glass"><PipeArtwork /></div>
          {PIPE_FINISH_BANDS.map(top => <div key={top} className="pipe-end-band" style={{ top: top - PIPE_FINISH_START }}><PipeArtwork /></div>)}
        </div>
      </div>
    </div>
    <div ref={mobileRef} className="mobile-pipeline" data-paused={motionPaused}>
      <div className="mobile-glass" data-reveal="" />
      <div ref={mobilePacketsRef} className="mobile-packets">
        {Array.from({ length: MOBILE_PACKET_COUNT }, (_, index) => packet(index, true))}
      </div>
    </div>
    {selected && <PacketPreview anchor={selected.anchor} sample={packetSamples[selected.index]} onClose={closePreview} />}
  </>;
}
