import { SHOP } from '../config.js'

// Builds a wa.me link that opens WhatsApp with a ready-typed message.
export function waLink(message) {
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`
}
