export default function MobileHeader() {

    const aboutDiv = document.getElementById('AboutMe')
    const scrollIntoAbout = () => aboutDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const experienceDiv = document.getElementById('Experience')
    const scrollIntoExperience = () => experienceDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const projectsDiv = document.getElementById('Projects')
    const scrollIntoProjects = () => projectsDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    const contactMeDiv = document.getElementById('ContactMe')
    const scrollIntoContact = () => contactMeDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

    return (
        <div className="w-full h-1/6 max-h-10 items-center p-2 bg-opacity-90 flex bg-neutral-900 fixed bottom-0 outline outline-blue-500 text-stone-100 text-sm justify-between">
            <p onClick={scrollIntoAbout} className="hover:scale-125 hover:text-blue-300 transition duration-150">About</p>
            <p onClick={scrollIntoExperience} className="hover:scale-125 hover:text-green-300 transition duration-150">Experience</p>
            <p onClick={scrollIntoProjects} className="hover:scale-125 hover:text-red-300 transition duration-150">Projects</p>
            <p onClick={scrollIntoContact} className="hover:scale-125 hover:text-yellow-300 transition duration-150">Contact</p>
            <p className="hover:scale-125 transition duration-150">Resume</p>
        </div>
    )
}