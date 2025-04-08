'use client'

import Card from '@/components/card/Card'
import EmptyState from '@/components/emptyState/EmpyState'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const Views = () => {
	const { user } = useContext(AuthContext)

	if (!user) {
		return <div className='h-screen text-white px-4'>Loading...</div>
	}

	const moviesViewed = user.views || []

	return (
		<div className='flex flex-wrap justify-start'>
			{moviesViewed.length > 0 ? (
				moviesViewed.map((movie) => (
					<div key={movie.id}>
						<Card movie={movie} />
					</div>
				))
			) : (
				<EmptyState text='No se encontraron peliculas vistas' />
			)}
		</div>
	)
}

export default Views
