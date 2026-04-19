import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import LiquidEther from './LiquidEther';
import FlowingMenu from './FlowingMenu';
import './App.css';

// ── TRUEFOCUS ─────────────────────────────────────────────
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
        setCurrentIndex(prev => (prev + 1) % words.length);
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
            ref={el => { wordRefs.current[index] = el; }}
            className="focus-word"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              ['--border-color' as string]: borderColor,
              ['--glow-color' as string]: glowColor,
            }}
            onMouseEnter={() => { if (manualMode) { setLastActiveIndex(index); setCurrentIndex(index); } }}
            onMouseLeave={() => { if (manualMode && lastActiveIndex !== null) setCurrentIndex(lastActiveIndex); }}
          >
            {word}
          </span>
        );
      })}
      <motion.div
        className="focus-frame"
        animate={{ x: focusRect.x, y: focusRect.y, width: focusRect.width, height: focusRect.height, opacity: 1 }}
        transition={{ duration: animationDuration }}
        style={{ ['--border-color' as string]: borderColor, ['--glow-color' as string]: glowColor }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
}

// ── PROJECTS ──────────────────────────────────────────────
const menuItems = [
  { link: 'https://la-perla-avetrana.vercel.app/', text: 'Progetto 1', image: 'https://picsum.photos/seed/p1/400/200' },
  { link: 'https://gradi-3-3.vercel.app/', text: 'Progetto 2', image: 'https://picsum.photos/seed/p2/400/200' },
  { link: 'https://gestionale-agricampeggio-monaci.vercel.app/', text: 'Progetto 3', image: 'https://picsum.photos/seed/p3/400/200' },
  { link: 'https://torneo-sotto-orologio.vercel.app/', text: 'Progetto 4', image: 'https://picsum.photos/seed/p4/400/200' },
  { link: 'https://svapo-house-web.vercel.app/', text: 'Progetto 5', image: 'https://picsum.photos/seed/p5/400/200' },
];

// ── APP ───────────────────────────────────────────────────
export default function App() {
  const [projOpen, setProjOpen] = useState(false);

  return (
    <div className="page">
      {/* SFONDO ANIMATO */}
      <div className="bg-layer">
        <LiquidEther />
      </div>

      <div className="content-layer">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">MIRKO.</div>
          <div className="nav-links">
            <a className="nav-link" href="mailto:mirkoprisciano@gmail.com"> <img src="/phone-call.png" alt=""width={40} height={40} /></a>
            <a className="nav-link nav-ig" href="https://instagram.com/mirkopriscia" target="_blank" rel="noreferrer">
              <span  /> <img src="/instagram-circle.png" alt="" width={40} height={40}  /></a>
          </div>
        </nav>

        {/* HERO */}
        <main className="hero">
          <p className="welcome-text">Benvenuto nel mio mondo</p>

          {/* <div className="photo-wrap">
            <div className="photo-placeholder"><img src="" alt="" /></div>
          </div> */}

          <div className="title-wrap big-title">
            <TrueFocus
              sentence="I am Mirko"
              manualMode={false}
              blurAmount={5}
              borderColor="#3ecf8e"
              glowColor="rgba(62,207,142,0.6)"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
            />
          </div>

          <p className="subtitle">Creative & Coder · Design, sviluppo web e contenuti visivi</p>

          <div className="skills-row">
            {['React', 'TypeScript', 'Tailwind', 'Vite', 'Figma', 'Video', 'Social'].map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>

          <div className="cta-row">
            <button className="btn-primary" onClick={() => setProjOpen(o => !o)}>
              I miei progetti
            </button>
            <a className="btn-secondary" href="mailto:mirkoprisciano@gmail.com">Preventivo ↗</a>
          </div>
        </main>

        {/* SEZIONE PROGETTI CON FLOWINGMENU */}
        <div className={`projects-section ${projOpen ? 'open' : ''}`}>
          <FlowingMenu
            items={menuItems}
            speed={18}
            textColor="#fff"
            bgColor="#0a0a0a"
            marqueeBgColor="#3ecf8e"
            marqueeTextColor="#000"
            borderColor="#1e1e1e"
          />
        </div>
      </div>
    </div>
  );
}