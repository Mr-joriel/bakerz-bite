import { useEffect, useState } from 'react'
import useGeolocation from '../hooks/useGeolocation.js'

// Continuous bottom ticker: date, time and the visitor's real location.
export default function Ticker() {
  const [now, setNow] = useState(new Date())
  const { status, label, request } = useGeolocation()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const date = now.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' })
  const time = now.toLocaleTimeString('en-NG', { hour12: false, timeZone: 'Africa/Lagos' })

  let where
  if (label) where = <b>{label}</b>
  else if (status === 'asking') where = <b>finding you...</b>
  else if (status === 'unsupported') where = <b>not supported by this browser</b>
  else where = (
    <>
      <b>location is off</b>{' '}
      <button type="button" className="linkbtn" onClick={request}>Enable location</button>
    </>
  )

  const seg = (
    <>
      Where smiles are served daily<i>•</i>Freshly baked in-store every morning<i>•</i>
      <b>{date}</b><i>•</i>{time} WAT<i>•</i>Your location: {where}<i>•</i>
    </>
  )
  return (
    <div className="ticker" aria-label="Today's date, time and location">
      <div className="run">{seg}{seg}</div>
    </div>
  )
}
