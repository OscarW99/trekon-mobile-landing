import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/' && sessionStorage.getItem('scrollTo')) return
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function CanonicalAndAlternateTags() {
  const { pathname } = useLocation()

  useEffect(() => {
    const cleanPath = pathname === '/' ? '' : pathname
    const canonicalHref = `https://www.trekon.run${cleanPath}`
    const mobileHref = `https://m.trekon.run${cleanPath}`

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalHref)

    let alternate = document.head.querySelector('link[data-mobile-alternate="true"]') as HTMLLinkElement | null
    if (!alternate) {
      alternate = document.createElement('link')
      alternate.setAttribute('rel', 'alternate')
      alternate.setAttribute('media', 'only screen and (max-width: 768px)')
      alternate.setAttribute('data-mobile-alternate', 'true')
      document.head.appendChild(alternate)
    }
    alternate.setAttribute('href', mobileHref)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CanonicalAndAlternateTags />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
