import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import Page3 from './Pages/Page3'
import Opinion from './components/Opinions';
import FormPage from './components/FormPage';
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'


const App = () => {
  //idhr sai
  const gradientRef = useRef(null);
  const section2Ref = useRef(null);
  useGSAP(() => {
    gsap.to(gradientRef.current, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });
  });
  //idhr tak
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easeOutExponential curve
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
  
  return (
    <div >
      <section className="relative h-[60vh] md:h-screen overflow-hidden">
        <Page1/>
        <div
          ref={gradientRef}
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-30
            md:h-64
            opacity-0
            bg-gradient-to-b
            from-transparent
            to-[#FADFAD]
            pointer-events-none
            z-10
          "
        />
      </section>
      <section
        ref={section2Ref}
        className="min-h-screen bg-[#F5F1EB]"
      >
      <Page3/>
      </section>
      <Page2/>
      <Opinion/>
      <FormPage/>
      
      
    </div>
  )
}

export default App;















