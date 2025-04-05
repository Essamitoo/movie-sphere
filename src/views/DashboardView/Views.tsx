'use client'

import Card from '@/components/card/Card'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const Views = () => {
	const { user } = useContext(AuthContext)

	if (!user) {
		return <div className='h-screen text-white px-4'>Loading...</div>
	}

	const moviesViewed = user.user.views || []

	return (
		<div className='flex flex-wrap justify-start'>
			{moviesViewed.length > 0
				? moviesViewed.map((movie) => (
						<div key={movie.id}>
							<Card movie={movie} />
						</div>
				  ))
				:  <p>No hay peliculas vistas</p>}
		</div>
	)
}

export default Views
