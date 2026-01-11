import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if device has a fine pointer (mouse) - desktop/laptop
        const hasMousePointer = window.matchMedia('(pointer: fine)').matches
        setIsMobile(!hasMousePointer)

        if (hasMousePointer) {
            const cursor = cursorRef.current

            const moveCursor = (e) => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3,
                    ease: 'power2.out'
                })
            }

            window.addEventListener('mousemove', moveCursor)

            return () => {
                window.removeEventListener('mousemove', moveCursor)
            }
        }
    }, [])

    // Don't render cursor on mobile/touch devices
    if (isMobile) return null

    return <div ref={cursorRef} className="custom-cursor"></div>
}

export default CustomCursor
