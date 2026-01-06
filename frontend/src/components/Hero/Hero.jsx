import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const Hero = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.letter', {
                y: 5,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, [])
    return (
        <div ref={containerRef}>
            <div className='h-screen flex justify-center bg-black text-white text-[24vw] font-bold font-[Teko] tracking-widest'>
                <span className='letter'>K</span>
                <span className='letter'>R</span>
                <span className='letter'>I</span>
                <span className='letter'>S</span>
                <span className='letter'>H</span>
                <span className='letter'>N</span>
                <span className='letter'>A</span>

                <img className='absolute bottom-0 grayscale brightness-95 w-[35%] h-auto' src="/Hero.png" alt="Krishna Wable" />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Hero
