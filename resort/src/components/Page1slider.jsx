import React, { useEffect, useRef, useState } from "react";
import  image1  from "../assets/1.webp";
import  image5  from "../assets/5.webp";
import  image11  from "../assets/11.webp";
import image4 from "../assets/4.webp"
import image13 from "../assets/13.webp"
import image14 from "../assets/14.webp"
import image15 from "../assets/default_1.1.1.jpg"

import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);
import gsap from "gsap";
import ClickSpark from "./ClickSpark";
const images = [
  
  image5,
   image14,
  image11,
  image15,
 
  image13,
  
];

const Page1slider = () => {
  const imageRefs = useRef([]);
  const [value, setvalue] = useState(0)
  useGSAP(()=>{
    
    gsap.set('.image',{
      scale:0.2,
      
    })
    gsap.to('.image',{
        scale: 1.8,
        
        ease: "none",
        scrollTrigger:{
            trigger:'.image',
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            
        }
    })
  })

  useEffect(() => {
    const imgs = imageRefs.current;

    // Initially show first images
    gsap.set(imgs, { opacity: 0 });
    gsap.set(imgs[0], { opacity: 1 });

    let current = 0;

    const interval = setInterval(() => {
      const next = (current + 1) % imgs.length;

      gsap.to(imgs[current], {
        opacity: 0,
        duration: 1,
      });

      gsap.to(imgs[next], {
        opacity: 1,
        duration: 1,
      });

      current = next;
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="relative h-[50vh] w-full md:h-screen overflow-hidden " style={{ clipPath: "inset(0)" }}>
      <ClickSpark
        sparkColor="black"
        sparkSize={15}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
        >
      <div className="absolute inset-0 w-full h-full overflow-hidden " >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            ref={(el) => (imageRefs.current[index] = el)}
            className="image absolute md:fixed -z-10  inset-0 w-full h-full object-cover"
            alt=""
          />
        ))}
      </div>
      </ClickSpark>
    </div>
    
  );

}

export default Page1slider