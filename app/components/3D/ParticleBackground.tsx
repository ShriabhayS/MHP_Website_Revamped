"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface ParticleBackgroundProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
}

export default function ParticleBackground({
  className = "",
  particleColor = "#ACF601",
  particleCount = 50,
}: ParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: particleCount,
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: particleColor,
          opacity: 0.2,
          width: 1,
        },
      },
      interactivity: {
        detectsOn: "canvas" as const,
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
        },
      },
    }),
    [particleColor, particleCount]
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className={className}
    />
  );
}

