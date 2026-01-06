import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 2.5, // Increased duration for smoother glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keeping this smooth easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Hero />
      <About />
    </div>

  )
}

export default App
