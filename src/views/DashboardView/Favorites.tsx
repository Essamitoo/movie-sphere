'use client'
import Card from '@/components/card/Card'
// import GridContainer from '@/components/grid/GridContainer'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const DashboardList = () => {
	const { user } = useContext(AuthContext)
	const favoriteMovies = user?.user?.favorites || []

	return (
		<div className=''>
			{favoriteMovies.length > 0 ? (
				<div className='flex flex-wrap justify-center'>
					{favoriteMovies.map((movie) => (
						<Card key={movie.id} movie={movie} />
					))}
				</div>
			) : (
				'No hay películas favoritas'
			)}
		</div>
	)
}

export default DashboardList
