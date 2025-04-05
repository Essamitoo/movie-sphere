'use client'
import Card from '@/components/card/Card'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const List = () => {
	const { user } = useContext(AuthContext)
	const moviesList = user?.user?.list || []

	return (
			<div className=''>
				{moviesList.length > 0 ? (
					<div className='flex flex-wrap justify-start'>
						{moviesList.map((movie) => (
							<div key={movie.id}>
								<Card movie={movie} />
							</div>
						))}
					</div>
				) : (
					<p>No hay películas en la lista</p>
				)}
			</div>
	)
}

export default List
