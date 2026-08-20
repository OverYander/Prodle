function layout( {children} ) {
    return (
        <div className="flex flex-col h-screen w-screen bg-dullblue-dark text-dullblue-light text-base">
            {children}
        </div>
    )
}

export default layout