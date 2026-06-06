import React, { useRef, useEffect } from "react";
import bg4 from "../assets/page4bg.avif"
import CardSwap, { Card } from '../Pages/CardSwap/CardSwap.jsx';
import { RiStarFill, RiStarHalfLine, RiShieldCheckLine } from '@remixicon/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


function Opinion(){
    const sectionRef = useRef(null);
    const circleRef = useRef(null);

    const list=[{
        id:"1",
        name:"nikhil sambyal",
        op:"Best place if you like to spend quality time with your friends. Perfect place for throwing parties too. Rates are perfectly affordable."
    },
    {
    id:"2",
    name:"nikhil sambyal",
    op:"Best place if you like to spend quality time with your friends. Perfect place for throwing parties too. Rates are perfectly affordable."  
    },
    {
        id:"3",
        name:"nikhil sambyal",
        op:"Best place if you like to spend quality time with your friends. Perfect place for throwing parties too. Rates are perfectly affordable."  
     },
     {
        id:"4",
        name:"nikhil sambyal",
        op:"Best place if you like to spend quality time with your friends. Perfect place for throwing parties too. Rates are perfectly affordable."  
        },
     {
            id:"5",
            name:"nikhil sambyal",
            op:"Best place if you like to spend quality time with your friends. Perfect place for throwing parties too. Rates are perfectly affordable."  
     }
];

     const goldenGradient = "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";
     const goldenText = `${goldenGradient} inline-block text-transparent bg-clip-text`;

    /* ═══════════════════════════════════════════
       GSAP SCROLL ANIMATIONS
    ═══════════════════════════════════════════ */
    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ── 1. PARALLAX on decorative circle ── */
            if (circleRef.current) {
                gsap.to(circleRef.current, {
                    yPercent: -25,
                    scale: 1.05,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            }

            /* ── 2. CURVED REVEAL on text elements ──
                 Each item "blooms" from a bottom-center origin point
                 with a curved arc (different x/y eases create the curve) */
            const revealItems = gsap.utils.toArray('.op-reveal');
            revealItems.forEach((item, i) => {
                // Alternate curve direction for organic feel
                const curveX = i % 2 === 0 ? -35 : 25;

                gsap.fromTo(item, 
                    {
                        y: 70,
                        x: curveX,
                        rotation: i % 2 === 0 ? -4 : 3,
                        opacity: 0,
                        scale: 0.92
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
                            trigger: sectionRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        },
                        delay: i * 0.12
                    }
                );
            });

            /* ── 3. CARDS SECTION — swoops in from bottom-right ── */
            gsap.fromTo('.op-cards', 
                {
                    y: 120,
                    x: 60,
                    opacity: 0,
                    scale: 0.85,
                    rotation: 4
                },
                {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.op-cards',
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            /* ── 4. GOLDEN SEPARATOR LINE — grows from left ── */
            gsap.fromTo('.op-gold-line',
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.op-gold-line',
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    },
                    delay: 0.6
                }
            );

        }, sectionRef); // Scope all queries to this section

        return () => ctx.revert();
    }, []);
    
       return(
        <div ref={sectionRef} className="min-h-screen bg-[#F8F6F0] relative flex items-center overflow-hidden font-sans">
            
            {/* ── Decorative circle with parallax ── */}
            <div ref={circleRef} className={`absolute top-1/2 -translate-y-1/2 hidden lg:block 
                lg:-left-[15%] lg:w-[350px] lg:h-[350px] 
                xl:-left-[13%] xl:w-[480px] xl:h-[480px] 
                rounded-full p-[2px] ${goldenGradient} opacity-90`}>
                <div 
                    className="w-full h-full rounded-full bg-gray-300 bg-cover bg-center border-4 border-[#F8F6F0]"
                    style={{ backgroundImage: `url(${bg4})` }}
                ></div>
            </div>

            {/* ── Main Content Container ── */}
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row z-10 relative 
                px-5 sm:px-8 md:px-10 
                lg:pl-[22%] lg:pr-8 
                xl:pl-[27%] xl:pr-10">
                
                {/* ── Left text section ── */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center py-8 sm:py-10 md:py-12 pr-0 lg:pr-10">
                    
                    {/* Golden "OPINION" badge */}
                    <div className="op-reveal mb-4 sm:mb-5 md:mb-6">
                        <span className={`text-xs sm:text-sm font-bold tracking-[0.3em] uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#BF953F]/50 ${goldenText}`}>
                            Opinion
                        </span>
                    </div>

                    {/* Guest Love label + golden line */}
                    <div className="op-reveal flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                        <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${goldenText}`}>
                            Guest Love
                        </span>
                        <div className={`op-gold-line h-[1px] w-8 sm:w-12 ${goldenGradient}`}></div>
                    </div>

                    {/* Main heading */}
                    <h1 className="op-reveal text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl 2xl:text-6xl font-serif text-[#1A1A1A] mb-3 sm:mb-4 md:mb-6 leading-tight">
                        Loved by Guests,<br />Always.
                    </h1>
                    
                    {/* Description */}
                    <p className="op-reveal text-[#5A5A5A] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-sm leading-relaxed">
                        Real experiences from real guests. Rated highly for comfort, hospitality, and unforgettable stays.
                    </p>

                    {/* Stars */}
                    <div className="op-reveal flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <RiStarFill color="#D4AF37" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        <RiStarFill color="#D4AF37" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        <RiStarFill color="#D4AF37" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        <RiStarFill color="#D4AF37" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        <RiStarHalfLine color="#D4AF37" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>

                    {/* Review count */}
                    <p className="op-reveal text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                        4.6/5 · Based on 1,250+ reviews <br />
                        from verified platforms
                    </p>

                    
                </div>

                {/* ── Right cards section ── */}
                <div className="op-cards w-full lg:w-7/12 relative flex justify-center items-center min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[460px]">
                    <CardSwap
                       cardDistance={40}
                       verticalDistance={50}
                       delay={3000}
                       pauseOnHover={true}
                    >
                        {list.map((opinion) => (
                            <Card key={opinion.id}>
                                <div className="bg-[#FEFCFA] border border-[#EBE5D9] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col justify-between h-full w-full relative">
                                    
                                    {/* Quote mark */}
                                    <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-none absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 ${goldenText} opacity-80`}>
                                        &ldquo;
                                    </span>

                                    <div className="pt-4 sm:pt-5 md:pt-6 pl-5 sm:pl-7 md:pl-10 z-10 flex flex-col h-full">
                                        <p className="text-[#2C2C2C] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-serif leading-relaxed mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex-grow line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                                            {opinion.op}
                                        </p>
                                        
                                        {/* Golden separator */}
                                        <div className={`h-[2px] w-10 sm:w-12 md:w-16 mb-3 sm:mb-4 md:mb-6 ${goldenGradient}`}></div>

                                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
                                            {/* Avatar */}
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-200 border border-[#D4AF37] overflow-hidden flex-shrink-0">
                                            </div>
                                            
                                            <div className="min-w-0">
                                                <h3 className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg font-serif truncate">
                                                    {opinion.name}
                                                </h3>
                                                <p className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase mt-0.5 sm:mt-1 ${goldenText}`}>
                                                    Verified Guest
                                                </p>
                                            </div>

                                            {/* Shield icon */}
                                            <div className="absolute right-0 bottom-0 text-[#BF953F] opacity-80 hidden md:block">
                                                <RiShieldCheckLine className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CardSwap>
                </div>

            </div>
        </div>
       )
}

export default Opinion;