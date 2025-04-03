'use client'
import { IMedia } from '@/interfaces/IMedia'
import Link from 'next/link'
import { useContext } from 'react'
import { FaStar, FaHeart, FaPlay } from 'react-icons/fa'
import { MoviesContext } from '@/contexts/movieContext'

const Card = ({movie} : {movie: IMedia} ) => {
	const {addToFavorites, addToList, addToViews, isMovieInUserList, isFavorite, removeFromList} = useContext(MoviesContext)

	

	

	return (
		<div
			className={`rounded-xl border h-[350px] m-4 p-1 flex flex-col items-center hover:scale-102 hover:cursor-pointer hover:border-[#00A878] w-[240px] ${
				isMovieInUserList('views', movie)
					? 'border-[#00A878] bg-[#00A878]/10'
					: 'border-slate-400/40'
			}`}
		>
			<p
				className={`absolute w-[80px] text-center ml-[-150px] ${
					movie.type === 'movie' ? 'bg-blue-800' : 'bg-green-800'
				}`}
			>
				{movie.type === 'movie' ? 'Pelicula' : 'Serie'}
			</p>
			<Link href={`/media/${movie.id}`} className='rounded-xl h-[240px] w-full'>
				<img
					src={movie.image}
					className='rounded-xl h-[240px] w-full'
					alt={movie.title}
				/>
			</Link>
			<div
				onClick={() => addToFavorites(movie)}
				className={`cursor-pointer w-8 h-8 rounded-full ml-[190px] border absolute flex items-center justify-center ${
					isFavorite(movie)
						? 'text-[#00A878] bg-[#00A878]/50'
						: 'text-gray-200/40 bg-gray-700/70'
				}`}
			>
				<FaHeart size={20} />
			</div>
			<div className='flex items-center mt-2 text-sm'>
				<FaStar size={14} className='text-yellow-300' />
				<p>
					{movie.rate} ({movie.califications} Criticas)
				</p>
			</div>
			<div className='absolute m-[100px] w-20 h-20 rounded-full border-4 border-gray-300/70 flex justify-center items-center'>
				<FaPlay size={40} className='text-gray-300/70' />
			</div>
			<Link href={`/info/${movie.id}`}>
				<p className='text-[#00A878] font-bold m-1'>{movie.title}</p>
			</Link>
			{!isMovieInUserList('views', movie) &&
				(isMovieInUserList('list', movie) ? (
					<button
						onClick={() => removeFromList(movie)}
						className='border border-[#00A878]/50 text-[#00A878] w-full rounded-sm hover:cursor-pointer bg-[#171717] h-[30px]'
					>
						Agregada
					</button>
				) : (
					<button
						onClick={() => addToList(movie)}
						className='border border-slate-100/50 w-full rounded-xl text-ms hover:cursor-pointer bg-[#171717] '
					>
						+ Agregar a la lista
					</button>
				))}
			{isMovieInUserList('views', movie) && (
				<button className='bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] w-full rounded-sm hover:cursor-pointer bg-[#171717] h-[30px]'>
					Vista
				</button>
			)}
		</div>
	)
}

export default Card





