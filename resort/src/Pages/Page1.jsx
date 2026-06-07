import React from 'react'
import Page1slider from '../components/Page1slider'
import Navbar from '../components/Navbar'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import '../index.css'; // Adjust the path based on your file structure
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClickSpark from '../components/ClickSpark';

gsap.registerPlugin(useGSAP,ScrollTrigger);


const Page1 = () => {
  useGSAP(()=>{
   
    gsap.from('.middle',{
      y:100,
      stagger:{
        amount:0.3
      },
      opacity:0
    })
  })
  return (
    
<section id='page1'>
  <ClickSpark
    sparkColor="white"
    sparkSize={15}
    sparkRadius={20}
    sparkCount={8}
    duration={400}
  >
    {/* Your content here */}
    <div >
      <Navbar/>
      <div className=' relative w-full md:h-screen uppercase overflow-hidden' >
        
        
        <Page1slider/>
        <div  className=' font-philo font-medium h-full w-full absolute inset-0 flex flex-col items-center text-5xl md:text-9xl justify-center '>
          <div className='  text-white middle'>NEELKAMAL</div>
          <div className=' text-white middle'>RESORT</div>
        </div>
      </div>
    </div>
  </ClickSpark>
</section>
  )
}

export default Page1