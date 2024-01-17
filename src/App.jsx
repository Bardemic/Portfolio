import { useState } from 'react'
import './App.css'

function App() {
  const [aboutTextPreview, setAboutTextPreview] = useState(true)

  const handleAboutMe = () => {
    console.log('hi')
    if(aboutTextPreview === true) {
      setAboutTextPreview(false)
    }
    else{
      setAboutTextPreview(true)
    }
    console.log(aboutTextPreview)
  }

  return (
    <div className='bg-gradient-to-r from-blue-600 to-blue-700 h-full text-gray-200 flex flex-col p-5 font-display'>
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 flex justify-end pt-7 gap-8 pr-48 text-xl sticky top-0'>
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

      <div className='flex justify-end pr-48'>
        <div className='border border-blue-500 rounded-s-full p-20 flex items-center justify-center h-80 w-96 transition-colors ease-in duration-150  hover:border-blue-200' onClick={() => handleAboutMe()}>
         {aboutTextPreview ? 
         <div className='text-4xl'>About Me</div>:
          <p>I'm Brandon, a 17 year old web developer who enjoys working on projects!</p>
          }
        </div>
      </div>
      
      <div className=' pt-96 flex flex-col items-center gap-7'>
        <h2 className='text-4xl'>TECHNOLOGIES</h2>
        <div className='flex gap-10'>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4 '>
            <div className='row-span-4 w-32 self-center'>
              <img src="React.png" alt="" className='w-full'/>
            </div>
            <div className='text-2xl'>
              React
            </div>
          </div>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4'>
            <div className='row-span-4 w-32 self-center'>
              <img src="tailwind.png" alt="" className='w-full'/>
            </div>
            <div className='text-2xl'>
              Tailwind
            </div>
          </div>
          <div className='grid grid-rows-5 h-56 bg-blue-600 drop-shadow-lg p-4 text-center gap-4'>
            <div className='row-span-4 w-32 self-center'>
              <img src="firebase.png" alt="" className='w-full'/>
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

      <div className='bg-blue-500 flex flex-col gap-2 mx-48 p-12 mt-32 rounded-xl'>
        <h2 className='text-4xl'>Contact Me (not working)</h2>
        <form action="" className='grid grid-cols-6 grid-rows-6'>
          <div className='flex flex-col items-start row-span-1'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name='name' placeholder='Name...' className='text-black border-2 p-1 border-black'/>
          </div>
          <div className='flex flex-col items-start row-span-1'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name='email' placeholder='Email...' className='text-black border-2 p-1 border-black'/>
          </div>
          <div className='flex flex-col items-start row-span-1'>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="lastName" name='lastname' placeholder='Subject...' className='text-black border-2 p-1 border-black'/>
          </div>
          <div className='flex flex-col items-start row-span-5 col-start-1 col-span-6'>
            <label htmlFor="content">Message</label>
            <textarea name="content" id="content" className='text-black h-72 w-1/2 border-2 p-1 border-black'></textarea></div>
        </form>

      </div>
    </div>
  )
}

export default App
