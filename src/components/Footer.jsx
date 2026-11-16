import { Link } from 'react-router-dom'
import { SHOP } from '../config.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div className="about-f">
            <Link className="logo" to="/"><img className="logo-img" src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="" /><span><b>Bakerz Bite</b></span></Link>
            <p>A bakery &amp; café serving artisan pastries, gourmet cakes and handcrafted beverages. <strong style={{ fontSize: '1.3em' }}> <br /> Where smiles are served daily.</strong></p>
          </div>
          <div>
            <h4>Site map</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/offers">Offers</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/merchandise">Merchandise</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><Link to="/contact">Feedback</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/sitemap">Site map</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>{SHOP.address}</li>
              <li>{SHOP.email}</li>
              <li>{SHOP.phone}</li>
            </ul>
          </div>
        </div>
        <div className="fbot mono">
          <span>© {new Date().getFullYear()} Bakerz Bite · Bakery &amp; Café</span>
          <span>Where smiles are served daily</span>
        </div>
      </div>
    </footer>
  )
}
