import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Ticker from './Ticker.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

// Shared shell: header + page + footer + WhatsApp button + bottom ticker on every route.
export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Header />
      <main>
        <div className="page" key={pathname}><Outlet /></div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Ticker />
    </>
  )
}
