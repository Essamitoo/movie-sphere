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
		<div className='bg-primary rounded-lg  m-4  flex flex-col  hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out '>
	
			<Link href={`/media/${movie.id}`}>
				<div className='relative h-94 overflow-hidden rounded-t-lg'>
					<img
						src={movie.image}
						alt={movie.title}
						className='w-full h-full object-cover object-center'
					/>
					<div className='absolute top-0 left-0'>
						<span
							className={` px-4 py-1 text-sm font-bold rounded-r-lg ${
								movie.type === 'movie' ? 'bg-blue-800' : 'bg-green-800'
							}`}
						>
							{capFirstLetter(movie.type)}
						</span>
					</div>
					<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-50 transition duration-300 ease-in-out'>
						<p>
							<FaPlay size={40} className='text-tertiary' />
						</p>
					</div>
				</div>
			</Link>
			<div className=''>
				<h1 className='font-bold px-2 mt-2 text-center text-lg'>{movie.title}</h1>
			</div>
			<div className='flex items-center justify-around text-sm p-4'>
				<div className='flex items-center'>
					<FaStar size={14} className='text-yellow-300' />
					<p className='ml-1'>{movie.rate}</p>
				</div>
				<p>{movie.califications} Criticas</p>
			</div>
		</div>
	)
}

export default Card

