import { useEffect, useState } from 'react'

const KEY = 'bb-visits'

function read() {
  try { return Number(JSON.parse(localStorage.getItem(KEY))) || 0 } catch { return 0 }
}

// Real count of how many times THIS browser has visited the site.
// +1 once per browser session (a refresh does not count twice). Saved in localStorage.
export default function useVisitorCount() {
  const [count, setCount] = useState(read)
  useEffect(() => {
    try {
      if (!sessionStorage.getItem('bb-seen')) {
        sessionStorage.setItem('bb-seen', '1')
        const next = read() + 1
        localStorage.setItem(KEY, JSON.stringify(next))
        setCount(next)
      }
    } catch { /* storage blocked: keep showing the stored number */ }
  }, [])
  return count
}
