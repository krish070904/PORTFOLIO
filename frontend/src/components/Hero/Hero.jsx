import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Letter animation
            gsap.from('.letter', {
                y: 5,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.5
            });

            // Image blur on scroll
            gsap.to(imageRef.current, {
                filter: 'blur(10px)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 4,
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [])

    return (
        <div ref={containerRef}>
            <div className='section h-screen flex items-center justify-center text-white text-[24vw] font-bold font-[Teko] tracking-widest' data-color="#000000">
                <span className='letter'>K</span>
                <span className='letter'>R</span>
                <span className='letter'>I</span>
                <span className='letter'>S</span>
                <span className='letter'>H</span>
                <span className='letter'>N</span>
                <span className='letter'>A</span>

                <img
                    ref={imageRef}
                    className='absolute bottom-0 
                    w-[85%] 
                    sm:w-[60%] 
                    md:w-[45%] 
                    lg:w-[35%] 
                    max-w-[500px] 
                    h-auto object-contain'
                    src="/Hero.png"
                    alt="Krishna Wable"
                />
            </div>
        </div>
    )
}

export default Hero
