interface Props {
    children?: React.ReactNode
}

const GridContainer = ({ children }: Props) => {
	return (
		<div className='min-h-screen py-12 sm:px-6 lg-px8'>
            <div className="max-w-7xl mx-auto">
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{children}
			</div>
            </div>
		</div>
	)
}

export default GridContainer
