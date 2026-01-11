import React, { forwardRef } from 'react'
import healthsync from '../../assets/Healthsync/HealthSyncLogo.png'
import healthsync2 from '../../assets/Healthsync/HealthSyncLogo - Copy(1)(1).png'
import pill from '../../assets/Healthsync/pill_8064036.png'
import './Projects.css'
const Projects = forwardRef((props, ref) => {
  return (
    <div ref={ref} className='section relative overflow-hidden' data-color="#7c0c0cff">
      <div className='flex'>
        <section className='panel h-screen w-screen flex-shrink-0 flex justify-center items-center font-[Teko] text-white text-[24vw] font-bold' data-color="#681bb1ff">
          Projects
        </section>
        <section className='panel h-screen w-screen flex-shrink-0 flex justify-center items-center text-white text-5xl font-bold' data-color="#76944C">
          <div className='w-[80vw] h-[70vh] rounded-3xl flex justify-center bg-gradient-to-br from-white/10 to-[#6F8C77]/10 backdrop-blur-[50px] border border-white/20 border-t-white/60 border-l-white/40 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
            <img className='w-[40vw] h-[18vh] lg:w-[30vw] lg:h-[18vh] object-contain' src={healthsync} alt="HealthSync Logo" />
           
          </div>

          <img
            className='absolute animate-spin-smooth left-1 top-10 lg:left-19 lg:top-6 w-32 opacity-80 object-contain'
            src={healthsync2}
            alt="HealthSync Logo"
          />

          <img
            className='absolute parallax-img animate-float right-10 bottom-24 lg:right-32 lg:bottom-32 w-24 lg:w-40 opacity-40 object-contain blur-[1px]'
            src={pill}
            alt="Pill"
          />

        
        </section>

      </div>
    </div>
  )
})

Projects.displayName = 'Projects'

export default Projects