import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Contact() {
  return (
    <section id="location" className="py-24 bg-background relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
              Step <span className="text-primary">Inside</span>
            </h2>
            <p className="text-muted-foreground">Ready to start? Find us in Amman.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
            
            {/* Map Placeholder */}
            <div className="bg-card h-80 md:h-auto relative group overflow-hidden">
              <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center p-8 text-center z-10 transition-colors duration-500 group-hover:bg-background/80">
                <MapPin size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">Fitness Life</h3>
                <p className="text-muted-foreground">Al-Beirouni St, Amman, Jordan</p>
                <div className="mt-6 border border-primary px-6 py-2 text-primary font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-black transition-colors cursor-pointer">
                  Get Directions
                </div>
              </div>
              {/* Fake map pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                     backgroundSize: '24px 24px'
                   }} 
              />
            </div>

            {/* Contact Details */}
            <div className="p-10 md:p-16 flex flex-col justify-center bg-[#0a0a0a]">
              <div className="space-y-10">
                
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Location</h4>
                  <p className="text-xl text-white font-medium">Al-Beirouni St.</p>
                  <p className="text-muted-foreground">Amman, Jordan</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Hours</h4>
                  <p className="text-xl text-white font-medium flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Opens at 11:00 AM
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Social</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 border border-border flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="w-12 h-12 border border-border flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-border/50 text-center relative z-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-display font-bold uppercase text-white tracking-widest mb-2">
          Fitness <span className="text-primary">Life</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Fitness Life. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
