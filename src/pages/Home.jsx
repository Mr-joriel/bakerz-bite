import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import PageHead from '../components/PageHead.jsx'
import ProductCard, { img } from '../components/ProductCard.jsx'
import ProductModal from '../components/ProductModal.jsx'

const SLIDES = [
  ['hero', 'Counter of cakes, pastries, cookies and pies'],
  ['croissants', 'Butter croissants in a linen-lined bowl'],
  ['cookies', 'Stack of chocolate chip cookies'],
  ['choc-cake-2', 'Chocolate drip cake on a stone stand'],
]
const CATS = [
  ['cake', 'Cakes', 'choc-truffle'],
  ['pastry', 'Pastries', 'croissants'],
  ['cookie', 'Cookies', 'cookies'],
  ['pie', 'Pies', 'apple-pie'],
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [open, setOpen] = useState(null)

  // banner changes by itself every 5 seconds
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  const best = products.filter((p) => p.tags.includes('bestseller')).slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <div className="loved mono">Loved by 12,000+ sweet tooths</div>
            <h1>Where smiles are <em>served daily.</em></h1>
            <p className="lead">
              Artisan pastries, gourmet cakes and handcrafted beverages, baked with real butter, cream and
              unbleached flour. Fresh in-store every single morning.
            </p>
            <div className="cta">
              <Link className="btn solid" to="/menu">Explore the menu ›</Link>
              <Link className="btn" to="/offers">Today's offers</Link>
            </div>
          </div>
          <div className="stage">
            <div className="frame">
              {SLIDES.map(([name, alt], i) => (
                <img key={name} src={img(name)} alt={alt} className={i === slide ? 'on' : ''} />
              ))}
            </div>
            <div className="thumbs">
              {SLIDES.slice(1).map(([name, alt], i) => (
                <button key={name} type="button" aria-label={`Show ${alt}`}
                  className={slide === i + 1 ? 'on' : ''} onClick={() => setSlide(i + 1)}>
                  <img src={img(name)} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap strip">
        <div><b>Baked daily</b><span>Ready from 8:00 am</span></div>
        <div><b>Custom cakes</b><span>Ask 48 hours ahead</span></div>
        <div><b>Lagos delivery</b><span>Island and Mainland</span></div>
        <div><b>Chat on WhatsApp</b><span>Quick, simple, no app</span></div>
      </div>

      <section className="sec tint">
        <div className="wrap">
          <PageHead eyebrow="What we bake" title="Pick a Counter"
            text="Four counters, one standard. Tap a category to see everything on it." />
          <div className="cats">
            {CATS.map(([k, label, photo]) => (
              <Link key={k} className="catcard" to={`/menu?cat=${k}`}>
                <div className="ph"><img src={img(photo)} alt={label} loading="lazy" /></div>
                <div className="t"><h3>{label}</h3><small>{products.filter((p) => p.cat === k).length} items</small></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <PageHead eyebrow="Customer favourites" title="Bestsellers" />
          <div className="grid">
            {best.map((p) => <ProductCard key={p.id} item={p} onOpen={setOpen} />)}
          </div>
          <div className="cta-row"><Link className="btn" to="/menu">View full menu</Link></div>
        </div>
      </section>
      {open && <ProductModal item={open} onClose={() => setOpen(null)} />}
    </>
  )
}
