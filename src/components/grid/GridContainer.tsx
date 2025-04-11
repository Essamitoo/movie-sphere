interface Props {
    children?: React.ReactNode
}

const GridContainer = ({ children }: Props) => {
	return (
		<div className='min-h-screen bleed'>
            <div className="mx-auto p-16">
			<div className=' grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6'>
				{children}
			</div>
            </div>
		</div>
	)
}

export default GridContainer
