import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import useVisitorCount from '../hooks/useVisitorCount.js'

const LINKS = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
  ['/merchandise', 'Merchandise'],
  ['/offers', 'Offers'],
  ['/gallery', 'Gallery'],
  ['/about', 'About Us'],
  ['/contact', 'Contact'],
  ['/faq', 'FAQ'],
  ['/sitemap', 'Site Map'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  // start from the saved choice, or from the phone/computer's own light/dark setting
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('bb-theme')
      if (saved) return saved === 'dark'
    } catch { /* storage blocked: ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const visits = useVisitorCount()
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname]) // close menu after navigating

  // keep the page in step with the button, so the icon and the colours always agree
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('bb-theme', next ? 'dark' : 'light') } catch { /* ignore */ }
  }

  const links = LINKS.map(([to, label]) => (
    <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
  ))

  return (
    <>
      <header className="head">
        <div className="wrap">
          <Link className="logo" to="/" aria-label="Bakerz Bite home">
            <img className="logo-img" src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="" />
            <span><b>Bakerz Bite</b><small>BAKERY &amp; CAFÉ</small></span>
          </Link>
          <nav className="dnav" aria-label="Main">{links}</nav>
          <div className="pill" title="Your visits on this browser">
            <Icon name="eye" size={16} /><b>{visits.toLocaleString('en-NG')}</b><span className="l">{visits === 1 ? 'Visit' : 'Visits'}</span>
          </div>
          <button className="round" type="button" onClick={toggleTheme} aria-label="Switch light or dark">
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
          <button className="round burger" type="button" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
      {open && <nav className="sheetnav show" aria-label="Main menu">{links}</nav>}
    </>
  )
}
