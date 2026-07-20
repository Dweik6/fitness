import React from 'react';
import { motion } from 'framer-motion';
import weightsImg from '@assets/generated_images/amenities-weights.jpg';
import spaImg from '@assets/generated_images/amenities-spa.jpg';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export function Amenities() {
  return (
    <section className="py-24 bg-background relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
            The <span className="text-primary">Facility</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to break limits. No gimmicks, just premium equipment and recovery zones designed for serious training.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div variants={item} className="group relative h-96 overflow-hidden lg:col-span-2">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
            <img src={weightsImg} alt="Weights Area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
              <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">Complete Equipment</h3>
              <p className="text-gray-300">Full gym floor loaded with premium machines and free weights for every muscle group.</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={item} className="bg-card border border-border p-8 flex flex-col justify-between group hover:border-primary transition-colors duration-500">
            <div>
              <div className="w-12 h-12 border border-primary flex items-center justify-center text-primary font-display font-bold text-xl mb-6">01</div>
              <h3 className="text-xl font-display font-bold uppercase text-white mb-3">Custom Programming</h3>
              <p className="text-muted-foreground">Personalized training programs designed specifically for each member's goals and capabilities.</p>
            </div>
            <div className="h-1 w-full bg-border mt-8 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-primary w-0 group-hover:w-full transition-all duration-700" />
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={item} className="bg-card border border-border p-8 flex flex-col justify-between group hover:border-primary transition-colors duration-500">
            <div>
              <div className="w-12 h-12 border border-primary flex items-center justify-center text-primary font-display font-bold text-xl mb-6">02</div>
              <h3 className="text-xl font-display font-bold uppercase text-white mb-3">Monthly Progression</h3>
              <p className="text-muted-foreground">Stagnation is the enemy. Programs are analyzed and updated monthly based on your individual progress.</p>
            </div>
            <div className="h-1 w-full bg-border mt-8 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-primary w-0 group-hover:w-full transition-all duration-700" />
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={item} className="group relative h-96 overflow-hidden lg:col-span-2">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
            <img src={spaImg} alt="Spa Area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
              <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">Recovery Zone</h3>
              <p className="text-gray-300">Accelerate your recovery with our premium Jacuzzi, Sauna, and Steam Room facilities.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
