export default function ProjectCard({imageLink, text}) {
    return (
        <div className="w-full group relative">
            <div className="aspect-video rounded-3xl overflow-hidden">
                <img 
                    src={imageLink} 
                    alt={text}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-blue-500 bg-black absolute bottom-0 w-full group-hover:opacity-100 rounded-b-3xl p-2.5 px-4 opacity-0 animation delay-50 duration-300 group-hover:text-opacity-100 group-hover:bg-opacity-80">
                {text}
            </div>
        </div>
    )
}