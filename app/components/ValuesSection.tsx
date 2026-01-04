"use client";

import { motion } from "motion/react";

interface Value {
  name: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {values.map((value, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col justify-start items-center space-y-3 md:space-y-3 lg:space-y-0 sm:space-x-5 mb-5 h-full p-4 rounded-lg transition-all duration-300 hover:bg-gray-900/50 cursor-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(172, 246, 1, 0.3)"
          }}
        >
          <h2 className="text-l font-semibold text-wrap text-center p-3 sm:mb-0 md:text-xl text-green">
            {value.name}
          </h2>
          <p className="my-4 max-w-prose text-center">
            {value.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

