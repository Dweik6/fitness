import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import coachImg from '@assets/generated_images/coach-murad.jpg';

export function Coach() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const credentials = [
    "First-class classification in bodybuilding and physical fitness (Ministry of Youth)",
    "Lecturer and practical examiner for trainers (Training Preparation Center)",
    "Former national team player",
    "Former federation member",
    "Former national team coach",
    "Lecturer at the British Academy for Coach Preparation"
  ];

  return (
    <section id="coach" className="py-32 bg-[#050505] relative z-20 overflow-hidden border-y border-border">
      
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <h2 className="text-[20vw] font-display font-bold uppercase whitespace-nowrap text-stroke-white">
          COACH MURAD
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 border border-border p-2 bg-card"
            >
              <img 
                src={coachImg} 
                alt="Coach Murad Attari" 
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            {/* Decorative element */}
            <motion.div 
              style={{ y }}
              className="absolute -bottom-8 -right-8 w-64 h-64 border border-primary/30 z-0 hidden md:block"
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary z-20 flex items-center justify-center">
              <Award size={40} className="text-black" />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Head Coach</h4>
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6 text-white">
                Murad <br /> Attari
              </h2>
              
              <div className="w-20 h-1 bg-border mb-8" />
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                A gym is only as good as its leadership. Coach Murad brings decades of elite-level experience to Fitness Life. Whether you are stepping on stage or just starting your journey, you are training under national-level expertise.
              </p>

              <div className="space-y-4">
                {credentials.map((cred, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <CheckCircle2 className="text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-gray-300 font-medium">{cred}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
