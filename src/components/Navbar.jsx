import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { siteAssets } from '../siteAssets'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/guru', label: 'About Guru' },
  { to: '/classes', label: 'Classes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when navigation happens
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (e) => {
      const menuToggle = document.querySelector('.menu-toggle')
      const navLinks = document.querySelector('.nav-links')
      if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const navClass = `navbar ${scrolled ? 'scrolled' : isHome ? 'hero-nav' : 'scrolled'}`

  return (
    <nav className={navClass}>
      <NavLink to="/" className="nav-brand">
        <div className="nav-logo">
          <img src={siteAssets.logo} alt="Shanthala Nritya Angala" />
        </div>
        <div className="nav-brand-text">
          <h1>Shanthala Nritya Angala</h1>
          <span>Bharatanatyam</span>
        </div>
      </NavLink>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}
