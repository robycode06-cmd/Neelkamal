import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".glow", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })

      .from(
        ".logo",
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      )

      .from(
        ".line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.6"
      )

      .from(
        ".tagline",
        {
          opacity: 0,
          y: 10,
          duration: 0.8,
        },
        "-=0.8"
      )

      .to(".preloader-content", {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.8,
      })

      .to(preloaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          onComplete?.();
        },
      });
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#F5EBDD] flex items-center justify-center"
    >
      <div className="preloader-content relative text-center">
        {/* Glow */}
        <div className="glow absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D2B483]/30 blur-[120px]" />

        {/* Logo */}
        <h1
          className="logo relative text-[#7A5A2E] text-[5rem] md:text-[9rem] leading-none"
          style={{
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Neelkamal
        </h1>

        {/* Underline */}
        <div className="line mx-auto mt-3 h-[2px] w-40 md:w-60 bg-[#D2B483]" />

        {/* Tagline */}
        <p className="tagline mt-5 text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#A38A63]">
          Resort & Luxury Retreat
        </p>
      </div>
    </div>
  );
};

export default Preloader;