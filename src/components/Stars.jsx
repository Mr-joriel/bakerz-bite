const STAR = 'M12 2.2l3.1 6.5 7.1 1-5.2 5 1.3 7.1L12 18.4 5.7 21.8 7 14.7 1.8 9.7l7.1-1z'

// Five stars, filled up to the rounded rating.
export default function Stars({ value }) {
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(value) ? '' : 'off'}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={STAR} /></svg>
        </span>
      ))}
    </span>
  )
}
