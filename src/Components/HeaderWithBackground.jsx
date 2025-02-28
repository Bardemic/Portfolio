export default function HeaderWithBackground({title, length}) {
    return (
        <h1 className="text-3xl p-4 relative text-slate-100">
            <div className="flex">
                <p className="absolute -left-1 -top-0">{title}</p>
                <div className='bg-blue-600 p-3' style={{'paddingLeft': (length)+ "rem", 'paddingRight': (length)+ "rem"}} />
            </div>
        </h1>
    )
}