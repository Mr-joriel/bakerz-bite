import { waLink } from '../utils/whatsapp.js'

// Floating "Chat on WhatsApp" button shown on every page.
export default function WhatsAppButton() {
  return (
    <a className="wa" href={waLink('Hello Bakerz Bite, I would like to make an enquiry.')}
      target="_blank" rel="noopener noreferrer">
      Chat on WhatsApp
    </a>
  )
}
