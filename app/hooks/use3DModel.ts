import { useState, useEffect } from "react";

interface Use3DModelOptions {
  modelPath?: string;
  autoLoad?: boolean;
}

export const use3DModel = ({ modelPath, autoLoad = true }: Use3DModelOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (autoLoad && modelPath) {
      setIsLoading(true);
      setError(null);
      // In a real implementation, you would load the GLTF model here
      // For now, we'll simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modelPath, autoLoad]);

  return {
    isLoading,
    error,
    isLoaded,
    loadModel: () => {
      if (modelPath) {
        setIsLoading(true);
        setError(null);
      }
    },
  };
};

