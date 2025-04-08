'use client'
import Link from 'next/link'
import { IMedia } from '@/interfaces/IMedia'
import { FaStar, FaPlay } from 'react-icons/fa'

interface Props {
	movie: IMedia
}

function capFirstLetter(palabra: string) {
	return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
}

const Card = ({ movie }: Props) => {
	if (!movie) return

	return (
		<div className='relative h-94 overflow-hidden rounded-lg group min-w-[265px] '>
			<Link href={`media/${movie.id}`}>
				<img
					src={movie.image}
					alt={movie.title}
					className='w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
				/>

				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />

				<div className='absolute top-0 left-0 z-20'>
					<span
						className={`px-4 py-1 text-sm font-bold rounded-r-lg ${
							movie.type === 'movie' ? 'bg-blue-800' : 'bg-green-800'
						}`}
					>
						{capFirstLetter(movie.type)}
					</span>
				</div>

				<div className='absolute bottom-0 left-0 right-0 z-20 px-4 py-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<h1 className='text-lg font-bold'>{movie.title}</h1>
					<div className='flex items-center mt-1 text-sm'>
						<FaStar size={14} className='text-yellow-300 mr-1' />
						<span>{movie.rate}</span>
						<span className='ml-2'>{movie.califications} críticas</span>
					</div>
				</div>

				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-50 group-hover:scale-125 transition duration-300 z-20'>
					<FaPlay size={40} className='text-tertiary' />
				</div>
			</Link>
		</div>
	)
}

export default Card

