import { useState } from 'react';
import './StaggeredMenu.css';

interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

type CSSVars = React.CSSProperties & {
  ['--delay']?: string;
};

export default function StaggeredMenu({
  position = 'right',
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#3ecf8e',
  changeMenuColorOnOpen = true,
  colors = ['#0c0c0f', '#3ecf8e'],
  logoUrl = '',
  accentColor = '#3ecf8e',
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);
    next ? onMenuOpen?.() : onMenuClose?.();
  };

  const closeMenu = () => {
    setOpen(false);
    onMenuClose?.();
  };

  return (
    <div
      className={`staggered-menu-wrapper ${position} ${open ? 'open' : ''}`}
      style={
        {
          ['--menu-bg-1']: colors[0],
          ['--menu-bg-2']: colors[1],
          ['--accent-color']: accentColor,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className="staggered-menu-btn"
        onClick={toggleMenu}
        style={{
          color: open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
          borderColor: open ? openMenuButtonColor : menuButtonColor,
        }}
      >
        {open ? '×' : '≡'}
      </button>

      <div className={`staggered-menu-overlay ${open ? 'open' : ''}`}>
        <div className="staggered-menu-inner">
          {logoUrl && (
            <div className="staggered-menu-logo">
              <img src={logoUrl} alt="logo" />
            </div>
          )}

          <nav className="staggered-menu-list">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                aria-label={item.ariaLabel}
                className="staggered-menu-item"
                style={{ ['--delay']: `${i * 0.08}s` } as CSSVars}
                onClick={closeMenu}
              >
                {displayItemNumbering && (
                  <span className="staggered-menu-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {displaySocials && socialItems.length > 0 && (
            <div className="staggered-menu-socials">
              {socialItems.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="staggered-menu-social"
                  style={{ ['--delay']: `${0.4 + i * 0.08}s` } as CSSVars}
                  onClick={closeMenu}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}