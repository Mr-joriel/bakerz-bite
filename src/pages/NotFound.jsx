import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap stub">
        <h2>Page not found</h2>
        <p>That page does not exist.</p>
        <Link className="btn solid" to="/">Back to home</Link>
      </div>
    </section>
  )
}
