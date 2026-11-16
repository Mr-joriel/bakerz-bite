import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead.jsx'

const GROUPS = [
  ['Shop', [
    ['/', 'Home', 'Logo, banner of cakes, pastries and cookies, categories and customer favourites.'],
    ['/menu', 'Menu', 'Cakes, Pastries, Cookies and Pies with filters, search and sorting. Tap an item for its photo, description and ingredients.'],
    ['/merchandise', 'Merchandise', 'Bakerz Bite branded mugs, bags, glasses and trays.'],
    ['/offers', 'Offers', 'Current in-store deals with details and codes.'],
  ]],
  ['Explore', [
    ['/gallery', 'Gallery', 'Photos of our bakes and café. Tap to enlarge.'],
    ['/about', 'About Us', 'Our story and promise, with email, address and phone number.'],
  ]],
  ['Help', [
    ['/contact', 'Contact and Feedback', 'Email, address, phone and WhatsApp, plus a form to rate us and leave feedback.'],
    ['/faq', 'FAQ', 'Answers to common questions.'],
    ['/sitemap', 'Site Map', 'This page: a guide to every page on the site.'],
  ]],
]

export default function SiteMap() {
  return (
    <section className="sec">
      <div className="wrap">
        <PageHead eyebrow="Everything in one place" title="Site Map"
          text="Every page of Bakerz Bite and what you will find on it." />
        <div className="map">
          {GROUPS.map(([title, links]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>{links.map(([to, label, about]) => (
                <li key={to}><Link to={to}>{label}</Link><small style={{ display: 'block', color: 'var(--muted)' }}>{about}</small></li>
              ))}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
