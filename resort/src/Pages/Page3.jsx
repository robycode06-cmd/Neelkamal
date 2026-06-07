import React, { useRef } from 'react';
import ImageScroller from '../components/ImageScroller';
import ClickSpark from '../components/ClickSpark'
import CircularText from '../components/CircularText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import all local image assets
import image1 from '../assets/1.webp';
import image2 from '../assets/2.webp';
import image3 from '../assets/3.webp';
import image4 from '../assets/4.webp';
import image5 from '../assets/5.webp';
import image6 from '../assets/6.webp';
import image7 from '../assets/7.webp';
import image8 from '../assets/8.webp';
import image9 from '../assets/9.webp';
import image10 from '../assets/10.webp';
import image11 from '../assets/11.webp';
import image12 from '../assets/12.webp';
import image13 from '../assets/13.webp';
import image14 from '../assets/14.webp';
import image15 from '../assets/15.webp';
import image16 from '../assets/16.webp';
import image17 from '../assets/17.webp';
import image18 from '../assets/18.webp';
import page3bg from '../assets/3pagebg.webp';

gsap.registerPlugin(ScrollTrigger);

// Categorize images for the scrollers
const poolImages = [
  { title: 'Swimming Pool 1', url: image13 },
  { title: 'Swimming Pool 2', url: image3 },
    { title: 'Swimming Pool 3', url: image4 },
];

const aroundImages = [
  { title: 'In & Around 1', url: image5},
  { title: 'In & Around 2', url: image1},
  { title: 'In & Around 3', url: image11 },
  { title: 'In & Around 4', url: image12 }
];

const portraitImages = [
  { title: 'Portrait 1', url: image2 },
  { title: 'Portrait 2', url: image10 },
  { title: 'Portrait 3', url: image9},
  
];

const roomImages = [
  { title: 'Room 1', url: image14 },
  { title: 'Room 2', url: image15 },
  { title: 'Room 3', url: image18 },
  { title: 'Room 4', url: image17 },
];

const Page3 = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
  const mm = gsap.matchMedia();

  // Desktop only
  mm.add("(min-width: 768px)", () => {
    const revealItems = gsap.utils.toArray('.pg3-reveal');

    revealItems.forEach((item, i) => {
      const curveX = i % 2 === 0 ? -35 : 25;

      gsap.fromTo(
        item,
        {
          y: 70,
          x: curveX,
          rotation: i % 2 === 0 ? -3 : 2,
          opacity: 0,
          scale: 0.92,
        },
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.12,
        }
      );
    });
  });

  // Mobile only
  mm.add("(max-width: 767px)", () => {
    gsap.set(".pg3-reveal", {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
    });
  });

  return () => mm.revert();
}, { scope: sectionRef });

  return (
    <section id='page3'>
    <div ref={sectionRef} className="min-h-screen w-full bg-[#f8ecda] py-16 px-4 md:px-12 flex flex-col items-center select-none overflow-hidden " >
        <ClickSpark
        sparkColor="black"
        sparkSize={15}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      {/* Centered Gallery Header */}
      <h1 className="pg3-heading font-heading text-5xl md:text-7xl text-[#7A2B1D] tracking-widest mb-16 uppercase text-center">
        GALLERY
      </h1>
      
      {/* 3-Column Grid Layout matching the PDF layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl items-center justify-items-center">
        
        {/* Column 1: Swimming Pool & In & Around (Stacked) */}
        <div className="flex flex-col gap-12 items-center">
          <div className="pg3-reveal flex flex-col items-center">
            <ImageScroller 
              images={poolImages} 
              containerClassName="w-[340px] h-[220px] md:w-[380px] md:h-[240px]" 
            />
            <span className="mt-4 font-heading text-lg md:text-xl font-bold text-[#7A2B1D] tracking-wide uppercase">
              Swimming Pool
            </span>
          </div>
          <div className="pg3-reveal flex flex-col items-center">
            <ImageScroller 
              images={aroundImages} 
              containerClassName="w-[340px] h-[220px] md:w-[380px] md:h-[240px]" 
            />
            <span className="mt-4 font-heading text-lg md:text-xl font-bold text-[#7A2B1D] tracking-wide uppercase">
              In & Around
            </span>
          </div>
        </div>

        {/* Column 2: Portraits (Centered Vertically) */}
        <div className="pg3-reveal flex flex-col items-center justify-center">
          <ImageScroller 
            images={portraitImages} 
            containerClassName="w-[340px] h-[600px] md:w-[380px] md:h-[600px]" 
          />
          <span className="mt-4 font-heading text-lg md:text-xl font-bold text-[#7A2B1D] tracking-wide uppercase">
            Portraits
          </span>
        </div>

        {/* Column 3: Rooms & Rotating Circular Text Logo (Stacked) */}
        <div className="flex flex-col gap-12 items-center justify-between h-full">
          <div className="pg3-reveal flex flex-col items-center">
            <ImageScroller 
              images={roomImages} 
              containerClassName="w-[340px] h-[220px] md:w-[380px] md:h-[240px]" 
            />
            <span className="mt-4 font-heading text-lg md:text-xl font-bold text-[#7A2B1D] tracking-wide uppercase">
              Rooms
            </span>
          </div>
          
          {/* Rotating Typography Logo */}
          <div className='hidden md:block absolute bottom-20 pg3-circular-text'>
            <CircularText
                text="RESORT*UD*NEELKAMAL*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
            />
            </div>
        </div>
        
      </div>
      </ClickSpark>
    </div>
    </section>
  );
};

export default Page3;