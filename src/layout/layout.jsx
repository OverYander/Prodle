function layout( {orientation='', children} ) {
    return (
        <div className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} h-screen w-screen bg-dullblue-dark text-dullblue-light text-base`}>
            {children}
        </div>
    )
}

export default layout