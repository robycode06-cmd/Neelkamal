import React, { useState, useRef, useEffect } from 'react';
import formbg from '../assets/formbg.webp';
import logo from '../assets/logo.webp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16888.27382621502!2d73.58373256006374!3d24.561254629208392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967f19efa1c5d59%3A0xb50f0bbe03bec93c!2sNeel%20Kamal%20Resort!5e1!3m2!1sen!2sus!4v1780725401682!5m2!1sen!2sus';

function FormPage() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const [showPop, setShowPop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setShowPop(true);
        setTimeout(() => setShowPop(false), 3000);
        setStatus('Form submitted successfully!');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setStatus('Error submitting form: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error submitting form');
    }
  };

  /* ═══════════════════════════════════════════
     GSAP SCROLL ANIMATIONS
  ═══════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. BACKGROUND PARALLAX ── */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      }

      /* ── 2. LOGO — fades in with slight rotation ── */
      gsap.fromTo('.fm-logo',
        { opacity: 0, rotation: -10, scale: 0.7 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      /* ── 3. HEADING — drops in from above with bounce ── */
      gsap.fromTo('.fm-heading',
        { y: -60, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: '.fm-heading',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      /* ── 4. FORM CARD — rises from below with a curve ── */
      gsap.fromTo('.fm-card',
        { y: 100, opacity: 0, scale: 0.88, rotation: -3 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.fm-card',
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );

     
      const inputs = gsap.utils.toArray('.fm-input');
      inputs.forEach((input, i) => {
        const curveX = [-35, 30, -25, 40][i] || (i % 2 === 0 ? -30 : 30);
        
      });

      /* ── 6. MAP (desktop) — slides in from the right ── */
      gsap.fromTo('.fm-map-desktop',
        { x: 80, y: 30, opacity: 0, scale: 0.9, rotation: 3 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          },
          delay: 0.5
        }
      );

      /* ── 7. MAP (mobile) — rises from below with curve ── */
      gsap.fromTo('.fm-map-mobile',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: '.fm-map-mobile',
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      /* ── 8. CONTACT BAR ITEMS — stagger in with alternating curves ── */
      const contactItems = gsap.utils.toArray('.fm-contact');
      contactItems.forEach((item, i) => {
        gsap.fromTo(item,
          {
            y: 45,
            x: i === 0 ? -30 : i === 1 ? 0 : 30,
            opacity: 0,
            rotation: i === 0 ? -3 : i === 2 ? 3 : 0
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: '.fm-contact-bar',
              start: "top 92%",
              toggleActions: "play none none reverse"
            },
            delay: i * 0.15
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="form-container min-h-screen bg-cover bg-[#FCF7EF] flex flex-col items-center relative bg-center p-3 sm:p-4 md:p-8 overflow-hidden">
      {/* ── Background Image (parallax target) ── */}
      <img
        ref={bgRef}
        src={formbg}
        alt=""
        className="h-[120%] w-full absolute inset-0 object-cover will-change-transform"
      />

      {/* ── Logo ── */}
      <img
        src={logo}
        alt="lotus logo"
        className="fm-logo absolute top-3 left-3 w-16 sm:w-20 md:top-6 md:left-8 md:w-32 lg:top-8 lg:left-12 lg:w-50 z-10 drop-shadow-lg"
      />

      {/* ── Heading ── */}
      <h1 className="fm-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4 mt-6 sm:mt-8 tracking-widest text-[#7A2B1D] z-10 uppercase text-center">
        Contact Us
      </h1>

      {/* ── Google Maps – Desktop (lg+): absolute top-right ── */}
      <div className="fm-map-desktop hidden lg:flex absolute top-6 right-6 lg:top-8 lg:right-12 z-10 flex-col items-center">
        <div className="w-72 lg:w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden">
          <p className="text-center text-sm font-serif text-[#7A2B1D] tracking-widest uppercase py-2 bg-white/10 border-b border-white/10">
            Find Us
          </p>
          <iframe
            src={MAPS_EMBED_URL}
            title="Neelkamal Resort Location"
            className="w-full h-56 lg:h-64"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="fm-card z-10 mt-6 sm:mt-8 w-[92%] max-w-[370px] md:max-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] rounded-2xl p-5 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="fm-input w-full p-3 sm:p-4 rounded-xl bg-black/20 border border-white/30 text-[#FFFFF0] text-base sm:text-lg font-serif placeholder-gray-300 focus:outline-none focus:border-[#D4AF37] focus:bg-black/40 transition-all duration-300 shadow-inner"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="fm-input w-full p-3 sm:p-4 rounded-xl bg-black/20 border border-white/30 text-[#FFFFF0] text-base sm:text-lg font-serif placeholder-gray-300 focus:outline-none focus:border-[#D4AF37] focus:bg-black/40 transition-all duration-300 shadow-inner"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="fm-input w-full p-3 sm:p-4 rounded-xl bg-black/20 border border-white/30 text-[#FFFFF0] text-base sm:text-lg font-serif placeholder-gray-300 focus:outline-none focus:border-[#D4AF37] focus:bg-black/40 transition-all duration-300 shadow-inner"
          />
          <button
            type="submit"
            className="fm-input mx-auto mt-3 sm:mt-4 bg-[#7A2B1D] hover:bg-[#7A2B1D]/80 text-white border-2 border-[#7A2B1D] font-serif uppercase tracking-widest text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] backdrop-blur-sm"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ── Google Maps – Mobile / Tablet (below lg): in-flow below form ── */}
      <div className="fm-map-mobile flex lg:hidden z-10 mt-5 w-[92%] max-w-[500px] flex-col items-center">
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden">
          <p className="text-center text-sm font-serif text-[#7A2B1D] tracking-widest uppercase py-2 bg-white/10 border-b border-white/10">
            Find Us
          </p>
          <iframe
            src={MAPS_EMBED_URL}
            title="Neelkamal Resort Location"
            className="w-full h-48 sm:h-56"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ── Contact Info Bar ── */}
      <div className="fm-contact-bar z-10 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-6 justify-center items-center bg-white/5 backdrop-blur-md border border-white/10 w-[92%] max-w-4xl mb-6 sm:mb-8 p-3 sm:p-4 md:p-6 rounded-2xl shadow-lg mt-5 text-center">
        <p className="fm-contact text-xs sm:text-sm md:text-base lg:text-[18px] text-[#FFFFF0] font-serif">
          <span className="text-[#7A2B1D] mr-1.5 sm:mr-2 tracking-widest uppercase text-xs sm:text-sm">
            Email:
          </span>
          rajudasa@gmail.com
        </p>
        <div className="hidden sm:block w-px h-5 sm:h-6 bg-white/20" />
        <p className="fm-contact text-xs sm:text-sm md:text-base lg:text-[18px] text-[#FFFFF0] font-serif">
          <span className="text-[#7A2B1D] mr-1.5 sm:mr-2 tracking-widest uppercase text-xs sm:text-sm">
            Phone:
          </span>
          +91 823434544
        </p>
        <div className="hidden sm:block w-px h-5 sm:h-6 bg-white/20" />
        <p className="fm-contact text-xs sm:text-sm md:text-base lg:text-[18px] text-[#FFFFF0] font-serif">
          <span className="text-[#7A2B1D] mr-1.5 sm:mr-2 tracking-widest uppercase text-xs sm:text-sm">
            Booking:
          </span>
          +91 9344293997
        </p>
      </div>

      {/* ── Success Popup Modal ── */}
      {showPop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(212,175,55,0.2)] text-center max-w-[90vw] sm:max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#D4AF37] mb-3 sm:mb-4">
              Request Received
            </h2>
            <p className="mt-2 text-[#FFFFF0]/80 font-serif leading-relaxed text-sm sm:text-base">
              Thank you for reaching out. Our concierge will contact you
              shortly to arrange your stay.
            </p>
            <button
              onClick={() => setShowPop(false)}
              className="mt-6 sm:mt-8 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 sm:px-8 py-2 rounded-lg font-serif uppercase tracking-widest transition-all duration-300 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
