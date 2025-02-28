import HeaderWithBackground from "./HeaderWithBackground";

export default function ContactSection() {
    return (
        <div id='ContactMe' className="flex flex-col gap-8 pt-8 md:gap-16 px-12 pb-12 lg:px-32 xl:px-56">
            <HeaderWithBackground title={'Contact Me'} length={5.5} />
            <h2 className="text-slate-100 text-center text-3xl">Find me here!</h2>
            <div className="flex justify-center gap-6 md:scale-100 md:gap-24">
                <a target="_blank" href="https://linkedin.com/in/brandonpieczka/">
                    <div className="size-24 md:size-32 bg-slate-700 flex items-center justify-center motion-safe:animate-bounce rounded-full">
                        <img src="LinkedIn.png" alt="Linkedin Logo" className="w-2/3 rounded-lg"/>
                    </div>
                </a>
                <a target="_blank" href="https://github.com/bardemic">
                    <div className="size-24 md:size-32 bg-slate-700 flex items-center justify-center motion-safe:animate-bounce rounded-full">
                        <img src="Github.webp" alt="Github Logo" className="w-2/3 rounded-lg"/>
                    </div>
                </a>
                <a href="mailto:brandonpieczka@gmail.com" className='flex items-center text-lg hover:text-red-400 transition-colors'>
                    <div className="size-24 md:size-32 bg-slate-700 flex items-center justify-center motion-safe:animate-bounce rounded-full">
                        <svg className="w-28 h-28 rounded-lg" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                </a>
                
            </div>
        </div>
    )
}