import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [aboutTextPreview, setAboutTextPreview] = useState(true);
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

  const handleAboutMe = () => {
    setAboutTextPreview(!aboutTextPreview);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <motion.div
        className="mouse-effect"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />
      <div className='text-white flex flex-col p-5 font-display'>
        {/* Navigation */}
        <nav className='flex justify-end pt-7 gap-8 pr-12 text-xl sticky top-0 z-10  backdrop-blur-sm'>
          <a href="#resume" className='hover:text-red-500 transition-colors'>Resume</a>
          <a href="#projects" className='hover:text-red-500 transition-colors'>Projects</a>
        </nav>
        
        {/* Hero Section */}
        <header className='text-8xl pl-12 flex flex-col gap-8 pt-24 pb-12'>
          <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700'>
            HELLO,<br />I'M BRANDON
          </h1>
        </header>

        {/* About Me Section */}
        <div className='flex justify-end pr-12 mb-24'>
          <div 
            className={`border-2 border-red-500 rounded-full p-8 flex items-center justify-center h-80 w-80 transition-all duration-500 ease-in-out hover:border-red-400 hover:scale-105 cursor-pointer ${aboutTextPreview ? '' : 'bg-red-500 rotate-180'}`}
            onClick={handleAboutMe}
          >
            <div className={`transition-all duration-300 ease-in-out ${aboutTextPreview ? '' : 'rotate-180'}`}>
              {aboutTextPreview ? 
                <div className='text-4xl font-semibold text-red-500'>About Me</div>:
                <p className='text-center text-white'>I'm Brandon, an 18 year old attending Iowa State University pursuing a Software Engineering degree.</p>
              }
            </div>
          </div>
        </div>
        
        {/* Technologies Section */}
        <section className='flex flex-col items-center gap-12 mb-24'>
          <h2 className='text-5xl font-bold text-red-500'>TECHNOLOGIES</h2>
          <div className='flex gap-10 flex-wrap justify-center'>
            {['NextJS', 'Typescript', 'NodeJS', 'Python', 'Tailwind', 'Java', 'C', 'Docker', 'Postman', 'AWS',].map((tech) => (
              <div key={tech} className='group bg-gray-800 rounded-lg shadow-lg p-6 text-center transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105'>
                <div className='w-32 h-32 mx-auto mb-4'>
                  <img src={`${tech.toLowerCase()}.png`} alt={tech} className='w-full h-full object-contain'/>
                </div>
                <div className='text-2xl font-semibold text-red-400 group-hover:text-red-500'>
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className='px-12 mb-24'>
          <h2 className='text-6xl font-bold mb-8 text-red-500'>PROJECTS</h2>
          <div className='bg-gray-800 p-8 rounded-lg text-center shadow-lg'>
            <p className='text-2xl text-red-400'>WORK IN PROGRESS</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
