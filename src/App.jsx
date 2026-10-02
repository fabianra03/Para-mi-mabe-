import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './index.css';

/* ── Partículas flotantes ───────────────────────── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    type: Math.random() > 0.5 ? 'circle' : 'heart',
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`particle particle-${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.sin(p.id) * 30, Math.sin(p.id) * -20],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ── Iconos SVG estilizados ─────────────────────── */
const HeartFancy = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <defs>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9a8d4" />
        <stop offset="50%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="heartGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M32 56s-2.5-1.6-5.2-3.8C18.4 45.4 6 35 6 22.5 6 14.5 12.5 8 20.5 8c4.5 0 8.8 2.1 11.5 5.5C34.7 10.1 39 8 43.5 8 51.5 8 58 14.5 58 22.5 58 35 45.6 45.4 37.2 52.2 34.5 54.4 32 56 32 56z"
      fill="url(#heartGrad)" filter="url(#heartGlow)"
    />
    <path d="M22 18c-3.3 0-6 2.7-6 6 0 1.5.5 2.8 1.3 3.8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const ScrollArrow = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9a8d4" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
    </defs>
    <path d="M8 12 C10 14, 14 18, 16 20 C18 18, 22 14, 24 12" stroke="url(#arrowGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 18 C10 20, 14 24, 16 26 C18 24, 22 20, 24 18" stroke="url(#arrowGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const StarBurst = ({ size = 36, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id={`sg-${className}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9a8d4" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      <filter id={`sgw-${className}`}><feGaussianBlur stdDeviation="1.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <path d="M24 4 C24.5 18, 24.5 18, 44 24 C24.5 24.5, 24.5 24.5, 24 44 C23.5 24.5, 23.5 24.5, 4 24 C23.5 18, 23.5 18, 24 4z" fill={`url(#sg-${className})`} filter={`url(#sgw-${className})`} opacity="0.9" />
    <path d="M24 12 C25 20, 25 20, 36 24 C25 25, 25 25, 24 36 C23 25, 23 25, 12 24 C23 20, 23 20, 24 12z" fill="white" opacity="0.3" transform="rotate(45, 24, 24)" />
    <circle cx="14" cy="10" r="1.2" fill="white" opacity="0.6" />
    <circle cx="38" cy="14" r="0.8" fill="white" opacity="0.4" />
  </svg>
);

const FloralDivider = () => (
  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="floral-divider">
    <defs>
      <linearGradient id="floralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="20%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#d946ef" />
        <stop offset="80%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <line x1="10" y1="12" x2="110" y2="12" stroke="url(#floralGrad)" strokeWidth="1" />
    <path d="M52 12 Q55 6, 60 12 Q55 18, 52 12" fill="#d946ef" opacity="0.6" />
    <path d="M68 12 Q65 6, 60 12 Q65 18, 68 12" fill="#c084fc" opacity="0.6" />
    <circle cx="60" cy="12" r="2.5" fill="#f9a8d4" />
  </svg>
);

/* ── Typewriter Effect ──────────────────────────── */
const TypewriterText = ({ text, className }) => {
  const letters = text.split('');
  return (
    <h1 className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
          style={{ display: 'inline-block', minWidth: letter === ' ' ? '0.3em' : 'auto' }}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
};

/* ── Flip Card ──────────────────────────────────── */
const FlipCard = ({ image, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="flip-card-wrapper"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front — title + decorative design */}
        <div className="flip-card-front">
          <div className="card-front-glow"></div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="card-front-ring"
          />
          <HeartFancy size={44} className="card-front-heart" />
          <h3 className="card-front-title cursive-text">{image.title}</h3>
          <p className="card-front-caption elegant-text">{image.caption}</p>
          <span className="card-front-tap elegant-text">✦ Toca para revelar ✦</span>
        </div>

        {/* Back — the photo */}
        <div className="flip-card-back">
          <img src={image.src} alt={image.title} onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }} />
          <div className="flip-card-back-overlay">
            <p className="cursive-text flip-back-text">{image.caption}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Glowing animated border ────────────────────── */
const GlowBorder = () => (
  <div className="glow-border">
    <div className="glow-border-line glow-border-top"></div>
    <div className="glow-border-line glow-border-right"></div>
    <div className="glow-border-line glow-border-bottom"></div>
    <div className="glow-border-line glow-border-left"></div>
  </div>
);

/* ── Datos ────────────────────────────────────────── */
const images = [
  { src: '/images/IMG_0938.png', title: 'Tu Mirada' },
  { src: '/images/IMG_0939.png', title: 'Tu Brillo' },
  { src: '/images/IMG_0940.png', title: 'Tu Esencia' },
];

/* ── App ──────────────────────────────────────────── */
function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleStart = useCallback(() => {
    setStarted(true);
    // Play local MP3
    const audio = new Audio('/music/todo_empezo.mp3');
    audio.volume = 0.12; // 25% volume
    audio.loop = true;
    audio.play().catch(e => console.error("Audio play failed:", e));
  }, []);

  if (!mounted) return null;

  return (
    <>

      <AnimatePresence>
        {!started && (
          <motion.div
            key="splash"
            className="splash-screen"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div className="stars-bg"></div>
            <motion.div
              className="splash-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <HeartFancy size={72} />
              </motion.div>
              <h1 className="splash-title cursive-text gradient-text">Para Mi Mabe</h1>
              <p className="splash-subtitle elegant-text">Tengo algo especial para ti...</p>
              <motion.button
                className="splash-button"
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 20px rgba(217,70,239,0.3)', '0 0 40px rgba(217,70,239,0.6)', '0 0 20px rgba(217,70,239,0.3)'] }}
                transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
              >
                <span className="elegant-text">✦ Toca para comenzar ✦</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <div className="app-container">
          <div className="stars-bg"></div>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <FloatingParticles />

          {/* ─── Hero Section ─── */}
          <section className="section hero-section">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ y, opacity }}
              className="hero-content"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 1, type: 'spring', stiffness: 120 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], filter: ['drop-shadow(0 0 8px #d946ef)', 'drop-shadow(0 0 20px #d946ef)', 'drop-shadow(0 0 8px #d946ef)'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="hero-icon-wrapper"
                >
                  <HeartFancy size={56} />
                </motion.div>
              </motion.div>

              <TypewriterText
                text="¡Feliz Cumpleaños, Mi Amor!"
                className="hero-title gradient-text cursive-text"
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
              >
                <FloralDivider />
              </motion.div>

              <motion.p
                className="hero-subtitle elegant-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
              >
                Hoy celebramos la vida de la persona más especial.<br />
                Preparé este pequeño detalle solo para ti.
              </motion.p>
            </motion.div>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7, y: [0, 8, 0] }}
              transition={{ opacity: { delay: 3.5 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
            >
              <span className="scroll-text elegant-text">Desliza hacia abajo</span>
              <ScrollArrow size={28} />
            </motion.div>
          </section>

          {/* ─── Gallery Section ─── */}
          <section className="section gallery-section">
            <div className="gallery-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1 }}
                className="gallery-header"
              >
                <motion.h2
                  className="gallery-title cursive-text gradient-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: 'spring' }}
                >
                  Mis Momentos Favoritos
                </motion.h2>
                <motion.p
                  className="gallery-subtitle elegant-text"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Toca cada tarjeta para descubrir la magia ✦
                </motion.p>
              </motion.div>

              <div className="gallery-grid">
                {images.map((img, index) => (
                  <FlipCard key={index} image={img} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Love Note Section ─── */}
          <section className="section note-section">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="glass-panel love-note-container"
            >
              <GlowBorder />
              <StarBurst className="sparkle-tl" size={32} />
              <StarBurst className="sparkle-tr" size={24} />
              <StarBurst className="sparkle-bl" size={24} />
              <StarBurst className="sparkle-br" size={32} />

              <motion.h2
                className="note-title cursive-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Para Mi Niña Hermosa
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <FloralDivider />
              </motion.div>

              <div className="note-text elegant-text">
                {[
                  'Mi mabe hermosa, hoy en este que es tu dia, quiero que sepas que te amo y que nunca lo dejare de hacer',
                  'Mi vida es mejor desde que tu estas en ella, y aunque a veces tengamos nuestras dificultades, siempre encontraremos la forma de volver a querernos',
                  ' Te amo amor mio, con toda mi alma y mi corazon ❤️',
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    className="note-paragraph"
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.25, duration: 0.8 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <FloralDivider />
              </motion.div>

              <motion.p
                className="signature cursive-text"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
              >
                Te amo con todo mi corazón, <br />
                <span className="note-name">Fabian Ramirez</span>
              </motion.p>
            </motion.div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
