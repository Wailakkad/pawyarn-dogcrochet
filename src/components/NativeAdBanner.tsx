import React, { useEffect, useRef } from 'react';
import { Container } from './Container';

const AD_CONTAINER_ID = 'container-e6ca2d4a2119e8a2e603a06c016a7f3e';
const AD_SCRIPT_SRC =
  'https://pl31736826.profitableratecpmnetwork.com/e6ca2d4a2119e8a2e603a06c016a7f3e/invoke.js';

export const NativeAdBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (scriptInjected.current) return;
    if (!document.getElementById(AD_CONTAINER_ID)) return;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${AD_SCRIPT_SRC}"]`,
    );
    if (existing) {
      scriptInjected.current = true;
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = AD_SCRIPT_SRC;
    script.onload = () => {
      scriptInjected.current = true;
    };
    document.body.appendChild(script);
  }, []);

  return (
    <section aria-label="Advertisement" className="py-6">
      <Container>
        <div className="flex min-h-[120px] w-full items-center justify-center">
          <div ref={containerRef} id={AD_CONTAINER_ID} className="w-full" />
        </div>
      </Container>
    </section>
  );
};
