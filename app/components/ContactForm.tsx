"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null); // Initialize with null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStateMessage(null); // Reset message

    try {
      // email is linked to emailjs acc for operations email, details are on the password database
      const result = await emailjs.sendForm('service_8ty54mt', 'template_t8t0zc9', form.current!, 'P4WMs7TMx12asCi2G');
      console.log(result.text);
      setStateMessage("Message sent successfully!");
    } catch (error: unknown) {
      console.error(error);
      setStateMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="font-Aldrich bg-black">
      <div className="flex flex-wrap justify-center items-center mt-5">
        <h2 className='font-Aldrich flex flex-wrap justify-center items-center mt-5 underline decoration-green decoration-4'>Email Us</h2>
      </div>
      <form ref={form} onSubmit={sendEmail} className="px-20">
        <div className="flex flex-wrap justify-center items-center mt-5">
          <motion.div 
            className="flex flex-col justify-left mt-5 md:mr-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-white text-left pl-4">First Name*</label>
            <input
              className="border text-black bg-white px-2 h-10 w-50 md:w-60 transition-all focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              style={{ borderRadius: 10 }}
              type="text"
              name="first_name" 
              required
            />
          </motion.div>
          <motion.div 
            className="flex flex-col justify-left mt-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-white text-left pl-4">Last Name*</label>
            <input
              className="border text-black bg-white px-2 h-10 w-50 md:w-60 transition-all focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              style={{ borderRadius: 10 }}
              type="text"
              name="last_name" 
              required
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <motion.div 
            className="flex flex-col justify-left mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="text-white text-left pl-4">E-mail*</label>
            <input
              className="border text-black bg-white px-2 h-10 w-60 md:w-120 transition-all focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              style={{ borderRadius: 10 }}
              type="email"
              name="email" 
              required
            />
          </motion.div>

          <motion.div 
            className="flex flex-col justify-left mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="message" className="text-white text-left pl-4">Message*</label>
            <textarea
              className="border text-black bg-white px-2 py-2 h-10 w-60 md:w-120 sm:h-full min-h-[150px] sm:w-full resize-none transition-all focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              style={{ borderRadius: 10 }}
              name="message"
              required
              placeholder='Write a message here !'
            />
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center items-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            type="submit"
            className="px-5 py-2 rounded-md border-2 bg-green text-black border-black font-bold hover:bg-black hover:text-white hover:border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {stateMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-5 text-center ${
                stateMessage.includes("successfully") ? "text-green" : "text-red-500"
              }`}
            >
              {stateMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
    </>
  );
};