'use client'
import Card from '@/components/card/Card'
import EmptyState from '@/components/emptyState/EmpyState'
// import GridContainer from '@/components/grid/GridContainer'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const DashboardList = () => {
	const { user } = useContext(AuthContext)
	const favoriteMovies = user?.favorites || []

	return (
		<div className=''>
			{favoriteMovies.length > 0 ? (
				<div className='flex flex-wrap justify-center'>
					{favoriteMovies.map((movie) => (
						<Card key={movie.id} movie={movie} />
					))}
				</div>
			) : 
				(
					<EmptyState text='No se encontraron peliculas en favoritos'/> 
				)
			}
		</div>
	)
}

export default DashboardList
