"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "motion/react";

interface BikeModelProps {
  modelPath?: string;
  className?: string;
  enableControls?: boolean;
}

function BikeModel3D({ modelPath }: { modelPath?: string }) {
  // If no model path is provided, create a simple placeholder geometry
  if (!modelPath) {
    return (
      <mesh>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#ACF601" metalness={0.8} roughness={0.2} />
      </mesh>
    );
  }

  // For now, we'll use a placeholder. In production, you'd load the actual GLTF model
  // const { scene } = useGLTF(modelPath);
  // return <primitive object={scene} />;

  // Placeholder bike-like shape
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.3, 0.1]} />
        <meshStandardMaterial color="#ACF601" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.8, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function BikeModel({
  modelPath,
  className = "",
  enableControls = true,
}: BikeModelProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback for devices that may not support WebGL
  if (typeof window !== "undefined" && !window.WebGLRenderingContext) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-black/50 ${className}`}>
        <div className="text-white text-center">
          <p>3D viewer not supported on this device.</p>
          <p className="text-sm mt-2">Please use a modern browser with WebGL support.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        shadows
        onCreated={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className="bg-transparent"
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <BikeModel3D modelPath={modelPath} />
        </Suspense>
        {enableControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
          />
        )}
      </Canvas>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading 3D Model...</div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <p>Failed to load 3D model.</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

