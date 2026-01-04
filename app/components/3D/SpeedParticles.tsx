"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface SpeedParticlesProps {
  className?: string;
  intensity?: number;
}

export default function SpeedParticles({
  className = "",
  intensity = 1,
}: SpeedParticlesProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleCount = Math.floor(30 * intensity);

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: particleCount,
        },
        color: {
          value: "#ACF601",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.6,
          random: true,
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 2 * intensity,
          direction: "top" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
          },
          attract: {
            enable: false,
          },
        },
      },
      interactivity: {
        detectsOn: "canvas" as const,
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 100,
            size: 4,
            duration: 2,
            opacity: 0.8,
          },
        },
      },
    }),
    [particleCount, intensity]
  );

  return (
    <Particles
      id="speed-particles"
      init={particlesInit}
      options={options}
      className={className}
    />
  );
}

