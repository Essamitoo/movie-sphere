'use client'

import { useState } from 'react'
import CreateMovie from '@/views/DashboardView/ManageMedia/CreateMovie'
import SearchMovieCard from '@/views/DashboardView/ManageMedia/SearchMovie'
import CreateGenre from './ManageGenres'
import ManageActors from './ManageActors/ManageActors'
import DirectorManager from './ManageDirectors/ManageDirectors'

const sections = ['Películas', 'Actores', 'Géneros', 'Directores']

const ManageMovies = () => {
	const [activeSection, setActiveSection] = useState('Películas')

	return (
		<div className='flex flex-col gap-6'>
			{/* Barra de opciones */}

			<div className='flex gap-4 border-b border-gray-700 pb-2'>
				{sections.map((section) => (
					<button
						key={section}
						onClick={() => setActiveSection(section)}
						className={`px-4 py-2 rounded-md transition-all ${
							activeSection === section
								? 'bg-tertiary text-primary font-bold'
								: 'bg-secondary text-tertiary hover:bg-secondary/80'
						}`}
					>
						{section}
					</button>
				))}
			</div>

			<h2 className='text-xl font-bold text-tertiary'>{activeSection}</h2>

			<div className='flex gap-8'>
				{activeSection === 'Películas' && (
					<div className='w-1/4 sticky top-4 h-fit'>
						<CreateMovie />
					</div>
				)}

				<div className={activeSection === 'Películas' ? 'w-3/4' : 'w-full'}>
					{activeSection === 'Películas' && <SearchMovieCard />}
					{activeSection === 'Actores' && <ManageActors />}
					{activeSection === 'Géneros' && <CreateGenre />}
					{activeSection === 'Directores' && <DirectorManager />}
				</div>
			</div>
		</div>
	)
}

export default ManageMovies
