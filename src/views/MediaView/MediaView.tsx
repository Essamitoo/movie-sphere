'use client'

import { FaPlus, FaPlay, FaHeart } from 'react-icons/fa'
import { useAuthContext } from '@/contexts/authContext'
import { useState } from 'react'
import Comment from '@/components/comment/Comment'
import Reparto from '@/components/reparto/Reparto'
import Criticas from '@/components/criticas/Criticas'
import Trailer from '@/components/trailer/Trailer'
import { useMovieContext } from '@/contexts/movieContext'
import { IMediaPage } from '@/interfaces/IMedia'
import { FaStar } from 'react-icons/fa6'
import Image from 'next/image'
import { PiClockLight } from 'react-icons/pi'

const MediaView = ({ movie }: { movie: IMediaPage }) => {
	const [trailer, setTrailer] = useState(movie.trailers?.[0]?.url || '')
	const { user } = useAuthContext()
	const { addToFavorites, addToList, addToViews, isInList, isFavorite } =
		useMovieContext()
	const [open, setOpen] = useState(false)
	const [seccionActiva, setSeccionActiva] = useState<
		'reparto' | 'comentarios' | 'trailers' | 'suggestions'
	>('suggestions')

	return (
		<div className='text-white flex flex-col items-center'>
			{open && <Trailer videoId={trailer} open={open} setOpen={setOpen} />}

			{/* Fondo principal con portada */}
			<div
				className='w-full bg-no-repeat bg-fixed relative pb-20'
				style={{
					backgroundImage: `url(${movie.cover})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='absolute inset-0 bg-gradient-to-l from-transparent to-primary'></div>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-primary'></div>

				<div className='relative px-30 pt-40'>

					{/* Info principal */}
					
					<div className='flex flex-col justify-center'>
						<div className='flex gap-4 items-center px-2'>
							<p className=''>
								{movie.releaseDate}
							</p>
							<p className='border border-white px-1 text-sm'>+16</p>
							<p className='flex items-center gap-1'>
								<PiClockLight size={22} />
								{movie.duration} min
								</p>
							<p className='text-sm flex gap-1'>
								<FaStar size={20} className='text-yellow-300' />
								{movie.rating}
							</p>
							{movie.series.length > 0 && (
								<p className='font-bold'>{movie.series}</p>
							)}
						</div>

							<h1 className='font-bold text-7xl'>{movie.name}</h1>
						<p className='text-sm font-light p-6 pl-1 w-1/3 text-pretty'>
							{movie.sipnosis}
						</p>
					</div>

					{/* Botones de acciones */}

					<div className='flex gap-6'>
						<button
							onClick={() => setOpen(true)}
							className='flex justify-center items-center border gap-2 py-2 px-4 hover:bg-white hover:text-black transition-all'
						>
							Trailer
							<FaPlay size={15} />
						</button>

						<button
							onClick={() => {
								/*addToList(movie)*/
							}}
							className='flex justify-center items-center border gap-2 px-4 hover:bg-white hover:text-black transition-all'
						>
							<FaPlus size={15} />
							{isInList(movie) ? 'Agregada' : 'Agregar a la lista'}
						</button>

						<button
							onClick={() => {
								/*addToFavorites(movie)*/
							}}
							className={`border px-3 transition-all ${
								isFavorite(movie)
									? 'text-[#00A878] bg-black'
									: 'text-white hover:bg-white hover:text-black'
							}`}
						>
							<FaHeart size={22} />
						</button>
					</div>

					{/* Barra de opciones */}

					<div className='flex gap-4 mt-10 border-b border-white'>
						<button
							onClick={() => setSeccionActiva('suggestions')}
							className={`px-4 py-2 transition-all ${
								seccionActiva === 'suggestions'
									? 'border-b-2 border-white font-bold'
									: 'hover:opacity-70'
							}`}
						>
							Sugerencias
						</button>
						<button
							onClick={() => setSeccionActiva('reparto')}
							className={`px-4 py-2 transition-all ${
								seccionActiva === 'reparto'
									? 'border-b-2 border-white font-bold'
									: 'hover:opacity-70'
							}`}
						>
							Reparto
						</button>
						<button
							onClick={() => setSeccionActiva('comentarios')}
							className={`px-4 py-2 transition-all ${
								seccionActiva === 'comentarios'
									? 'border-b-2 border-white font-bold'
									: 'hover:opacity-70'
							}`}
						>
							Comentarios
						</button>
						<button
							onClick={() => setSeccionActiva('trailers')}
							className={`px-4 py-2 transition-all ${
								seccionActiva === 'trailers'
									? 'border-b-2 border-white font-bold'
									: 'hover:opacity-70'
							}`}
						>
							Trailers
						</button>
					</div>

					{/* Contenido según pestaña activa */}

					<div className='mt-10'>
						{seccionActiva === 'reparto' && movie.cast.length > 0 && (
							<Reparto reparto={movie.cast} />
						)}

						{seccionActiva === 'comentarios' && (
							<div className='w-full flex flex-col items-center gap-4'>
								<h2 className='font-semibold text-2xl'>
									Tu opinión nos importa, compártela aquí.
								</h2>
								<Comment img={user?.image || ''} name={user?.name || ''} />
								{movie.reviews?.map((item, index) => (
									<Criticas key={index} {...item} />
								))}
							</div>
						)}

						{seccionActiva === 'trailers' && (
							<div className='flex flex-wrap justify-center gap-8'>
								{movie.trailers?.map((trailer, index) =>
									trailer.img && trailer.url ? (
										<button
											key={index}
											className='relative'
											onClick={() => {
												setOpen(true)
												setTrailer(trailer.url)
											}}
										>
											<div className='relative w-70 h-45'>
												<Image
													src={trailer.img}
													alt={`Trailer ${index + 1}`}
													fill
													className='object-cover rounded'
												/>
											</div>
											<div className='absolute inset-0 flex items-center justify-center'>
												<FaPlay
													size={40}
													className='text-tertiary opacity-60'
												/>
											</div>
										</button>
									) : null
								)}
							</div>
						)}
						{seccionActiva === 'suggestions' && (
							<div>
							{movie.suggestions?.length > 0 && (
								<div className='flex flex-col'>
									<p className='text-white text-2xl mb-4'>
										Películas y series similares
									</p>
									<div className='flex gap-5'>
										{movie.suggestions.map((item, index) => (
											<div
												key={index}
												className='w-[15rem] overflow-hidden rounded-lg '
											>
												<img
													src={item.img}
													alt={`Sugerencia ${index}`}
													className='w-full h-full object-cover rounded-md transition-transform duration-200 hover:scale-105 cursor-pointer'
												/>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MediaView
