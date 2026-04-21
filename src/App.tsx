import { useState } from 'react';
import LiquidEther from './LiquidEther';
import StaggeredMenu from './StaggeredMenu';
import TrueFocus from './TrueFocus';
import './App.css';

const PROJECTS = [
  {
    num: '01',
    name: 'Torneo sotto orologio',
    desc: 'Web app · React',
    link: 'https://torneo-sotto-orologio.vercel.app/',
    image: '/torneo oriz.jpg',
  },
  {
    num: '02',
    name: 'Svapo House',
    desc: 'E-commerce · Vite',
    link: 'https://svapo-house-web.vercel.app/',
    image: '/svapo.png',
  },
  {
    num: '03',
    name: 'La Perla Avetrana',
    desc: 'Sito locale · React',
    link: 'https://la-perla-avetrana.vercel.app/',
    image: '/laperla.jpeg',
  },
  {
    num: '04',
    name: 'Gradi 3.3',
    desc: 'Portfolio · Vite',
    link: 'https://gradi-3-3.vercel.app/',
    image: '/logook.png',
  },
];

export default function App() {
  const [projectsOpen, setProjectsOpen] = useState(false);

  const openProjects = () => {
    setProjectsOpen(true);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="page">
      <div className="bg-layer">
        <LiquidEther />
      </div>

      <div className="bg-image-right" />

      <div className="content-layer">
        <div className="hero">
          <div className="hero-text">
            <p className="welcome-text">Benvenuti nella mia pagina</p>

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
              {['React', 'TypeScript', 'Tailwind', 'Html', 'JavaScript', 'Vite', 'Figma', 'Video', 'Social'].map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </div>

            <div className="cta-row">
              <button className="btn-main" onClick={openProjects}>
                <span>I miei progetti</span>
                <span className="btn-main-arr">→</span>
              </button>

              <a className="btn-outline" href="mailto:mirkoprisciano@gmail.com">
                <span>Parliamo del tuo progetto</span>
                <span className="btn-outline-arr">↗</span>
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
          </div>
        </div>

        {projectsOpen && (
          <section id="projects" className="projects-showcase">
            <div className="projects-head">
              <div>
                <p className="projects-kicker">Portfolio</p>
                <h2>I miei progetti</h2>
              </div>

              <button className="projects-close" onClick={() => setProjectsOpen(false)}>
                Chiudi
              </button>
            </div>

            <div className="projects-showcase-grid">
              {PROJECTS.map((project, index) => (
                <a
                  key={project.num}
                  className={`project-showcase-card ${index % 2 === 0 ? 'left' : 'right'}`}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="project-showcase-image">
                    <img src={project.image} alt={project.name} />
                  </div>

                  <div className="project-showcase-copy">
                    <span className="project-showcase-num">{project.num}</span>
                    <h3>{project.name}</h3>
                    <p>{project.desc}</p>
                    <span className="project-showcase-link">Apri progetto ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      <StaggeredMenu
        position="right"
        items={[
          { label: 'Home', ariaLabel: 'Vai alla home', link: '/' },
          { label: 'Progetti', ariaLabel: 'I miei progetti', link: '#projects' },
          { label: 'Contatti', ariaLabel: 'Contattami', link: 'mailto:mirkoprisciano@gmail.com' },
        ]}
        socialItems={[
          { label: 'GitHub', link: 'https://github.com/mirko77-web' },
          { label: 'Instagram', link: 'https://www.instagram.com/mirko_priscia' },
        ]}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#3ecf8e"
        changeMenuColorOnOpen={true}
        colors={['#0c0c0f', '#3ecf8e']}
        logoUrl="/profilo.jpeg"
        accentColor="#3ecf8e"
      />
    </div>
  );
}