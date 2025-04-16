import HeaderWithBackground from "./HeaderWithBackground"
import ProjectCard from "./ProjectCard"
import SlideIn from "./SlideIn"
export default function ProjectSection() {
    return (
        <div id='Projects' className="flex flex-col pt-8 pb-8 px-12 lg:px-32 xl:px-56">
            <HeaderWithBackground title={'Projects'} length={4}/>
            <div className='mainContainer grid gap-8 grid-cols-1 md:grid-cols-2 w-full'>
                <SlideIn>
                    <ProjectCard imageLink={'websketch.png'} link={'https://devpost.com/software/untitledproject'} text={'Websketch'}/>
                </SlideIn>
                <SlideIn>
                    <ProjectCard imageLink={'Codegram.png'} link={'https://devpost.com/software/codegram'} text={'Codegram'}/>
                </SlideIn>
                <SlideIn>
                    <ProjectCard imageLink={'VoiceThief.png'} text={'VoiceThief'} link={'https://voicethief.bardemic.xyz'} />
                </SlideIn>
            </div>
        </div>
    )
}