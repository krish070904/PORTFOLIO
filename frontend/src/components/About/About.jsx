import React, {  useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const About = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() =>{
            gsap.from('.letter', {
                y: 5,
                opacity:0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.5
            });

        },containerRef);

        return () => ctx.revert();
    },[])
    
  return (

    <div className='h-screen flex justify-center items-center font-[Teko] bg-black text-white text-[30vw] font-bold'>About</div>
  )
}

export default About