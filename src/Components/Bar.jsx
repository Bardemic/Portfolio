import { useState, useEffect, useRef } from "react";
export default function Bar({mousePos}) {
    const [isPressed, setPressed] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [startingPositions, setStartingPositions] = useState({x: 112, y: 32})
    const [curPosition, setCurPosition] = useState({x: 112, y: 32})
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0})

    useEffect(() => {
        if (isPressed) {
            console.log('x: ' + mousePosition.x + ', y: ' + mousePosition.y)
            setCurPosition({x:startingPositions.x - (mouseOffset.x + mousePos.x), y: mouseOffset.y + mousePos.y + startingPositions.y})
        }
    }, [mousePos])
        
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            setPressed(false)
        }

        
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseUp', handleMouseUp)
        };
    }, []);


    const aboutDiv = document.getElementById('AboutMe')
    const scrollIntoAbout = () => aboutDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const experienceDiv = document.getElementById('Experience')
    const scrollIntoExperience = () => experienceDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const projectsDiv = document.getElementById('Projects')
    const scrollIntoProjects = () => projectsDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const contactMeDiv = document.getElementById('ContactMe')
    const scrollIntoContact = () => contactMeDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})




    function mouseDownFunc() {
        setPressed(true)
        setStartingPositions(curPosition)
        setMouseOffset({ x: mousePosition.x * -1, y: mousePosition.y * -1})
        console.log('mouse pressed')
        document.addEventListener("mouseup", () => {
            console.log('mouse released')
        })
    }
    return (
        <div className="rounded-xl m-4 flex flex-col bg-opacity-75 bg-neutral-900 gap-2 items-center text-stone-100 outline outline-blue-500 px-4 p-2 text-sm transition delay-150 duration-300 fixed" style={{right: `${curPosition.x}px`, top: `${curPosition.y}px`, MozUserSelect: 'none', userSelect: 'none'}}>
            <p onClick={scrollIntoAbout} className="hover:scale-125 hover:text-blue-300 transition duration-150">About Me</p>
            <p onClick={scrollIntoExperience} className="hover:scale-125 hover:text-green-300 transition duration-150">Experience</p>
            <p onClick={scrollIntoProjects} className="hover:scale-125 hover:text-red-300 transition duration-150">Projects</p>
            <p onClick={scrollIntoContact} className="hover:scale-125 hover:text-yellow-300 transition duration-150">Contact Me</p>
            <p className="hover:scale-125 transition duration-150">Resume</p>
            <div onPointerDown={mouseDownFunc} className="flex flex-col gap-1 p-1 transition delay-150 duration-300 hover:cursor-grab">
                <div className="grid grid-cols-6 gap-1 place-items-center hover:scale-125 transition duration-150">
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    <div className="rounded-full bg-blue-500 w-2 h-2" />
                    
                </div>
            </div>
        </div>
    )

}