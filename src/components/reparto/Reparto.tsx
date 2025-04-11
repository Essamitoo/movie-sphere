import { Cast } from '@/interfaces/IMedia'

const Reparto = ({ reparto }: { reparto: Cast[] }) => {
	return (
		<div className='w-full'>
		<h2 className='text-white text-3xl font-bold mb-4 pl-4'>Reparto</h2>
	
		<div className='flex flex-wrap  gap-6 px-4'>
			{reparto.map((actor, index) => (
				<div
					key={index}
					className='group relative w-[10rem] rounded-xl overflow-hidden bg-gray-900 shadow-md transition-all duration-300 '
				>
					<div className='relative'>
						<img
							src={actor.image}
							alt={actor.name}
							className='w-full h-[12rem] object-cover transition-transform duration-300 group-hover:scale-105'
						/>
					</div>
					<div className='p-3 text-center'>
						<p className='text-quinary font-semibold text-sm'>
							{actor.actor}
						</p>
						<p className='text-tertiary text-xs  group-hover:text-gray-100'>
							Personaje: {actor.name}
						</p>
					</div>
				</div>
			))}
		</div>
	</div>
	
	)
}

export default Reparto
