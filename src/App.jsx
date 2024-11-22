import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
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
    <div className="min-h-screen bg-gray-900">
      <motion.div
        className="mouse-effect"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />
      <div className='text-white flex flex-col p-5 font-display'>
        <nav className='flex md:justify-end justify-center pt-3 md:pt-7 gap-8 md:pr-12 text-xl sticky top-0 z-10 backdrop-blur-sm'>
          <a href="resume_brandon_pieczka.pdf" download className='hover:text-red-500 transition-colors'>Resume</a>
          <a href="#projects" className='hover:text-red-500 transition-colors'>Projects</a>
          <a href="#contact" className='hover:text-red-500 transition-colors'>Contact</a>
        </nav>
        
        <div className='md:grid md:grid-cols-3 flex flex-col gap-24 pt-8 md:pt-24'>
          <div>
            <header className='md:pl-12  flex flex-col gap-8 pb-6 md:pb-12'>
              <h1 className='font-bold text-transparent text-center md:text-left bg-clip-text bg-gradient-to-r from-red-500 to-red-700 text-4xl md:text-6xl'>
                HELLO,<br />I'M BRANDON
              </h1>
            </header>
            <div className='text-center md:max-w-xl md:pl-12 md:text-left gap-12'>
              <p className='text-xl  text-gray-400'>I'm an 18 year old freshman from Illinois attending Iowa State University, pursuing a Software Engineering degree.</p>
            </div>
            <div className='text-center md:max-w-xl md:pl-12 mt-12 md:text-left gap-12'>
              <p className='text-xl  text-gray-400'>I've coded since before I was in Highschool, and because of that, I've been exposed to many different technologies and languages. Languages and technologies I am experienced with include:</p>
              <ul className='list-disc list-inside text-gray-400 mt-2'>
                <li>Languages:</li>
                <ul className='pl-4 list-decimal list-inside text-gray-400'>
                  <li>Javascript</li>
                  <li>Python</li>
                  <li>Typescript</li>
                  <li>Java</li>
                  <li>C</li>
                  <li>Go</li>
                </ul>
                <li>Frontend Technologies:</li>
                <ul className='pl-4 list-decimal list-inside text-gray-400'>
                  <li>NextJS</li>
                  <li>TailwindCSS</li>
                  <li>React</li>
                  <li>Angular</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
                <li>Backend Technologies:</li>
                <ul className='pl-4 list-decimal list-inside text-gray-400'>
                  <li>NodeJS</li>
                  <li>Express</li>
                  <li>Flask</li>
                </ul>
                <li>Other:</li>
                <ul className='pl-4 list-decimal list-inside text-gray-400'>
                  <li>AWS</li>
                  <li>Google Cloud</li>
                  <li>Docker</li>
                  <li>Postman</li>
                  <li>Git</li>
                </ul>
              </ul>
            </div>
          </div>
          <section id="projects" className='md:px-12 mb-24 md:col-span-2'>
            <h2 className='md:text-6xl text-5xl font-bold mb-12 text-center md:text-left text-red-500'>PROJECTS</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col md:flex-row bg-gray-800 rounded-lg p-2 overflow-hidden'>{/*project1 skrrrr*/}
                <div className='w-full md:w-1/2 relative overflow-hidden group'>
                  <div className="flex items-center justify-center w-full h-full">
                    <iframe className='aspect-video w-full rounded-lg' src="https://www.youtube.com/embed/L7Xcb6imDsU?si=trSoDJ14KXG9DNnx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                  </div>
                </div>
                <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
                  <div className="flex justify-between items-baseline">
                    <h3 className='text-3xl font-bold text-red-400 mb-4'>Codegram</h3>
                    <div className="flex gap-2">
                      <a href="https://devpost.com/software/codegram" className='flex items-center text-lg hover:text-red-400 transition-colors' target="_blank">
                        <svg className='w-5 h-5 mr-2' fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                      </a>
                      <a href="https://github.com/Bardemic/Codegram" target="_blank" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg>
                      </a>
                    </div>
                  </div>
                  <p className='text-lg mb-4'>
                    Codegram is an all in one tutor matching platform for students. Students get matched with a tutor, and have an IDE shared between the two in a browser. A video call is created in the window, using WebRTC. The tutor is able to request to make changes, and the code runs within the browser. My team and I built this in 24 hours for the Swan Hacks 2024 Hackathon, winning 1st place.
                  </p>
                  {/* <a href="#" className='text-red-500 hover:text-red-400 transition-colors'>Learn More →</a> */}
                </div>
              </div>
              <div className='flex flex-col md:flex-row-reverse bg-gray-800 rounded-lg overflow-hidden'>
                <div className='w-full md:w-1/2 p-4 flex justify-center items-center gap-4'>
                  <img src="VoiceThief.png" alt="VoiceThief Screenshot" className='w-full h-full object-cover rounded-lg shadow-md' />
                </div>
                <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
                  <div className='flex items-baseline md:flex-row flex-row-reverse justify-between'>
                    <a href="https://github.com/Bardemic/VoiceThief" target="_blank" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg>
                    </a>
                    <h3 className='text-3xl font-bold text-red-400 mb-4'>VoiceThief</h3>
                  </div>
                  <p className='text-lg mb-4'>VoiceThief is a security demonstration tool showcasing voice cloning vulnerabilities in social engineering attacks. It was developed using Flask for the backend, Twilio for the phone call, Google Cloud for live transcription, and Speechify for voice cloning. I built it in 5 hours for the Iowa State 2024 Ivy Hackathon, and won 3rd place.</p>
                </div>
              </div>
              <div className='flex flex-col md:flex-row bg-gray-800 rounded-lg p-2 overflow-hidden'>{/*project1 skrrrr*/}
                <div className='w-full md:w-1/2 relative overflow-hidden group'>
                  <div className="relative flex items-center justify-center  ">
                    <video
                      className=" aspect-[16/9] h-auto rounded-md shadow-md w-full"
                      src="video.mp4"
                      controls
                      playsInline
                      poster="videoscreenshot.png"
                    >
                      Your browser does not support the video tag.
                    </video>
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
            </div>
          </section>
        </div>

        

        


       

        <section id="contact" className='md:px-12 px-4 mb-24'>
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
