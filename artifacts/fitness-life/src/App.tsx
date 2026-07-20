import { useEffect, useRef, useState } from 'react';

// Real gym photos
import gymHero from '@assets/unnamed_(1)_1784549434327.webp';
import gymFloor from '@assets/unnamed_(3)_1784549434327.webp';
import nutritionCounter from '@assets/unnamed_(2)_1784549434327.webp';
import logoWall from '@assets/unnamed_1784549434327.webp';
import coachPhoto from '@assets/images_1784549434326.jpg';

/* ─── Intersection Observer hook for scroll animations ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Section wrapper with fade-in ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Star rating ─── */
function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < Math.floor(rating) ? '#f5c400' : i < rating ? '#f5c400' : '#3a3530'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Facilities', 'Coach', 'Reviews', 'Contact'];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13, 11, 9, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,196,0,0.12)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded bg-[#f5c400] flex items-center justify-center">
            <span className="text-black font-black text-sm tracking-tight">FL</span>
          </div>
          <span className="font-black text-white text-lg tracking-wide uppercase">
            Fitness <span style={{ color: '#f5c400' }}>Life</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="nav-link text-sm font-semibold uppercase tracking-widest text-gray-300"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="ml-2 px-5 py-2 rounded text-sm font-bold uppercase tracking-wider text-black transition-all duration-200 hover:scale-105"
            style={{ background: '#f5c400' }}
          >
            Join Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0d0b09]">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="block w-full text-left px-6 py-4 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-[#f5c400] border-b border-gray-900 transition-colors"
            >
              {link}
            </button>
          ))}
          <div className="px-6 py-4">
            <button
              onClick={() => scrollTo('Contact')}
              className="w-full py-3 rounded text-sm font-bold uppercase tracking-wider text-black"
              style={{ background: '#f5c400' }}
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={gymHero} alt="Fitness Life gym floor" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fadeInUp">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: '#f5c400' }}>
            Al-Beirouni St., Amman, Jordan
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6 text-white">
            Fitness<br />
            <span className="shimmer-text">Life</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed mb-10 delay-200 animate-fadeInUp">
            Amman's premier training facility — complete equipment, expert coaching, and amenities that go beyond the ordinary.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 delay-300 animate-fadeInUp">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded text-base font-bold uppercase tracking-widest text-black transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: '#f5c400', boxShadow: '0 0 30px rgba(245,196,0,0.3)' }}
          >
            Start Training
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded text-base font-bold uppercase tracking-widest text-white border border-white/30 hover:border-[#f5c400] hover:text-[#f5c400] transition-all duration-200"
          >
            Explore
          </button>
        </div>

        {/* Ratings bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 delay-400 animate-fadeInUp">
          <div className="flex items-center gap-3">
            <Stars rating={4} />
            <span className="text-white font-bold text-sm">4.0</span>
            <span className="text-gray-400 text-xs">Google · 161 reviews</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-700" />
          <div className="flex items-center gap-3">
            <Stars rating={4.8} />
            <span className="text-white font-bold text-sm">4.8</span>
            <span className="text-gray-400 text-xs">Facebook · 36 votes</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-bounce">
        <svg className="w-6 h-6 text-[#f5c400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section id="about" className="py-28 px-6" style={{ background: '#0d0b09' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <FadeIn>
            <div className="img-overlay rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img
                src={logoWall}
                alt="Fitness Life logo"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={150}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#f5c400' }}>
                Who We Are
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-6">
                More Than<br />A Gym
              </h2>
              <div className="section-divider mb-8" />
              <p className="text-gray-400 leading-relaxed text-base mb-6">
                Fitness Life is a complete training destination in the heart of Amman. We offer everything you need to reach your goals — from a full weight floor stocked with professional equipment to recovery amenities most gyms don't have.
              </p>
              <p className="text-gray-400 leading-relaxed text-base mb-10">
                Every member receives a personalized training program tailored to their body, updated monthly as they progress. No generic plans. No guesswork. Real results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '161', label: 'Google Reviews' },
                  { value: '4.8', label: 'Facebook Rating' },
                  { value: '∞', label: 'Dedication' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-black mb-1" style={{ color: '#f5c400' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Facilities ─── */
function Facilities() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Full Equipment',
      desc: 'Complete weight floor with machines and free weights covering every muscle group.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Custom Programs',
      desc: 'Personal training programs designed for your body — updated every month with your progress.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Jacuzzi',
      desc: 'Unwind and recover in our full jacuzzi — a rare perk in Amman\'s gym scene.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Sauna',
      desc: 'Traditional dry sauna for deep muscle recovery and relaxation after every session.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Steam Room',
      desc: 'Wet steam room to open pores, boost circulation, and accelerate recovery.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Nutrition Bar',
      desc: 'In-gym nutrition counter stocked with supplements, sports drinks, and energy products.',
    },
  ];

  return (
    <section id="facilities" className="py-28 px-6" style={{ background: '#100e0b' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#f5c400' }}>
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
              World-Class Facilities
            </h2>
            <div className="section-divider mx-auto" />
          </div>
        </FadeIn>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 80}>
              <div
                className="feature-card rounded-2xl p-7 border"
                style={{ background: '#1a1510', borderColor: 'rgba(245,196,0,0.1)' }}
              >
                <div className="mb-5" style={{ color: '#f5c400' }}>{f.icon}</div>
                <h3 className="text-lg font-black uppercase text-white mb-3 tracking-wide">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Two gallery images */}
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn>
            <div className="img-overlay rounded-2xl overflow-hidden h-72">
              <img src={gymFloor} alt="Gym floor with dumbbells" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-white font-black text-xl uppercase">Bodybuilding Zone</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="img-overlay rounded-2xl overflow-hidden h-72">
              <img src={nutritionCounter} alt="Nutrition Life counter" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-white font-black text-xl uppercase">Nutrition Life</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Coach ─── */
function Coach() {
  const credentials = [
    'First-class classification in bodybuilding & fitness — Ministry of Youth',
    'Lecturer and practical examiner for trainers at the Training Preparation Center',
    'Former national team player (multi-year career)',
    'Former federation member',
    'Former national team coach',
    'Lecturer at the British Academy for Coach Preparation',
  ];

  return (
    <section id="coach" className="py-28 px-6" style={{ background: '#0d0b09' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#f5c400' }}>
              The Expert Behind the Programs
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
              Coach Murad Attari
            </h2>
            <div className="section-divider mx-auto" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Credentials */}
          <FadeIn delay={100}>
            <div>
              <p className="text-gray-400 leading-relaxed text-base mb-8">
                Your training program at Fitness Life isn't a template — it's built by one of Jordan's most credentialed coaches. Coach Murad Attari holds a first-class designation from the Ministry of Youth and has shaped athletes at the national level for years.
              </p>
              <p className="text-gray-400 leading-relaxed text-base mb-10">
                He designs a program specifically for your body and goals, then updates it every month as you evolve. The result is continuous, intentional progress — not plateaus.
              </p>
              <div className="space-y-4">
                {credentials.map((c, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#f5c400' }} />
                      <span className="text-gray-300 text-sm leading-relaxed">{c}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={200}>
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: 'linear-gradient(135deg, #f5c400, transparent)' }}
              />
              <div className="img-overlay rounded-2xl overflow-hidden relative" style={{ aspectRatio: '3/4' }}>
                <img
                  src={coachPhoto}
                  alt="Coach Murad Attari"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(13,11,9,0.9)', border: '1px solid rgba(245,196,0,0.25)' }}
                  >
                    <div className="text-white font-black text-lg mb-0.5">Coach Murad Attari</div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: '#f5c400' }}>
                      Head Coach & Program Director
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
function Reviews() {
  const reviews = [
    {
      name: 'Ahmad K.',
      rating: 5,
      text: 'The personalized program from Coach Murad changed everything. Monthly updates keep the training fresh and results keep coming.',
    },
    {
      name: 'Rami S.',
      rating: 4,
      text: 'Best gym in Amman for serious training. Full equipment, clean facilities, and the sauna after a heavy session is incredible.',
    },
    {
      name: 'Omar F.',
      rating: 5,
      text: 'Coach Murad knows exactly what he\'s doing. My physique changed more in 3 months here than in 2 years at other gyms.',
    },
  ];

  return (
    <section id="reviews" className="py-28 px-6" style={{ background: '#100e0b' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#f5c400' }}>
              What Members Say
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
              Real Results
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Stars rating={4} />
                <span className="text-white font-bold">4.0</span>
                <span className="text-gray-500">Google · 161 reviews</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Stars rating={4.8} />
                <span className="text-white font-bold">4.8</span>
                <span className="text-gray-500">Facebook · 36 votes</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 100}>
              <div
                className="rounded-2xl p-7 border feature-card"
                style={{ background: '#1a1510', borderColor: 'rgba(245,196,0,0.1)' }}
              >
                <Stars rating={r.rating} />
                <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-black font-black text-sm"
                    style={{ background: '#f5c400' }}
                  >
                    {r.name[0]}
                  </div>
                  <span className="text-white font-semibold text-sm">{r.name}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / Location ─── */
function Contact() {
  const hours = [
    { day: 'Sunday – Thursday', time: '11:00 AM – Late' },
    { day: 'Friday', time: '11:00 AM – Late' },
    { day: 'Saturday', time: '11:00 AM – Late' },
  ];

  return (
    <section id="contact" className="py-28 px-6" style={{ background: '#0d0b09' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#f5c400' }}>
              Find Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
              Visit Fitness Life
            </h2>
            <div className="section-divider mx-auto" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <FadeIn>
            <div className="space-y-8">
              {/* Address */}
              <div
                className="rounded-2xl p-7 border"
                style={{ background: '#1a1510', borderColor: 'rgba(245,196,0,0.1)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1" style={{ color: '#f5c400' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#f5c400' }}>Address</p>
                    <p className="text-white font-semibold">Al-Beirouni St., Amman</p>
                    <p className="text-gray-400 text-sm">Jordan</p>
                    <a
                      href="https://maps.google.com/?q=Fitness+Life+Gym+Amman+Al-Beirouni"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm mt-2 font-semibold hover:underline transition-all"
                      style={{ color: '#f5c400' }}
                    >
                      Get Directions
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div
                className="rounded-2xl p-7 border"
                style={{ background: '#1a1510', borderColor: 'rgba(245,196,0,0.1)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ color: '#f5c400' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f5c400' }}>Hours</p>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                      <span className="text-gray-300 text-sm">{h.day}</span>
                      <span className="text-white font-semibold text-sm">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-xs font-semibold">Currently Closed</span>
                  <span className="text-gray-500 text-xs">· Opens at 11 AM</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA card */}
          <FadeIn delay={150}>
            <div
              className="rounded-2xl p-10 border flex flex-col justify-between h-full min-h-80"
              style={{
                background: 'linear-gradient(135deg, #1a1510 0%, #201a0f 100%)',
                borderColor: 'rgba(245,196,0,0.2)',
              }}
            >
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ background: 'rgba(245,196,0,0.15)', color: '#f5c400' }}
                >
                  Join the Community
                </div>
                <h3 className="text-3xl font-black text-white uppercase leading-tight mb-4">
                  Ready to Transform?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Come in, see the facility, and meet Coach Murad. Your personalized program starts on day one — monthly updates keep you progressing.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://maps.google.com/?q=Fitness+Life+Gym+Amman+Al-Beirouni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest text-black transition-all duration-200 hover:scale-105"
                  style={{ background: '#f5c400', boxShadow: '0 0 30px rgba(245,196,0,0.25)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Get Directions
                </a>
                <div className="text-center text-xs text-gray-600">Al-Beirouni St., Amman, Jordan</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: '#080705', borderTop: '1px solid rgba(245,196,0,0.1)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#f5c400] flex items-center justify-center">
            <span className="text-black font-black text-xs tracking-tight">FL</span>
          </div>
          <span className="font-black text-white text-sm uppercase tracking-wide">
            Fitness <span style={{ color: '#f5c400' }}>Life</span>
          </span>
        </div>
        <p className="text-gray-600 text-xs text-center">
          Al-Beirouni St., Amman, Jordan &nbsp;·&nbsp; Opens 11 AM
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.google.com/maps?q=Fitness+Life+Gym+Amman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-[#f5c400] transition-colors uppercase tracking-widest font-semibold"
          >
            Google
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-[#f5c400] transition-colors uppercase tracking-widest font-semibold"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <div style={{ background: '#0d0b09', color: '#f8f7f4' }}>
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Coach />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
