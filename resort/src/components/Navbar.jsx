import React, { useState, useRef } from 'react'
import logo from "../assets/logo.webp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import RiMenu3Fill from 'remixicon-react/Menu3FillIcon';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClickSpark from './ClickSpark';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import RiCloseFill from 'remixicon-react/CloseFillIcon';

gsap.registerPlugin(ScrollToPlugin, useGSAP, ScrollTrigger);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    const menuItemRef = useRef([]);
    const tlRef = useRef(null);
    const nav = useRef(null);

    const openMenu = () => {
        setIsOpen(true);

        // Kill any running timeline first
        if (tlRef.current) tlRef.current.kill();

        const tl = gsap.timeline();
        tlRef.current = tl;

        // Reset menu items before animating in
        gsap.set(menuItemRef.current, { y: 80, opacity: 0 });

        tl.to(overlayRef.current, {
            x: '0%',
            duration: 0.5,
            ease: 'power4.inOut',
        })
        .to(panelRef.current, {
            x: '0%',
            duration: 0.6,
            ease: 'power4.inOut',
        }, '-=0.3')
        .to(menuItemRef.current, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power3.out',
        }, '-=0.2');
    };

    const closeMenu = () => {
        // Kill any running timeline first
        if (tlRef.current) tlRef.current.kill();

        const tl = gsap.timeline({
            onComplete: () => setIsOpen(false),
        });
        tlRef.current = tl;

        tl.to(menuItemRef.current, {
            y: -40,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power3.in',
        })
        .to(panelRef.current, {
            x: '100%',
            duration: 0.5,
            ease: 'power4.inOut',
        }, '-=0.1')
        .to(overlayRef.current, {
            x: '100%',
            duration: 0.4,
            ease: 'power4.inOut',
        }, '-=0.2');
    };

    const scrollToSection = (id) => {
        gsap.to(window, {
            duration: 3,
            scrollTo: id,
            ease: "power2.inOut",
        });
    };

    useGSAP(() => {
        gsap.from('.heading', {
            y: -100,
            stagger: {
                amount: 0.3
            }
        });
    });

    return (
        <>
            {/* ===== NAVBAR ===== */}
            <div className='font-normalfont font-medium z-50 top-0 left-0 w-full items-center h-[9vh] md:h-[12vh] bg-[#f0d6af] md:bg-white/40 backdrop-blur-xs border-b-2 border-gray-300 text-[1.5vw] block md:fixed'>
                <ClickSpark
                    sparkColor="black"
                    sparkSize={15}
                    sparkRadius={20}
                    sparkCount={8}
                    duration={400}
                >
                    <div className='flex md:justify-around px-3 md:px-0 items-center h-full w-full'>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page1")}><h1 className='heading hidden md:block'>HOME</h1></button>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page2")}><h1 className='heading hidden md:block'>ACCOMMODATION</h1></button>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page3")}><h1 className='heading hidden md:block'>GALLERY</h1></button>
                        <div>
                            <img src={logo} className='h-26 md:h-32' alt="" />
                        </div>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page2")}><h1 className='heading hidden md:block'>MENU</h1></button>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page4")}><h1 className='heading hidden md:block'>OPINIONS</h1></button>
                        <button className='cursor-pointer' onClick={() => scrollToSection("#page5")}><h1 className='heading hidden md:block'>CONTACT-US</h1></button>
                    </div>
                </ClickSpark>
            </div>

            {/* ===== HAMBURGER BUTTON (outside navbar, on top of everything) ===== */}
            <button
                className='md:hidden fixed top-4 right-4 z-[100] cursor-pointer'
                onClick={isOpen ? closeMenu : openMenu}
            >
                {isOpen
                    ? <RiCloseFill className='size-10' />
                    : <RiMenu3Fill className='size-10' />
                }
            </button>

            {/* ===== MOBILE MENU OVERLAY (Layer 1: dark backdrop) ===== */}
            <div
                ref={overlayRef}
                className='mobile-menu-overlay md:hidden'
                onClick={closeMenu}
            />

            {/* ===== MOBILE MENU PANEL (Layer 2: the actual menu) ===== */}
            <div
                ref={panelRef}
                className='mobile-menu-panel md:hidden'
            >
                <img src={logo} className='h-24 mb-6' alt="logo" />

                {[
                    { label: 'HOME', target: '#page1' },
                    { label: 'ACCOMMODATION', target: '#page2' },
                    { label: 'GALLERY', target: '#page3' },
                    { label: 'MENU', target: '#page2' },
                    { label: 'OPINIONS', target: '#page4' },
                    { label: 'CONTACT US', target: '#page5' },
                ].map((item, i) => (
                    <button
                        key={item.label}
                        ref={el => menuItemRef.current[i] = el}
                        className='mobile-menu-link'
                        onClick={() => { scrollToSection(item.target); closeMenu(); }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Navbar;