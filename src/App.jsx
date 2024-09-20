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
          <a href="Resume.pdf" download className='hover:text-red-500 transition-colors'>Resume</a>
          <a href="#projects" className='hover:text-red-500 transition-colors'>Projects</a>
          <a href="#contact" className='hover:text-red-500 transition-colors'>Contact</a>
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
                <p className='text-center text-white'>I'm Brandon, an 18 year old from Illinois attending Iowa State University, pursuing a Software Engineering degree.</p>
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
          <h2 className='text-6xl font-bold mb-12 text-red-500'>PROJECTS</h2>
          <div className='flex flex-col gap-16'>
            {/* Project 1 */}
            <div className='flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden'>
              <div className='w-full md:w-1/2 h-96 md:h-auto relative overflow-hidden group'>
                <div className="relative flex items-center justify-center  ">
                  <video
                    className=" aspect-[9/16] h-auto rounded-md shadow-md w-56 pb-2"
                    src="video.mp4"
                    controls
                    playsInline
                    poster="videoscreenshot.png"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <span className="absolute left-2 top-1 m-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    (example video)
                  </span>
                </div>
              </div>
              <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
                <h3 className='text-3xl font-bold text-red-400 mb-4'>AiShorts</h3>
                <p className='text-lg mb-4'>
                  AiShorts is an AI-powered YouTube Shorts generator SaaS product that automates the creation of short-form video content. It is developed using Next.js, TailwindCSS, Node.js, and Supabase. It uses AI providers to generate video ideas, create scripts, and produce final videos, all with just a few clicks. 
                </p>
                {/* <a href="#" className='text-red-500 hover:text-red-400 transition-colors'>Learn More →</a> */}
              </div>
            </div>

            {/* Project 2 */}
            <div className='flex flex-col md:flex-row-reverse bg-gray-800 rounded-lg overflow-hidden'>
              <div className='w-full md:w-1/2 p-4 flex justify-center items-center gap-4'>
                <motion.div
                  className='w-1/2 h-96 relative overflow-hidden rounded-lg shadow-md'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="StayConnected.png" 
                    alt="Stay Connected Screenshot 1" 
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    whileHover={{ objectFit: 'contain' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div
                  className='w-1/2 h-96 relative overflow-hidden rounded-lg shadow-md'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="StayConnected2.png" 
                    alt="Stay Connected Screenshot 2" 
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    whileHover={{ objectFit: 'contain' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
                <h3 className='text-3xl font-bold text-red-400 mb-4'>Stay Connected</h3>
                <p className='text-lg mb-4'>Stay Connected is a React Native app that allows you to stay connected with your friends and family. It is developed using React Native/Expo and Supabase. Users can post photos on their page, and keep up with posts from others.</p>
                {/* <a href="#" className='text-red-500 hover:text-red-400 transition-colors'>Learn More →</a> */}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className='px-12 mb-24'>
          <h2 className='text-6xl font-bold mb-12 text-red-500'>CONTACT</h2>
          <div className='bg-gray-800 rounded-lg p-8'>
            <p className='text-xl mb-6'>Have any questions or want to work together? Find me here!</p>
            <div className='flex flex-col gap-4'>
              <a href="mailto:brandonpieczka@gmail.com" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                brandonpieczka@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/brandon-pieczka-bb6b84291/" target="_blank" rel="noopener noreferrer" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Bardemic" target="_blank" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg>
                GitHub
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
