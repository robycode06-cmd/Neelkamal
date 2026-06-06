"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useState, useEffect } from "react"
import image6 from "../assets/6.webp"
import image14 from "../assets/14.webp"
import image15 from "../assets/15.webp"
import image16 from "../assets/16.webp"
import image17 from "../assets/17.webp"
import image18 from "../assets/18.webp"
import page2bg from "../assets/page2bg.avif"

function Hgallery() {
  const containerRef = useRef(null)
  const [totalDistance, setTotalDistance] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Dynamically calculate the horizontal scroll translation distance based on screen width
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 600;
      const width = isMobile ? 280 : 900;
      const gap = isMobile ? 15 : 30;
      // Translate by the total width of all items + gaps to slide them completely off-screen
      setTotalDistance(items.length * width + (items.length - 1) * gap);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use dynamic function output in useTransform for full responsiveness on resize
  const x = useTransform(scrollYProgress, (progress) => progress * -totalDistance);

  return (
    <div id="example" className="h-auto overflow-x-clip bg-[#FCF7EF] font-sans" style={{ overflowX: 'clip' }}>
      
      

      {/* Scroll Container */}
      <div ref={containerRef} className="h-[400vh] relative overflow-x-clip" style={{ overflowX: 'clip' }}>
        {/* Sticky Wrapper */}
        <div className="sticky top-0 h-[70vh] ptt-16 md:pt-0 md:h-screen w-[280px] min-[600px]:w-[900px]  mx-auto flex items-center justify-start overflow-visible">
          {/* Gallery Horizontal Tape */}
          <motion.div 
            className="flex gap-[15px] min-[600px]:gap-[30px] will-change-transform" 
            style={{ x }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="shrink-0 w-[280px] min-[600px]:w-[900px] h-[350px] min-[600px]:h-[500px] rounded-xl relative overflow-hidden bg-cover bg-center shadow-md"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {/* Gradient overlay mimicking the multiply pseudo-element */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                  style={{
                    background: `linear-gradient(to bottom, transparent 60%, ${item.color})`
                  }}
                />

                {/* Item Content */}
                <div className="absolute bottom-[30px] left-[30px] z-10">
                  <span 
                    className="text-[14px] font-mono block mb-2"
                    style={{ color: item.color }}
                  >
                    0{item.id}
                  </span>
                  <h2 className="text-2xl min-[600px]:text-[28px] font-semibold text-white m-0 font-heading">
                    {item.label}
                  </h2>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Outro Section */}
      <section className="h-screen flex justify-center items-center">
        <p className="text-4xl min-[600px]:text-6xl font-heading text-[#7A2B1D] uppercase">Fin</p>
      </section>
    </div>
  )
}

export default Hgallery

/**
 * ==============   Data   ================
 */
const items = [
  { id: 1, color: "white", label: "Night One", image: image14 },
  { id: 2, color: "white", label: "Night Two", image: image15 },
  { id: 3, color: "white", label: "Night Three", image: image16 },
  { id: 4, color: "white", label: "Night Four", image: image17 },
  { id: 5, color: "white", label: "Night Five", image: image18 },
]
