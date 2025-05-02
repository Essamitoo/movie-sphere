'use client'
import Card from '@/components/card/Card'
import EmptyState from '@/components/emptyState/EmpyState'
// import GridContainer from '@/components/grid/GridContainer'
import { useAuthContext } from '@/contexts/authContext'

const DashboardList = () => {
	const { user } = useAuthContext()
	const favoriteMovies = user?.favorites || []

	return (
		<div className=''>
			{favoriteMovies.length > 0 ? (
				<div className='flex flex-wrap gap-4'>
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
