import HeaderWithBackground from "./HeaderWithBackground"
import ProjectCard from "./ProjectCard"
import SlideIn from "./SlideIn"
export default function ProjectSection() {
    return (
        <div className="flex flex-col">
            <HeaderWithBackground title={'Projects'} length={4}/>
            <div className='mainContainer grid gap-8 grid-cols-1 md:grid-cols-2 w-full'>
                <SlideIn>
                    <ProjectCard imageLink={'Codegram.png'} text={'Codegram'}/>
                </SlideIn>
                <SlideIn>
                    <ProjectCard imageLink={'VoiceThief.png'} text={'VoiceThief'}/>
                </SlideIn>
            </div>
        </div>
    )
}