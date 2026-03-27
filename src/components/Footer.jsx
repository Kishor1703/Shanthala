import { Link } from 'react-router-dom'
import { siteAssets } from '../siteAssets'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img className="footer-logo" src={siteAssets.logo} alt="Shanthala Nritya Angala" />
            </div>
            <h3>Shanthala Nritya<br />Angala</h3>
            <p>Rooted in the rich heritage of Bharatanatyam, our dance school aims to impart strong fundamentals while guiding students in both artistic and personal development.</p>
            <div className="footer-socials">
              <div className="social-icon">IG</div>
              <div className="social-icon">FB</div>
              <div className="social-icon">YT</div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/guru', label: 'About Guru' },
                { to: '/classes', label: 'Classes Offered' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <p className="footer-contact-item">info@shanthaladance.in</p>
            <p className="footer-contact-item">+91 99867 30111</p>
            <p className="footer-contact-item">25, 8th Main Rd, 10th Cross,<br />2nd Block, Jayanagar,<br />Bengaluru, Karnataka 560011</p>
            <p className="footer-contact-item">Mon-Fri: 9AM - 8PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 Shanthala Nritya Angala. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
