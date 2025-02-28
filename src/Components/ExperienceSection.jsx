import HeaderWithBackground from "./HeaderWithBackground";
import ProjectCard from "./ProjectCard";
import SlideIn from "./SlideIn";

export default function ExperienceSection() {
    return (
        <div>
            <HeaderWithBackground title={'Experience'} length={5}/>
            <div className="grid grid-cols-2 gap-8">
                <SlideIn>
                    <ProjectCard text={'John Deere - SWE'} imageLink={`Deere.png`}/>
                </SlideIn>
            </div>
        </div>
    )
}