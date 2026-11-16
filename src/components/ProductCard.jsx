import Stars from './Stars.jsx'

export const naira = (n) => '₦' + n.toLocaleString('en-NG')
export const img = (name) => `${import.meta.env.BASE_URL}img/${name}.jpg`
const FALLBACK = { cake: 'choc-truffle', pastry: 'croissants', cookie: 'cookies', pie: 'apple-pie' }
// if a product photo file is missing, show its category photo instead
export const fallback = (cat) => (e) => {
  const f = img(FALLBACK[cat] || 'hero')
  if (e.currentTarget.src !== new URL(f, location.href).href) e.currentTarget.src = f
}

// One product tile. Works for cakes/pastries/cookies/pies and for merchandise.
export default function ProductCard({ item, onOpen }) {
  const tags = item.tags || []
  return (
    <button type="button" className="card" onClick={() => onOpen(item)}>
      <div className="ph">
        <img src={img(item.img)} alt={item.name} loading="lazy" onError={fallback(item.cat)} />
        {tags.includes('bestseller') && <span className="tag l">Bestseller</span>}
        {tags.includes('new') && <span className="tag r">New</span>}
      </div>
      <div className="info">
        {item.kind && <span className="kind">{item.kind}</span>}
        <h3>{item.name}</h3>
        <div className="rt"><Stars value={item.r} /><span>{item.r.toFixed(1)}</span></div>
        <p>{item.desc}</p>
        <div className="pr">
          <span className="price">{item.opts.length > 1 && <small className="mono" style={{ fontWeight: 400 }}>from </small>}{naira(item.price)}</span>
          <span className="mono">View details →</span>
        </div>
      </div>
    </button>
  )
}
