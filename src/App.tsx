import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import LiquidEther from './LiquidEther';
import FlowingMenu from './FlowingMenu';
import './App.css';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

function TrueFocus({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#3ecf8e',
  glowColor = 'rgba(62,207,142,0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="focus-word"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              ['--border-color' as string]: borderColor,
              ['--glow-color' as string]: glowColor,
            }}
            onMouseEnter={() => {
              if (manualMode) {
                setLastActiveIndex(index);
                setCurrentIndex(index);
              }
            }}
            onMouseLeave={() => {
              if (manualMode && lastActiveIndex !== null) setCurrentIndex(lastActiveIndex);
            }}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: 1,
        }}
        transition={{ duration: animationDuration }}
        style={{
          ['--border-color' as string]: borderColor,
          ['--glow-color' as string]: glowColor,
        }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
}

const menuItems = [
  { link: 'https://torneo-sotto-orologio.vercel.app/', text: 'Progetto 1', image: 'https://picsum.photos/seed/p1/400/200' },
  { link: 'https://svapo-house-web.vercel.app/', text: 'Progetto 2', image: 'https://picsum.photos/seed/p2/400/200' },
  { link: 'https://la-perla-avetrana.vercel.app/', text: 'Progetto 3', image: 'https://picsum.photos/seed/p3/400/200' },
  { link: 'https://gradi-3-3.vercel.app/', text: 'Progetto 4', image: 'https://picsum.photos/seed/p4/400/200' },
];

export default function App() {
  const [projOpen, setProjOpen] = useState(false);

  return (
    <div className="page">
      <div className="bg-layer">
        <LiquidEther />
      </div>

      <div className="bg-image-right" />

      <div className="content-layer">
        <nav className="navbar">
          <div className="logo">MIRKO.</div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => setProjOpen((o) => !o)}>
              Progetti {projOpen ? '▴' : '▾'}
            </button>

            <a
              className="nav-link nav-gh"
              href="https://github.com/mirko77-web"
              target="_blank"
              rel="noreferrer"
            >
              <span className="gh-icon">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </span>
              GitHub
            </a>

            <a
              className="nav-link nav-ig"
              href="https://www.instagram.com/mirko_priscia?igsh=MWF0cW9jOTYyb3JtYw=="
              target="_blank"
              rel="noreferrer"
            >
           
              <img src="public/insta-logo.png" width={20} height={20} alt="Instagram" />Instagram
            </a>

            <a className="nav-link" href="mailto:mirkoprisciano@gmail.com">
              <span className="gmail-icon">✉</span>
              Gmail
            </a>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-text">
            <p className="welcome-text">benvenuti nella mia pagina</p>

            <TrueFocus
              sentence="I am Mirko"
              manualMode={false}
              blurAmount={5}
              borderColor="#3ecf8e"
              glowColor="rgba(62,207,142,0.6)"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
            />

            <p className="subtitle">
              Creative & Coder · Design,
              <br />
              sviluppo web e contenuti visivi
            </p>

            <div className="skills-row">
              {['React', 'TypeScript', 'Tailwind', 'Html', 'JavaScript', 'Vite', 'Figma', 'Video', 'Social'].map(
                (s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                )
              )}
            </div>

            <div className="cta-row">
              <button className="btn-d" onClick={() => setProjOpen((o) => !o)}>
                <span>I miei progetti</span>
                <span className="btn-arrow">→</span>
              </button>

              <div className="btn-divider" />

              <a className="btn-d2" href="mailto:tua@gmail.com">
                <span>Parliamo del tuo progetto</span>
                <span className="btn-arrow2">↗</span>
              </a>
            </div>

            <div className="wow-card">
              <div className="wow-card-glow" />
              <div className="wow-card-inner">
                <div className="wow-stat">
                  <span className="wow-num">10+</span>
                  <span className="wow-label">Progetti creati</span>
                </div>
                <div className="wow-stat">
                  <span className="wow-num">2+</span>
                  <span className="wow-label">Anni di pratica</span>
                </div>
                <div className="wow-stat">
                  <span className="wow-num">100%</span>
                  <span className="wow-label">Responsive</span>
                </div>
              </div>
              <p className="wow-text">
                Web design, frontend e contenuti visivi con un approccio pulito, moderno e focalizzato sulla conversione.
              </p>
            </div>

            <div className={`projects-section ${projOpen ? 'open' : ''}`}>
              <FlowingMenu
                items={menuItems}
                speed={18}
                textColor="#fff"
                bgColor="#050505"
                marqueeBgColor="#3ecf8e"
                marqueeTextColor="#000"
                borderColor="#1a1a1a"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}