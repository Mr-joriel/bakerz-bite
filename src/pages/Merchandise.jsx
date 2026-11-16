import { useState } from 'react'
import merch from '../data/merch.json'
import PageHead from '../components/PageHead.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductModal from '../components/ProductModal.jsx'

export default function Merchandise() {
  const [open, setOpen] = useState(null)
  return (
    <section className="sec">
      <div className="wrap">
        <PageHead eyebrow="Bakerz Bite merchandise" title="Take the Bakery Home"
          text="Branded mugs, bags, glasses and trays, because good taste shouldn't stop at the counter." />
        <div className="grid merch">
          {merch.map((m) => <ProductCard key={m.id} item={m} onOpen={setOpen} />)}
        </div>
      </div>
      {open && <ProductModal item={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
