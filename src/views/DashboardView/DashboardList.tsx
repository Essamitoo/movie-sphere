'use client'
import { getMovies } from '@/services/movieServices'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const DashboardList = () => {
	const { user } = useContext(AuthContext)

	const getFavoriteMovies = () => {
		const movies = getMovies()
		return movies
	}

	const favoriteMovies = getFavoriteMovies()

	return (
		<div>
			<p>Peliculas favoritas:</p>
			<div>
				{favoriteMovies
					? favoriteMovies.map((movie) => (
							<div key={movie.id}>
								<p>{movie.title}</p>
								<p>{movie.genre}</p>
							</div>
					  ))
					: 'No hay peliculas favoritas'}
			</div>
		</div>
	)
}

export default DashboardList
