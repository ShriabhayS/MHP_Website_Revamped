"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { BikeContentProps, BikeGalleryImage } from '../types/bike';
import SpeedParticles from './3D/SpeedParticles';

const BikeContent: React.FC<BikeContentProps> = ({ activeTab, bikeData, bike }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const speedRef = useRef<HTMLDivElement>(null);
    const isSpeedInView = useInView(speedRef, { once: true, amount: 0.5 });
    const [displaySpeed, setDisplaySpeed] = useState(0);

    const bikeGalleryImages: BikeGalleryImage[] = bikeData[bike].gallery.map((image: string, index: number) => ({
        id: (index + 1).toString(),
        src: image,
        alt: `Image ${index + 1} of ${bike}`,
    }));

    const targetSpeed = bikeData[bike].max_speed;

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        
        if (isSpeedInView && activeTab === 'Overview') {
            setDisplaySpeed(0); // Reset when tab changes
            const duration = 2000;
            const steps = 60;
            const increment = targetSpeed / steps;
            const stepDuration = duration / steps;
            let current = 0;
            
            timer = setInterval(() => {
                current += increment;
                if (current >= targetSpeed) {
                    setDisplaySpeed(targetSpeed);
                    if (timer) clearInterval(timer);
                } else {
                    setDisplaySpeed(Math.floor(current));
                }
            }, stepDuration);
        } else {
            setDisplaySpeed(targetSpeed); // Show final value when not in view
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isSpeedInView, targetSpeed, activeTab]);

    return (
        <>
        <div>
            {activeTab === 'Overview' && (
                <div className="flex text-xl h-full">
                <div className="flex flex-col sm:flex-row justify-center items-center h-full w-full">
                    <div className="flex justify-center items-center h-full flex-1 py-3 relative" ref={speedRef}>
                    <div className="absolute inset-0 opacity-30">
                        <SpeedParticles intensity={1.5} />
                    </div>
                    <div className="flex flex-col items-center relative z-10">
                        <motion.div 
                            className="flex justify-center items-center space-x-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isSpeedInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.p 
                                className="text-6xl sm:text-7xl md:text-7xl lg:text-7xl text-center bg-gradient-to-r from-white to-green inline-block bg-clip-text text-transparent pt-3"
                                initial={{ opacity: 0 }}
                                animate={isSpeedInView ? { opacity: 1 } : {}}
                            >
                                {isSpeedInView && activeTab === 'Overview' && displaySpeed < targetSpeed 
                                    ? displaySpeed.toFixed(0)
                                    : targetSpeed.toFixed(bike === 'Bandicoot' ? 1 : 0)}
                            </motion.p>
                            <p className="text-4xl sm:text-5xl sm:px-0.5 md:text-5xl lg:text-5xl text-center text-green inline-block pt-8">KM/H</p>
                        </motion.div>
                        <motion.p 
                            className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl bg-gradient-to-r from-white to-green bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isSpeedInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            {bike === 'Bandicoot' ? 'AVERAGE SPEED' : 'MAX SPEED'}
                        </motion.p>
                    </div>
                    </div>
                    <motion.div 
                        className="flex justify-center items-center h-full flex-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isSpeedInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex flex-col text-center items-center">
                            <p className="pt-3">{bikeData[bike].description}</p>
                        </div>
                    </motion.div>
                </div>
                </div>
            )}
            {activeTab === "Gallery" && (
                <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bikeGalleryImages.map((image: BikeGalleryImage, index: number) => (
                        <motion.div 
                            key={image.id} 
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden gap-4 h-60 cursor-pointer group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedImage(image.src)}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Image
                                src={image.src}   
                                alt={image.alt}
                                fill
                                className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
                {selectedImage && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative max-w-5xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Enlarged gallery image"
                                width={1200}
                                height={800}
                                className="object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                                aria-label="Close image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                )}
                </>
            )}

        </div>
        </>
    );
};

export default BikeContent;