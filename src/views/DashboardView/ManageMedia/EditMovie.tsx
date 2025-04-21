'use client'

import { useState } from 'react'
import { Movie } from '@/interfaces/IMedia'
import { editMovieService, deleteMovie } from '@/services/movieServices'
import { toast } from 'react-toastify'
import { useAuthContext } from '@/contexts/authContext'

interface Props {
	movie: Movie
	onDelete: (id: number) => void
	onEdit: (updatedMovie: Movie) => void
}

const EditMovie = ({ movie, onDelete, onEdit }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedMovie, setEditedMovie] = useState<Movie>(movie)

	const { user } = useAuthContext()
	const { token } = user!

	const handleEditChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setEditedMovie((prev) => ({ ...prev, [name]: value }))
	}

	const handleEditSubmit = async () => {
		try {
			const changedFields: Partial<Movie> = {}
			;(Object.keys(editedMovie) as (keyof Movie)[]).forEach((key) => {
				if (key !== 'id' && editedMovie[key] !== movie[key]) {
					changedFields[key] = editedMovie[key]
				}
			})

			if (Object.keys(changedFields).length === 0) {
				toast.info('No hay cambios.')
				return
			}

			await editMovieService(movie.id, changedFields, token)
			onEdit({ ...movie, ...changedFields })
			toast.success('Película actualizada')
			setIsEditing(false)
		} catch (error) {
			toast.error('Error al editar la película.')
			console.log(error)
		}
	}

	const handleDelete = async () => {
		try {
			await deleteMovie(movie.id, token)
			onDelete(movie.id)
			toast.success('Película eliminada')
		} catch {
			toast.error('Error al eliminar la película.')
		}
	}

	return (
		<div className='bg-gray-900 rounded-lg p-4'>
			{isEditing ? (
				<>
					<input
						type='text'
						name='title'
						value={editedMovie.title}
						onChange={handleEditChange}
						className='w-full bg-gray-700 p-2 mb-2 rounded'
						placeholder='Título'
					/>
					<textarea
						name='description'
						value={editedMovie.description}
						onChange={handleEditChange}
						className='w-full bg-gray-700 p-2 mb-2 rounded'
						placeholder='Descripción'
					/>
					<input
						type='text'
						name='year'
						value={editedMovie.year}
						onChange={handleEditChange}
						className='w-full bg-gray-700 p-2 mb-2 rounded'
						placeholder='Año de estreno'
					/>
					<input
						type='text'
						name='duration'
						value={editedMovie.duration}
						onChange={handleEditChange}
						className='w-full bg-gray-700 p-2 mb-2 rounded'
						placeholder='Duración (ej: 1h 45m)'
					/>
					<input
						type='text'
						name='poster'
						value={editedMovie.poster}
						onChange={handleEditChange}
						className='w-full bg-gray-700 p-2 mb-2 rounded'
						placeholder='URL del póster'
					/>
					<div className='flex gap-4'>
						<button
							onClick={handleEditSubmit}
							className='bg-quaternary px-4 py-1 rounded'
						>
							Guardar
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className='bg-tertiary px-4 py-1 text-black rounded'
						>
							Cancelar
						</button>
					</div>
				</>
			) : (
				<>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-bold'>{movie.title}</h2>
						<div className='flex gap-4 mt-4'>
							<button
								onClick={() => setIsEditing(true)}
								className='bg-quaternary py-1 px-4 rounded'
							>
								Editar
							</button>
							<button
								onClick={handleDelete}
								className='bg-red-800 py-1 px-4 rounded'
							>
								Eliminar
							</button>
						</div>
					</div>

					<div className='flex gap-6 mt-4'>

						{/* Imagen */}

						<div className='w-1/3'>
							<img
								src={movie.poster}
								alt={movie.title}
								className='w-full h-auto rounded'
							/>
						</div>

						{/* Info */}

						<div className='w-2/3 flex flex-col '>
							<p className='text-sm text-gray-400'>
								{movie.year} • {movie.duration}
							</p>
							<p className='mt-2 text-sm'>{movie.description}</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default EditMovie
