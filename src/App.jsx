import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './Components/ProjectCard';
import Intro from './Components/Intro';
import Bar from './Components/Bar';
import AboutMe from './Components/AboutMe';
import ProjectSection from './Components/ProjectSection';
import ExperienceSection from './Components/ExperienceSection';
import ContactSection from './Components/ContactSection';
import MobileBad from './Components/MobileBad';
import Footer from './Components/Footer';


export default function App() {

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
      useEffect(() => {
        const handleMouseMove = (e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);

    return (
        <div className="min-h-screen bg-neutral-900 w-screen">
            <motion.div
                className="mouse-effect"
                animate={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 250, 216, 0.075), transparent 15%)`,
                }}
            />
            <div className="flex flex-col gap-12">
                {isMobileDevice && <MobileBad/>}
                <Intro/>
                <AboutMe/>
                <ExperienceSection/>
                <ProjectSection/>
                <ContactSection/>
            </div>
            <Bar mousePos={mousePosition}/>
            <Footer/>
            

        </div>
    )
}