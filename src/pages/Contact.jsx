import { useState } from 'react'
import PageHead from '../components/PageHead.jsx'
import Icon from '../components/Icon.jsx'
import Stars from '../components/Stars.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'
import sample from '../data/sampleReviews.json'
import { SHOP } from '../config.js'
import { waLink } from '../utils/whatsapp.js'
import { copyText } from '../utils/copy.js'
 
const STAR = 'M12 2.2l3.1 6.5 7.1 1-5.2 5 1.3 7.1L12 18.4 5.7 21.8 7 14.7 1.8 9.7l7.1-1z'
 
export default function Contact() {
  const [reviews, setReviews] = useLocalStorage('bb-reviews', []) // saved in the browser
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState('')
 
  const all = [...reviews, ...sample]
  const avg = all.reduce((a, r) => a + r.s, 0) / all.length
 
  const submit = (e) => {
    e.preventDefault()
    if (!rating) { setError('Tap a star to rate your visit.'); return }
    const review = { n: name.trim() || 'Guest', s: rating, m: text.trim() }
    setReviews([review, ...reviews].slice(0, 20))
    // optional: also email the review to the shop owner
    if (SHOP.feedbackUrl) {
      fetch(SHOP.feedbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: review.n, rating: `${review.s} / 5`, message: review.m || '(no comment)', _subject: 'New Bakerz Bite feedback' }),
      }).catch(() => {}) // if offline, the review is still saved in the browser
    }
    setName(''); setText(''); setRating(0); setError(''); setDone(true)
  }
 
  const copy = async (value) => {
    const ok = await copyText(value)
    setCopied(ok ? value : '')
    setTimeout(() => setCopied(''), 1300)
  }
 
  const cards = [
    ['mail', 'Email', SHOP.email, true],
    ['phone', 'Phone', SHOP.phone, true],
    ['pin', 'Address', SHOP.address, false],
  ]
 
  return (
    <>
      <section className="sec">
        <div className="wrap">
          <PageHead eyebrow="Contact us" title="Come Say Hello"
            text="Questions, custom cakes or just craving something sweet? We'd love to hear from you." />
          <div className="cards3">
            {cards.map(([icon, label, value, canCopy]) => (
              <div className="cc" key={label}>
                <Icon name={icon} size={24} />
                <span className="mono">{label}</span>
                <b>{value}</b>
                {canCopy && <button type="button" className="cp" onClick={() => copy(value)}>{copied === value ? 'Copied' : 'Copy'}</button>}
              </div>
            ))}
          </div>
          <div className="hours"><Icon name="clock" size={20} /><span><b>Opening hours:</b> {SHOP.hours}</span></div>
          <div className="cta-row">
            <a className="btn wa-green" href={waLink('Hello Bakerz Bite, I would like to make an enquiry.')} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
 
      <section className="sec tint" id="feedback">
        <div className="wrap">
          <PageHead eyebrow="Feedback & rating" title="Tell Us How We Did" />
          <div className="avg">
            <b>{avg.toFixed(1)}</b>
            <div><Stars value={avg} /><small>Average customer rating · {all.length} reviews</small></div>
          </div>
 
          <form className="fb" onSubmit={submit} noValidate>
            <label htmlFor="fb-name"><span className="mono">Your name</span>
              <input id="fb-name" autoComplete="name" placeholder="e.g. Adaeze O." value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="lab">
              <span className="mono" id="rl">Your rating</span>
              <div className="rate" role="radiogroup" aria-labelledby="rl" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    className={n <= (hover || rating) ? 'on' : ''}
                    onMouseEnter={() => setHover(n)} onClick={() => { setRating(n); setError('') }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={STAR} /></svg>
                  </button>
                ))}
              </div>
              {error && <div className="err">{error}</div>}
            </div>
            <label htmlFor="fb-msg"><span className="mono">Your feedback</span>
              <textarea id="fb-msg" placeholder="Tell us about your visit, your favourite treat, or how we can improve..." value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <button className="btn solid" type="submit">Submit feedback</button>
            {done && <div className="msg">Thank you! Your feedback is now at the top of the list below.</div>}
          </form>
 
          <div className="say">
            <span className="mono">What our customers say</span>
            <div style={{ display: 'grid', gap: 14 }}>
              {all.slice(0, 6).map((r, n) => (
                <div className="rev" key={n}>
                  <p>{r.m || 'No comment left.'}</p>
                  <div className="by"><b>{r.n}</b><Stars value={r.s} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
 