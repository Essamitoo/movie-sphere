'use client'
import Card from '@/components/card/Card'
import EmptyState from '@/components/emptyState/EmpyState'
import { useAuthContext } from '@/contexts/authContext'


const List = () => {
	const { user } = useAuthContext()
	const moviesList = user?.list || []

	return (
			<div className=''>
				{moviesList.length > 0 ? (
					<div className='flex flex-wrap justify-start gap-4'>
						{moviesList.map((movie) => (
							<div key={movie.id}>
								<Card movie={movie} />
							</div>
						))}
					</div>
				) : (
					<EmptyState text='No se encontraron peliculas en la lista'/>
				)}
			</div>
	)
}

export default List
