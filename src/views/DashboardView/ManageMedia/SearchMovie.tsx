'use client'

import { useAuthContext } from '@/contexts/authContext'
import { Movie } from '@/interfaces/IMedia'
import { getMoviesService } from '@/services/movieServices'
import { useState } from 'react'
import EditMovie from './EditMovie'

const SearchMovieCard = () => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<Movie[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { user } = useAuthContext()

	const handleSearch = async () => {
		if (!query) return

		setLoading(true)
		setError('')
		setResults([])

		try {
			const allMovies = await getMoviesService()
			const filtered = allMovies.filter((movie: Movie) =>
				movie.title.toLowerCase().includes(query.toLowerCase())
			)

			if (filtered.length === 0) {
				setError('No se encontraron películas con ese nombre.')
			} else {
				setResults(filtered)
			}
		} catch (err) {
			setError('Hubo un problema al buscar las películas.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-4 flex flex-col gap-6 text-white bg-secondary rounded-lg'>
			<div className='flex gap-4'>
				<input
					type='text'
					placeholder='Nombre de la película'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className='bg-gray-800 p-2 rounded w-full'
				/>
				<button
					onClick={handleSearch}
					className='bg-quaternary text-white  px-6 rounded'
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

			{results.map((movie) => (
				<EditMovie
					key={movie.id}
					movie={movie}
					onDelete={(id) =>
						setResults((prev) => prev.filter((m) => m.id !== id))
					}
					onEdit={(updatedMovie) =>
						setResults((prev) =>
							prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
						)
					}
				/>
			))}
		</div>
	)
}

export default SearchMovieCard
