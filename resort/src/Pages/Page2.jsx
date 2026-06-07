import React, { useRef } from 'react'
import ClickSpark from '../components/ClickSpark'
import Hgallery from '../components/Hgallery'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Heading drop-in bounce animation (like Contact page heading)
    gsap.fromTo('.acc-heading',
      { y: -60, opacity: 0, scale: 0.85 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(2.5)",
        scrollTrigger: {
          trigger: '.acc-heading',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id='page2'>
      <ClickSpark
          sparkColor="black"
          sparkSize={15}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
      <div ref={containerRef} className='h-auto w-full bg-[#FCF7EF] z-50 '>
        <h1 className="acc-heading font-heading text-[11vw] md:text-7xl text-[#7A2B1D] uppercase text-center pt-16">
          ACCOMODATION
        </h1>
        <div className=''>
          <Hgallery/>
        </div>
        
      </div>
      </ClickSpark>
    </section>
  )
}

export default Page2