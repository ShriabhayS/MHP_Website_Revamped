"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { Sponsor } from "../types/sponsor";

interface SponsorshipCarouselProps {
  items: Sponsor[];
}

export default function SponsorshipCarousel({
  items,
}: SponsorshipCarouselProps): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItemsCount(window.innerWidth < 640 ? 1 : 3);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const visibleItems = Array.from({ length: visibleItemsCount }, (_, i) => {
    const index = (startIndex + i) % items.length;
    return items[index];
  });

  return (
    <>
    <div className="relative flex items-center justify-center">
      <button
        onClick={handlePrevious}
        className="absolute left-0 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400"
        aria-label="Previous item"
      >
        &larr;
      </button>
      <motion.div 
        ref={scrollRef}
        className="flex-grow grid grid-cols-1 gap-8 px-10 py-4 w-3/4 h-1/4 sm:grid-cols-3 overflow-x-auto scrollbar-hide"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {visibleItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center justify-center">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img
                  className="h-48 w-full object-contain"
                  src={item.image}
                  alt={item.title}
                />
              </a>
            </div>
            <div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
                <h2 className="mt-2 font-bold text-xl">
                  {item.title}
                </h2>
              </a>
              <p className="mt-2 text-sm text-left lg:text-justify">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400"
        aria-label="Next item"
      >
        &rarr;
      </button>
    </div>
    </>
  );
}