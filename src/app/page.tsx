import Link from 'next/link'

const Landing = () => {
	const image =
		'https://res.cloudinary.com/dpyotudkz/image/upload/v1743035295/fondo_i3zgtr.png'
	return (
		<div className='text-white'>
			<img className='absolute w-screen h-screen z-1' src={image} alt='' />
			<div className='absolute h-screen w-full z-2 '>
				<div className='absolute  z-3 flex flex-col items-center top-[30%] left-[5%] w-[350px] gap-2'>
					<p className='text-3xl font-sans font-semibold'>
						Más allá de la pantalla
					</p>
					<p className='text-3xl font-sans font-semibold'>
						más allá de la realidad
					</p>
					<hr className='text-[#00CC92] border-1 rounded-lg w-full m-2' />
					<p className='text-sm'>
						Accíon,drama,comedia y mucho más.Encuentra la pelicula perfecta y
						disfruta del mejor entretenimiento sin limites.
					</p>
					<Link
						href='/home'
						className=' bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] w-[180px] p-1 rounded-xl font-bold text-md mt-2 hover:scale-105 text-center'
					>
						Explorar mas
					</Link>
				</div>
			</div>
		</div>
	)
}
export default Landing
