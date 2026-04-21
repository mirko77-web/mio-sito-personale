import { useState } from 'react';
import LiquidEther from './LiquidEther';
import StaggeredMenu from './StaggeredMenu';
import TrueFocus from './TrueFocus';
import './App.css';

const PROJECTS = [
  {
    num: '01',
    name: 'Torneo sotto orologio',
    desc: 'sito · React',
    link: 'https://torneo-sotto-orologio.vercel.app/',
    image: '/torneo.jpg',
    tag: 'React',
  },
  {
    num: '02',
    name: 'Svapo House',
    desc: 'E-commerce · Vite',
    link: 'https://svapo-house-web.vercel.app/',
    image: '/svapo.png',
    tag: 'E-commerce',
  },
  {
    num: '03',
    name: 'La Perla Avetrana',
    desc: 'Sito locale · React',
    link: 'https://la-perla-avetrana.vercel.app/',
    image: '/laperla.jpeg',
    tag: 'React',
  },
  {
    num: '04',
    name: 'Gradi 3.3',
    desc: 'sito/menù · Vite',
    link: 'https://gradi-3-3.vercel.app/',
    image: '/logook.png',
    tag: 'Vite',
  },
];

type ContactForm = {
  nome: string;
  cognome: string;
  email: string;
  messaggio: string;
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    nome: '',
    cognome: '',
    email: '',
    messaggio: '',
  });

  function handleClose() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModal() {
    setModalOpen(true);
    setSent(false);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = '';
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Nuovo progetto da ${form.nome} ${form.cognome}`);
    const body = encodeURIComponent(
      `Nome: ${form.nome} ${form.cognome}\nEmail: ${form.email}\n\nMessaggio:\n${form.messaggio}`
    );
    window.location.href = `mailto:mirkoprisciano@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ nome: '', cognome: '', email: '', messaggio: '' });
  }

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
              Creative &amp; Coder · Design,
              <br />
              sviluppo web e contenuti visivi
            </p>

            <div className="skills-row">
              {['React', 'TypeScript', 'Tailwind', 'Html', 'JavaScript', 'Vite', 'Figma', 'Video', 'Social'].map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>

            <div className="cta-row">
              {/* Bottone apre il modale */}
              <button className="btn-outline" onClick={openModal}>
                <span>Parliamo del tuo progetto</span>
                <span className="btn-outline-arr">↗</span>
              </button>
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

        <section id="projects" className="projects-showcase">
          <div className="projects-head">
            <div>
              <p className="projects-kicker">Portfolio</p>
              <h2>I miei progetti</h2>
            </div>
            <button className="projects-close" onClick={handleClose}>
              ↑ Torna su
            </button>
          </div>

          <div className="projects-showcase-grid">
            {PROJECTS.map((project) => (
              <a
                key={project.num}
                className="project-showcase-card"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                style={{ '--card-image': `url(${project.image})` } as React.CSSProperties}
              >
                <div className="card-image-layer" />
                <div className="card-gradient-overlay" />
                <span className="card-tech-badge">{project.tag}</span>
                <div className="project-showcase-copy">
                  <span className="project-showcase-num">{project.num}</span>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <span className="project-showcase-link">
                    Apri progetto <span className="link-arrow">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ===== MODALE CONTATTO ===== */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">

            {/* Glow decorativo */}
            <div className="modal-glow" />

            {/* Header */}
            <div className="modal-header">
              <div>
                <p className="modal-kicker">Contatti</p>
                <h3 className="modal-title">Parliamo del tuo progetto</h3>
              </div>
              <button className="modal-close-btn" onClick={closeModal} aria-label="Chiudi">✕</button>
            </div>

            {sent ? (
              <div className="modal-sent">
                <div className="modal-sent-icon">✓</div>
                <p className="modal-sent-title">Messaggio inviato!</p>
                <p className="modal-sent-sub">Si è aperto il tuo client email con il messaggio pronto. A presto!</p>
                <button className="modal-send-btn" onClick={closeModal}>Chiudi</button>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-row">
                  <div className="modal-field">
                    <label className="modal-label">Nome</label>
                    <input
                      className="modal-input"
                      type="text"
                      name="nome"
                      placeholder="Mario"
                      value={form.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Cognome</label>
                    <input
                      className="modal-input"
                      type="text"
                      name="cognome"
                      placeholder="Rossi"
                      value={form.cognome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-field">
                  <label className="modal-label">Email</label>
                  <input
                    className="modal-input"
                    type="email"
                    name="email"
                    placeholder="mario@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label className="modal-label">Messaggio</label>
                  <textarea
                    className="modal-textarea"
                    name="messaggio"
                    placeholder="Raccontami del tuo progetto..."
                    rows={4}
                    value={form.messaggio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="modal-send-btn" type="submit">
                  <span>Invia messaggio</span>
                  <span className="modal-send-arr">↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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