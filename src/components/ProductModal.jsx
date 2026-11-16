import { Fragment, useEffect, useState } from 'react'
import Stars from './Stars.jsx'
import { naira, img, fallback } from './ProductCard.jsx'
import { waLink } from '../utils/whatsapp.js'

// Pop-up with photo, description, ingredients, specification and price.
export default function ProductModal({ item, onClose }) {
  const [opt, setOpt] = useState(0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const [label, price] = item.opts[opt]
  const sizeText = item.opts.length > 1 ? ` (${label})` : ''
  const message = `Hello Bakerz Bite, I am interested in the ${item.name}${sizeText} at ${naira(price)}. Is it available?`

  return (
    <div className="modal show in" role="dialog" aria-modal="true" aria-labelledby="m-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox">
        <button className="x" type="button" aria-label="Close" onClick={onClose}>×</button>
        <div className="mp"><img src={img(item.img)} alt={item.name} onError={fallback(item.cat)} /></div>
        <div className="mb">
          <span className="kind">{item.kind || item.cat}</span>
          <h3 id="m-title">{item.name}</h3>
          <div className="rt"><Stars value={item.r} /><span>{item.r.toFixed(1)}</span></div>
          <p className="desc">{item.desc}</p>
          <div>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 8 }}>
              {item.kind ? 'Made from' : 'Ingredients'}
            </div>
            <div className="ing">{item.ing.map((x) => <span key={x}>{x}</span>)}</div>
          </div>
          <dl className="spec">
            {Object.entries(item.spec).map(([k, v]) => (<Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>))}
          </dl>
          {item.opts.length > 1 && (
            <select aria-label="Size or pack" value={opt} onChange={(e) => setOpt(+e.target.value)}>
              {item.opts.map((o, i) => <option key={o[0]} value={i}>{o[0]} · {naira(o[1])}</option>)}
            </select>
          )}
          <div className="price" style={{ fontSize: '1.7rem' }}>{naira(price)}</div>
          <a className="btn wa-green" href={waLink(message)} target="_blank" rel="noopener noreferrer"
            style={{ justifyContent: 'center' }}>
            Chat on WhatsApp
          </a>
          <p className="note" style={{ textAlign: 'left' }}>
            This site is for viewing only. To ask about this item, chat with us on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  )
}
