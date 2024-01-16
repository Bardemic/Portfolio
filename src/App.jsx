import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className=' bg-blue-700 h-full text-gray-200 flex flex-col p-5 font-display'>
      <div className='flex justify-end pt-7 gap-8 pr-48 text-xl sticky top-0'>
        <p>
          Resume
        </p>
        <p>
          Projects
        </p>
        <p>
          Contact Me
        </p>
      </div>
      
      <div className='text-8xl pl-48 flex flex-col gap-8 pt-6'>
        <p>HELLO,</p>
        <p>I'M BRANDON</p>
      </div>
      
      <div className=' pt-96 flex flex-col items-center gap-7'>
        <h2 className='text-4xl'>TECHNOLOGIES</h2>
        <div className='flex gap-10'>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4 '>
            <div className='row-span-4 w-32 self-center'>
              <img src="../public/React.png" alt="" className='w-full'/>
            </div>
            <div className='text-2xl'>
              React
            </div>
          </div>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4'>
            <div className='row-span-4 w-32 self-center'>
              <img src="../public/tailwind.png" alt="" className='w-full'/>
            </div>
            <div className='text-2xl'>
              Tailwind
            </div>
          </div>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4'>
            <div className='row-span-4 w-32 self-center'>
              <img src="../public/firebase.png" alt="" className='w-full'/>
            </div>
            <div className='text-2xl'>
              Firebase
            </div>
          </div>
        </div>
      </div>

      <div className='px-48 pt-96'>
        <h2 className='text-8xl'>PROJECTS</h2>
        <div>
          <div>
            <p>WORK IN PROGRESS</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default App
