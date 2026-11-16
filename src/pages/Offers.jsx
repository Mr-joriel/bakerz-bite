import { useState } from 'react'
import offers from '../data/offers.json'
import PageHead from '../components/PageHead.jsx'
import Icon from '../components/Icon.jsx'
import { copyText } from '../utils/copy.js'

export default function Offers() {
  const [copied, setCopied] = useState('')

  const copy = async (code) => {
    const ok = await copyText(code)
    setCopied(ok ? code : '')
    setTimeout(() => setCopied(''), 1400)
  }

  return (
    <section className="sec tint">
      <div className="wrap">
        <PageHead eyebrow="In-store offers" title="Sweet Deals This Week"
          text="Fresh savings on your favourites. Tap a code to copy it, then quote it in store or when you chat with us on WhatsApp." />
        <div className="offers">
          {offers.map((o) => (
            <article className="offer" key={o.code}>
              <div className="top">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M9 15l6-6" /><circle cx="9.3" cy="9.3" r="1" /><circle cx="14.7" cy="14.7" r="1" />
                </svg>
                <span className="mono">{o.badge}</span>
              </div>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <div className="foot">
                <button type="button" className="code" onClick={() => copy(o.code)} title="Copy code">
                  {copied === o.code ? 'Copied' : o.code}
                </button>
                <span className="when mono"><Icon name="clock" size={14} />{o.when}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
