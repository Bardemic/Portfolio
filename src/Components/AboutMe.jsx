import HeaderWithBackground from "./HeaderWithBackground";
import SlideIn from "./SlideIn";

export default function AboutMe() {
    return (
        <div id='AboutMe' className="flex flex-col pt-12 pb-40 text-slate-100">
            <HeaderWithBackground title={'About Me!'} length={5}/>
            <div className="grid grid-cols-1 gap-32 md:grid-cols-2 items-start">
                <SlideIn>
                    <div className={`text-xl `}>
                        Hi! I'm Brandon, a Software Engineering student @ Iowa State University (minoring in Applied Mathematics and Machine Learning). The significant part of my current experience is in Full Stack development, however I am actively learning about machine learning and how it can be used to improve the world! While not coding, you can catch me playing or watching Soccer, working out in the gym, or hanging out with my friends!
                    </div>
                </SlideIn>
                <div className="">
                    <img src="MeAndDog.JPG" className=" rounded-3xl" alt="me and my awesome dog" />
                </div>
            </div>  
        </div>
    )
}