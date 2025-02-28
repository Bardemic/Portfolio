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
            <div>
                <div className="rounded-xl m-4 flex flex-col bg-neutral-900 gap-2 items-center text-stone-100 outline outline-blue-500 p-4 text-sm transition delay-150 duration-300 fixed" style={{right: `${curPosition.x}px`, top: `${curPosition.y}px`, MozUserSelect: 'none', userSelect: 'none'}}>
                    <p>About Me</p>
                    <p>Projects</p>
                    <p>Experience</p>
                    <p>Resume</p>
                    <p>Contact Me</p>
                    <div onPointerDown={mouseDownFunc} className="flex flex-col gap-1 p-1 transition delay-150 duration-300 hover:cursor-grab">
                        <div className="h-0.5 bg-black w-24" />
                        <div className="pt-0.5 bg-black w-24" />
                    </div>
                </div>
            </div>
    )

}