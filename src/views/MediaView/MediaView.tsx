'use client'

import { formatearFecha } from '@/utils/utils'
import { FaPlus, FaPlay, FaHeart } from 'react-icons/fa'
import { AuthContext } from '@/contexts/authContext'
import { useState, useContext } from 'react'
import Comment from '@/components/comment/Comment'
import StarRating from '@/components/starRating/StartRating'
import Reparto from '@/components/reparto/Reparto'
import Criticas from '@/components/criticas/Criticas'
import Trailer from '@/components/trailer/Trailer'
import { MoviesContext } from '@/contexts/movieContext'
import { IMediaPage } from '@/interfaces/IMedia'

const MediaView = ({ movie }: { movie: IMediaPage }) => {
	const [trailer,setTrailer] = useState(movie.trailers?.[0]?.url ||"");

	const { user } = useContext(AuthContext)
	const { addToFavorites, addToList, addToViews, isInList, isFavorite } =
		useContext(MoviesContext)
	const [open, setOpen] = useState(false)

	return (
		<div className='max-h-max min-h-lvh pb-5 text-white flex flex-col items-center gap-6 bg-white'>
			{open && <Trailer videoId={trailer} open={open} setOpen={setOpen} />}

			{/* Portada grande al fondo */}
			<div className='bg-gradient-to-r from-black via-black/60 to-white/15 w-full h-[400px] absolute'></div>
			<img
				src={movie.cover}
				alt={movie.name}
				className='w-screen h-[400px] object-cover'
			/>

			{/* Botones: Trailer + Agregar a lista */}
			<div className='absolute top-[240px] left-8 flex gap-2'>
				<button
					onClick={() => setOpen(true)}
					className='bg-gray-300 font-medium text-black rounded-lg w-[150px] flex justify-center items-center gap-1 p-2 hover:scale-105 hover:cursor-pointer'
				>
					<FaPlay size={15} /> TRAILER
				</button>
				<button
					onClick={() => {
						/*addToList(movie)*/
					}}
					className='border-2 border-gray-300 font-medium text-white text-sm rounded-lg w-[150px] flex justify-center items-center gap-1 p-2 hover:scale-105 hover:cursor-pointer'
				>
					<FaPlus size={15} />
					{isInList(movie) ? 'Agregada' : 'Agregar a la lista'}
				</button>
			</div>
			<div className='absolute top-[300px] flex gap-2'>
				{movie.trailers?.map((trailer, index) =>
					trailer.img && trailer.url ? (
						<button
							key={index}
							className='relative  w-52 h-40 p-1 hover:scale-105 hover:cursor-pointer'
							onClick={() => {
                                setOpen(true)
                                setTrailer(trailer.url)
                            }}
						>
							<img
								src={trailer.img}
								alt={`Trailer ${index + 1}`}
								className='w-full h-full object-fill rounded-lg'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<FaPlay size={40} className='text-tertiary opacity-60' />
							</div>
						</button>
					) : null
				)}
			</div>

			{/* Info principal */}
			<div className='w-[90%] border border-black h-[300px] mt-10 grid grid-cols-[20%_50%_30%] rounded-lg bg-white'>
				<img
					src={movie.image}
					alt={movie.name}
					className='w-full h-[290px] p-2 object-cover'
				/>

				<div className='h-full text-black text-center flex flex-col justify-center gap-2'>
					<h1 className='font-bold text-2xl'>{movie.name}</h1>
					<p className='text-gray-700 text-sm'>
						Fecha de estreno: {formatearFecha(movie.releaseDate)}
					</p>
					<p className='text-md'>Duración: {movie.duration} min</p>
					{movie.series.length > 0 && (
						<p className='text-md'>
							Serie: <span className='font-semibold'>{movie.series}</span>
						</p>
					)}
					<div className='flex flex-col justify-center items-center'>
						<h3>{movie.rating}</h3>
						<StarRating rating={movie.rating} />
					</div>
				</div>

				{/* Favoritos */}
				<div className='text-black flex flex-col justify-around items-center'>
					<button
						onClick={() => {
							/*addToFavorites(movie)*/
						}}
						className={`w-10 h-10 rounded-full border flex items-center justify-center ${
							isFavorite(movie)
								? 'text-[#00A878] bg-black'
								: 'text-white bg-gray-700/70'
						}`}
					>
						<FaHeart size={20} />
					</button>
				</div>
			</div>

			{movie.cast.length>0&&<Reparto reparto={movie.cast}/>}

			<h2 className='text-black font-semibold text-2xl'>
				Tu opinión nos importa, compártela aquí.
			</h2>
			<Comment img={user?.image || ''} name={user?.name || ''} />

			{movie.reviews?.map((item, index) => (
				<Criticas key={index} {...item} />
			))}

			<div className='flex flex-col justify-center gap-4'>
				<p className='text-black text-xl font-semibold'>
					Películas y series similares
				</p>
				<div className='grid grid-cols-4 gap-4'>
					{movie.suggestions?.map((item, index) => (
						<img
							key={index}
							className='w-[180px] h-[250px] rounded-lg object-cover'
							src={item.img}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default MediaView
