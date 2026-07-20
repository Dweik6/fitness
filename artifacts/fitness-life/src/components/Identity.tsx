import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';

export function Identity() {
  return (
    <section className="py-24 bg-background relative z-20 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 leading-tight">
              Earn your <br />
              <span className="text-primary">Respect.</span>
            </h2>
            <div className="w-20 h-2 bg-primary mb-8" />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We aren't a luxury hotel spa or a trendy boutique class. Fitness Life is a complete, professional training facility built for results. When you walk through our doors on Al-Beirouni St., you feel the purpose in the room. This is where the work gets done.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <p className="text-4xl font-display font-bold text-white mb-1">4.0</p>
                <div className="flex text-primary mb-2">
                  {[...Array(4)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                  <Star size={16} className="text-muted" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Google (161 Reviews)</p>
              </div>
              
              <div className="w-px bg-border hidden sm:block" />
              
              <div>
                <p className="text-4xl font-display font-bold text-white mb-1">4.8</p>
                <div className="flex text-primary mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i === 4 ? "none" : "currentColor"} className={i === 4 ? "text-primary" : ""} size={16} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Facebook (36 Votes)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            <div className="bg-card border border-card-border p-8 flex items-start gap-6 group hover:border-primary transition-colors duration-500">
              <div className="bg-background p-4 border border-border text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold uppercase mb-2">Location</h3>
                <p className="text-muted-foreground">Al-Beirouni St.</p>
                <p className="text-muted-foreground">Amman, Jordan</p>
              </div>
            </div>

            <div className="bg-card border border-card-border p-8 flex items-start gap-6 group hover:border-primary transition-colors duration-500">
              <div className="bg-background p-4 border border-border text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold uppercase mb-2">Hours</h3>
                <p className="text-muted-foreground">Opens at 11:00 AM</p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Currently Closed
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
