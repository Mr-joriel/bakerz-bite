import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'
import Icon from '../components/Icon.jsx'
import { img } from '../components/ProductCard.jsx'
import { SHOP } from '../config.js'

const TICKS = [
  'Real butter, cream and unbleached flour, always',
  'Over 300 baked varieties made fresh in-store',
  'Carefully selected, quality ingredients',
  'Customers treated like family',
]

export default function About() {
  return (
    <>
      <section className="sec">
        <div className="wrap about">
          <div className="apic">
            <div className="frame" style={{ aspectRatio: '4/3.1' }}>
              <img src={img('about')} alt="Inside the Bakerz Bite café with the display counter" style={{ opacity: 1 }} />
            </div>
            <div className="badge"><b>Since 2010</b><small>Baking with love</small></div>
          </div>
          <div>
            <span className="mono" style={{ color: 'var(--accent)' }}>About us</span>
            <h2 style={{ marginTop: 10 }}>Baked with real butter, cream and love</h2>
            <p>Since its launch, Bakerz Bite has grown into a reputable bakery &amp; café, specialising in baked goods passionately made from the finest ingredients.</p>
            <p>We offer a wide range of baked goods made fresh in-store every day, more than 300 different kinds, including artisan pastries, gourmet cakes and desserts, and handcrafted beverages.</p>
            <p>We're dedicated to delivering premium quality, so we only use real butter, cream and unbleached flour. We treat our customers as family, and will never use an ingredient we wouldn't feed our own.</p>
            <ul className="ticks">
              {TICKS.map((t) => <li key={t}><Icon name="check" size={16} />{t}</li>)}
            </ul>
            <blockquote>&ldquo;Where smiles are served daily.&rdquo;</blockquote>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <PageHead eyebrow="Find us" title="Email, Phone and Address" />
          <div className="cards3">
            <div className="cc"><Icon name="mail" size={24} /><span className="mono">Email</span><b>{SHOP.email}</b></div>
            <div className="cc"><Icon name="phone" size={24} /><span className="mono">Phone</span><b>{SHOP.phone}</b></div>
            <div className="cc"><Icon name="pin" size={24} /><span className="mono">Address</span><b>{SHOP.address}</b></div>
          </div>
          <div className="cta-row"><Link className="btn" to="/contact">Contact us and leave feedback</Link></div>
        </div>
      </section>
    </>
  )
}
