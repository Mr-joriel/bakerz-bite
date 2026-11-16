import { useCallback, useEffect, useState } from 'react'

const KEY = 'bb-location'

function saved() {
  try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
}

// Turns coordinates into "City, State, Country" (free BigDataCloud endpoint, no API key).
async function nameFor(lat, lon) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    const res = await fetch(url)
    if (!res.ok) throw new Error('lookup failed')
    const d = await res.json()
    const parts = [d.locality || d.city, d.principalSubdivision, d.countryName].filter(Boolean)
    return parts.length ? [...new Set(parts)].join(', ') : null
  } catch {
    return null
  }
}

// Asks the browser for the visitor's location when the site opens.
// The browser itself shows the "Allow this time / Allow while visiting the site / Block" prompt.
// status: 'asking' | 'ok' | 'denied' | 'unsupported'
export default function useGeolocation() {
  const [state, setState] = useState(() => {
    const s = saved()
    return s?.label ? { status: 'asking', label: s.label } : { status: 'asking', label: '' }
  })

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({ status: 'unsupported', label: '' })
      return
    }
    setState((s) => ({ ...s, status: 'asking' }))
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = +pos.coords.latitude.toFixed(4)
        const lon = +pos.coords.longitude.toFixed(4)
        const label = (await nameFor(lat, lon)) || `${lat}°, ${lon}°`
        try { localStorage.setItem(KEY, JSON.stringify({ label, lat, lon, at: Date.now() })) } catch { /* ignore */ }
        setState({ status: 'ok', label })
      },
      () => {
        try { localStorage.removeItem(KEY) } catch { /* ignore */ }
        setState({ status: 'denied', label: '' })
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10 * 60 * 1000 }
    )
  }, [])

  useEffect(() => { request() }, [request])

  return { ...state, request }
}
