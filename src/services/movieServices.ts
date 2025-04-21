import { IFormData } from '@/interfaces/IForm'
import { IMediaPage, Movie } from '@/interfaces/IMedia'
import { mediaInfo } from '@/utils/mediaInfo'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getMovies = () => {
	const movies: IMediaPage[] = mediaInfo
	return movies
}

export const getMovie = (id: number) => {
	const movies = getMovies()
	const movie = movies.find((movie) => movie.id === id)
	return movie
}

export const getMoviesService = async () => {
	try {
		const movies = await fetch(`${apiUrl}v1/movies`)
		if (!movies.ok) return null
		const data = await movies.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const getMovieService = async (id: number) => {
	try {
		const response = await fetch(`${apiUrl}v1/movies/${id}`)
		if (!response.ok) return null
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const deleteMovie = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/movies/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Error al eliminar la película: ${response.statusText}`)
		}

		return 'Película eliminada con éxito'
	} catch (error) {
		console.error('Error al eliminar la película:', error)
		return null
	}
}

export const addMovie = async (movieData: IFormData, token: string) => {
	console.log(movieData);
	
	try {
		const response = await fetch(`${apiUrl}v1/movies`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(movieData),
		})

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const editMovieService = async (
	id: number,
	data: Partial<Movie>,
	token: string
) => {
	console.log(data);
	
	const res = await fetch(`${apiUrl}v1/movies/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	})

	if (!res.ok) throw new Error('Error al editar la película')

	const result = await res.json()
	return result.message
}
