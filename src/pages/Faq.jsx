import faqs from '../data/faq.json'
import PageHead from '../components/PageHead.jsx'
import Icon from '../components/Icon.jsx'

export default function Faq() {
  return (
    <section className="sec tint">
      <div className="wrap">
        <PageHead eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="faq">
          {faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary>{f.q}<Icon name="down" size={18} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
