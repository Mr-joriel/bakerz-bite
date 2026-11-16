import { useCallback, useEffect, useState } from 'react'
import PageHead from '../components/PageHead.jsx'
import { img } from '../components/ProductCard.jsx'

// [photo file in public/img, caption, big tile?]
const PHOTOS = [
  ['hero', 'Our counter of fresh bakes', true],
  ['store', 'Inside the café'],
  ['choc-cake-2', 'Chocolate drip cake'],
  ['apple-pie', 'Lattice apple pie', true],
  ['eclair', 'Chocolate éclair'],
  ['cinnamon', 'Cinnamon rolls'],
  ['lemon-meringue', 'Lemon meringue pie'],
  ['tray', 'Wooden serving tray'],
  ['croissants', 'Butter croissants'],
  ['cookies', 'Chocolate chip cookies'],
  ['black-forest', 'Black forest cake'],
  ['red-velvet', 'Red velvet cake'],
]

export default function Gallery() {
  const [i, setI] = useState(null) // index of the open picture, or null

  const step = useCallback((d) => setI((cur) => (cur + d + PHOTOS.length) % PHOTOS.length), [])

  useEffect(() => {
    if (i === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setI(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [i, step])

  return (
    <section className="sec">
      <div className="wrap">
        <PageHead eyebrow="Gallery" title="A Peek Inside the Oven"
          text="Moments from our kitchen and café. Tap any image to view it larger." />
        <div className="gal">
          {PHOTOS.map(([name, caption, big], n) => (
            <button key={name} type="button" className={big ? 'big' : ''} onClick={() => setI(n)} aria-label={`Open ${caption}`}>
              <img src={img(name)} alt={caption} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {i !== null && (
        <div className="modal show in" role="dialog" aria-modal="true" aria-label="Gallery picture"
          onClick={(e) => e.target === e.currentTarget && setI(null)}>
          <div className="mbox lbx">
            <button className="x" type="button" aria-label="Close" onClick={() => setI(null)}>×</button>
            <img src={img(PHOTOS[i][0])} alt={PHOTOS[i][1]} />
            <div className="lbbar">
              <b style={{ fontFamily: 'var(--serif)' }}>{PHOTOS[i][1]}</b>
              <span style={{ display: 'flex', gap: 8 }}>
                <button className="btn sm" type="button" onClick={() => step(-1)}>Prev</button>
                <button className="btn sm" type="button" onClick={() => step(1)}>Next</button>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
