import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import CustomCursor from './components/CustomCursor/CustomCursor'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Vertical Sections Color Change
      const sections = document.querySelectorAll('.section');

      sections.forEach((section) => {
        const color = section.getAttribute('data-color');

        // Skip panels as they are handled by horizontal logic
        if (section.classList.contains('panel')) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
        });
      });

      // 2. Horizontal Scroll Sections Configuration
      const horizontalSections = [aboutRef, projectsRef];

      horizontalSections.forEach((sectionRef) => {
        if (sectionRef.current) {
          const container = sectionRef.current.querySelector('.flex');
          // Scope query to this specific section to avoid selecting panels from other sections
          const panels = gsap.utils.toArray(sectionRef.current.querySelectorAll(".panel"));

          if (container && panels.length > 0) {
            const scrollTween = gsap.to(container, {
              x: () => -(container.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + (container.scrollWidth - window.innerWidth),
              },
            });

            // Horizontal Panels Color Change
            panels.forEach((panel) => {
              const color = panel.getAttribute('data-color');
              if (color) {
                ScrollTrigger.create({
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 65%",
                  end: "right 65%",
                  onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
                  onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
                });
              }
            });

            // Parallax Effect for floating elements
            const parallaxElements = sectionRef.current.querySelectorAll('.parallax-img');
            parallaxElements.forEach((el) => {
              const parentPanel = el.closest('.panel');
              if (parentPanel) {
                gsap.to(el, {
                  x: -600,
                  ease: "none",
                  scrollTrigger: {
                    trigger: parentPanel,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: 2.5
                  }
                });
              }
            });

            // Specific Animation for About Section Images
            if (sectionRef === aboutRef) {
              const aiWrapper = sectionRef.current.querySelector('.about-img-ai-wrapper');
              const fsWrapper = sectionRef.current.querySelector('.about-img-fs-wrapper');
              // The panel containing the images is the second one typically, or the parent of the wrapper
              const imagePanel = aiWrapper?.closest('.panel');

              if (aiWrapper && fsWrapper && imagePanel) {
                // AI Wire from Bottom
                gsap.from(aiWrapper, {
                  y: 400, // Move from 400px down
                  opacity: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: imagePanel,
                    containerAnimation: scrollTween,
                    start: "left 30%", // Start even later
                    end: "center center",
                    scrub: 1, // Smooth scrub linked to scroll
                    id: "about-images-ai"
                  }
                });

                // Full Stack from Top
                gsap.from(fsWrapper, {
                  y: -400, // Move from 400px up
                  opacity: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: imagePanel,
                    containerAnimation: scrollTween,
                    start: "left 30%",
                    end: "center center",
                    scrub: 1,
                    id: "about-images-fs"
                  }
                });
              }
            }
          }
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Integrate Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy();
    }
  }, [])

  return (
    <div ref={mainRef}>
      <CustomCursor />
      <Hero />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
    </div>

  )
}

export default App
