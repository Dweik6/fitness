import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '@assets/generated_images/hero.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <img 
          src={heroImg} 
          alt="Fitness Life Gym" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container px-4 sm:px-6 mx-auto flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm sm:text-base">
            Amman, Jordan
          </span>
          <div className="h-px w-12 bg-primary" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl sm:text-8xl md:text-9xl font-display font-bold uppercase leading-[0.85] mb-6"
        >
          FITNESS <br className="hidden sm:block" />
          <span className="text-primary">LIFE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium"
        >
          Where serious athletes and everyday people come to transform. 
          Real gym energy. Professional coaching. No excuses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="#location" className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300">
            Find Us
          </a>
          <a href="#coach" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-colors duration-300">
            Meet the Coach
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
