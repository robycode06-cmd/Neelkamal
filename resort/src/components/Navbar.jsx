import React from 'react'
import  logo from "../assets/logo.webp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import RiMenu3Fill from 'remixicon-react/Menu3FillIcon';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import ClickSpark from './ClickSpark';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);




gsap.registerPlugin(useGSAP,ScrollTrigger);

const Navbar = () => {
    const scrollToSection = (id) => {
    gsap.to(window, {
      duration: 3,
      scrollTo: id,
      ease: "power2.inOut",
    });
  };
    const nav = useRef(null)
    useGSAP(()=>{
        gsap.from('.heading',{
            y:-100,
            stagger:{
                amount:0.3
            }
        })
    })
  return (
    <div  className='font-normalfont font-medium z-50 top-0 left-0 w-full items-center h-[9vh] md:h-[12vh] bg-[#f0d6af] md:bg-white/40 backdrop-blur-xs border-b-2 border-gray-300 text-[1.5vw] block md:fixed'>
        <ClickSpark
        sparkColor="black"
        sparkSize={15}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
        >
            <div className='flex  md:justify-around px-3 md:px-0 items-center h-full w-full'>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page1")}><h1 className='heading hidden md:block'>HOME</h1></button>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page2")}><h1 className='heading hidden md:block'>ACCOMMODATION</h1></button>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page3")}><h1 className='heading hidden md:block'>GALLERY</h1></button>
                <div>
                    <img src={logo} className='h-26 md:h-32' alt="" />
                </div>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page2")}><h1 className='heading hidden md:block'>MENU</h1></button>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page4")}><h1 className='heading hidden md:block'>OPINIONS</h1></button>
                <button className='cursor-pointer' onClick={() => scrollToSection("#page5")}><h1 className='heading hidden md:block'>CONTACT-US</h1></button>
                <div className='md:hidden absolute right-3  '>
                    <RiMenu3Fill className='size-10'/>
                </div>
            </div>
            
        </ClickSpark>
    </div>
    
  )
}

export default Navbar