// OWNER: John (hard part). Category tabs + filter chips + search + sort + product pop-up.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import PageHead from '../components/PageHead.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductModal from '../components/ProductModal.jsx'
import Icon from '../components/Icon.jsx'

const CATS = [['all', 'All'], ['cake', 'Cakes'], ['pastry', 'Pastries'], ['cookie', 'Cookies'], ['pie', 'Pies']]
const PAGE = 8 // how many items each "See more" click reveals
const TAGS = ['bestseller', 'new', 'eggless', 'vegan', 'chocolate', 'fruit']

export default function Menu() {
  const [params] = useSearchParams()
  const start = params.get('cat')
  const [cat, setCat] = useState(CATS.some(([k]) => k === start) ? start : 'all')
  const [tags, setTags] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')
  const [open, setOpen] = useState(null)
  const [shown, setShown] = useState(PAGE)

  // start from the first page again whenever a filter changes
  useEffect(() => { setShown(PAGE) }, [cat, tags, query, sort])

  const toggleTag = (t) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = products.filter(
      (p) =>
        (cat === 'all' || p.cat === cat) &&
        tags.every((t) => p.tags.includes(t)) &&
        (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q))
    )
    if (sort === 'low') out.sort((a, b) => a.price - b.price)
    if (sort === 'high') out.sort((a, b) => b.price - a.price)
    if (sort === 'az') out.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'popular') out.sort((a, b) => b.r - a.r)
    return out
  }, [cat, tags, query, sort])

  return (
    <section className="sec">
      <div className="wrap">
        <PageHead eyebrow="Our menu" title="Baked Fresh, Every Day"
          text="Over 300 varieties made in-store. Explore our cakes, pastries, cookies and pies, then tap any item for full ingredients and details." />

        <div className="tabs" role="tablist" aria-label="Category">
          {CATS.map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={cat === k}
              className={'tab' + (cat === k ? ' on' : '')} onClick={() => setCat(k)}>{label}</button>
          ))}
        </div>

        <div className="chips" aria-label="Filters">
          <span className="fl mono"><Icon name="sliders" size={15} />Filter</span>
          {TAGS.map((t) => (
            <button key={t} type="button" aria-pressed={tags.includes(t)}
              className={'chip' + (tags.includes(t) ? ' on' : '')} onClick={() => toggleTag(t)}>{t}</button>
          ))}
        </div>

        <div className="toolbar">
          <input className="srch" type="search" placeholder="Search the menu" value={query}
            onChange={(e) => setQuery(e.target.value)} aria-label="Search the menu" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
            <option value="popular">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="az">Name A to Z</option>
          </select>
        </div>

        <div className="count" aria-live="polite">Showing {Math.min(shown, list.length)} of {list.length} {list.length === 1 ? 'item' : 'items'}</div>
        <div className="grid">
          {list.length === 0 && <div className="empty">Nothing matches those filters yet. Remove a filter or pick another category.</div>}
          {list.slice(0, shown).map((p) => <ProductCard key={p.id} item={p} onOpen={setOpen} />)}
        </div>

        {list.length > PAGE && (
          <div className="more">
            {shown < list.length ? (
              <button type="button" className="btn" onClick={() => setShown(shown + PAGE)}>
                See more ({list.length - shown} left)
              </button>
            ) : (
              <button type="button" className="btn link" onClick={() => { setShown(PAGE); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                Show less
              </button>
            )}
            <p className="note">We bake 300+ varieties in store, and this is the selection listed here. Looking for something else? Chat with us on WhatsApp and we will tell you what is fresh today.</p>
          </div>
        )}
      </div>
      {open && <ProductModal item={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
