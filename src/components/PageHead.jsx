// Centred section heading used at the top of every page.
export default function PageHead({ eyebrow, title, text }) {
  return (
    <div className="sh">
      <span className="mono">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
