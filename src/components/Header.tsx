import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/?category=Tamil', label: 'Tamil Radios', end: false },
  { to: '/favorites', label: 'Favorites', end: true },
  { to: '/about', label: 'About', end: true },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <NavLink to="/" className="wordmark" onClick={() => setOpen(false)}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="13" cy="13" r="12" fill="none" stroke="var(--marigold)" strokeWidth="2" />
            <path d="M8 13a5 5 0 0 1 5-5m0 10a5 5 0 0 0 5-5" stroke="var(--marigold)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <span>
            Ki<span className="wordmark__accent">Ki</span> FM
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
            <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <nav id="primary-nav" className={`site-nav ${open ? 'site-nav--open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
