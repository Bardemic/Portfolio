import { useState, useEffect, useRef } from "react";

export default function Draggable({children}) {
    const [isPressed, setPressed] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [startingPositions, setStartingPositions] = useState({x: 112, y: 32})
    const [curPosition, setCurPosition] = useState({x: 112, y: 32})
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0})
    const container = useRef(null)
        
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            if(!isPressed) {
                return
            }
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = (e) => {
            setPressed(true)
            setCurPosition({x: e.clientX, y: e.clientY})
        }

        const handleMouseUp = () => {
            setPressed(false)
            console.log('test')
        }

        const whileMouseDown = () => {
            if (isPressed) {
                console.log('x: ' + mousePosition.x + ', y: ' + mousePosition.y)
                setCurPosition({x:startingPositions.x - (mouseOffset.x + mousePosition.x), y: mouseOffset.y + mousePosition.y + startingPositions.y})
            }
        }

        
        window.addEventListener('mouseup', handleMouseUp)

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
}