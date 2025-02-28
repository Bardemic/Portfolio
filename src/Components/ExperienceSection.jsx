import HeaderWithBackground from "./HeaderWithBackground";
import ProjectCard from "./ProjectCard";
import SlideIn from "./SlideIn";

export default function ExperienceSection() {
    return (
        <div id='Experience' className="pb-24 px-20 lg:px-32 xl:px-56">
            <HeaderWithBackground title={'Experience'} length={5}/>
            <div className="grid md:grid-cols-2 gap-8">
                <SlideIn>
                    <ProjectCard text={'John Deere - SWE'} imageLink={`Deere.png`}/>
                </SlideIn>
            </div>
        </div>
    )
}