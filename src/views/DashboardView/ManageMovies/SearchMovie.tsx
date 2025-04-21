'use client'

import { useAuthContext } from '@/contexts/authContext'
import { Movie } from '@/interfaces/IMedia'
import { deleteMovie, getMovieService } from '@/services/movieServices'
import { useState } from 'react'

const SearchMovieCard = () => {
	const [movieId, setMovieId] = useState('')
	const [movie, setMovie] = useState<Movie>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const { user } = useAuthContext()
	const { token } = user!

	const handleSearch = async () => {
		if (!movieId) return

		setLoading(true)
		setError('')
		setMovie(undefined)

		try {
			const foundMovie = await getMovieService(Number(movieId))
			if (!foundMovie) {
				setError('No se encontró ninguna película con esa ID')
				setMovie(undefined)
			} else {
				setMovie(foundMovie)
			}
		} catch (err) {
			setError('Hubo un problema al buscar la película')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!movieId) return

		const isConfirmed = window.confirm(
			'¿Estás seguro de que deseas eliminar esta película?'
		)
		if (!isConfirmed) return

		try {
			const message = await deleteMovie(Number(movieId), token!)
			if (message) {
				alert(message)
				setMovie(undefined)
				setMovieId('')
			} else {
				alert('Hubo un error al eliminar la película.')
			}
		} catch (error) {
			alert('Hubo un problema con la eliminación.')
		}
	}

	return (
		<div className='max-w-xl mx-auto p-4 flex flex-col gap-6 text-white'>
			<div className='flex gap-4'>
				<input
					type='number'
					placeholder='ID de la película'
					value={movieId}
					onChange={(e) => setMovieId(e.target.value)}
					className='bg-gray-800 p-2 rounded w-full'
				/>
				<button
					onClick={handleSearch}
					className='bg-tertiary text-black font-bold px-4 py-2 rounded'
				>
					Buscar
				</button>
			</div>

			{loading && <p className='text-gray-300'>Cargando...</p>}

			{error && (
				<div className='bg-red-900 text-red-300 p-3 rounded text-center'>
					{error}
				</div>
			)}

			{movie && (
				<div className='bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row'>
					<img
						src={movie.poster}
						alt={movie.title}
						className='w-full md:w-1/3 h-auto object-cover'
					/>
					<div className='p-4 flex flex-col justify-between'>
						<div>
							<h2 className='text-xl font-bold'>{movie.title}</h2>
							<p className='text-sm text-gray-400'>
								{movie.year} • {movie.duration}
							</p>
							<p className='mt-2 text-sm'>{movie.description}</p>
						</div>
						<div>
							<button
								onClick={handleDelete}
								className='bg-red-800 py-1 px-4 rounded-lg mt-4'
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SearchMovieCard
