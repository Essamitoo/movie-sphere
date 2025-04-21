'use client'

import { useEffect, useState } from 'react'
import {
	createDirectorService,
	deleteDirectorService,
	getDirectorsService,
	updateDirectorService,
} from '@/services/directorServices'
import { useAuthContext } from '@/contexts/authContext'
import { Director } from '@/interfaces/IMedia'
import { toast } from 'react-toastify'

const DirectorManager = () => {
	const { user } = useAuthContext()
	const [directors, setDirectors] = useState<Director[]>([])
	const [formData, setFormData] = useState({
		name: '',
		biography: '',
		avatar: '',
	})
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		fetchDirectors()
	}, [])

	const fetchDirectors = async () => {
		try {
			const data = await getDirectorsService()
			setDirectors(data)
		} catch (error) {
			console.error(error)
		}
	}

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await createDirectorService(formData, user!.token)
			toast.success('Director creado')
			setFormData({ name: '', biography: '', avatar: '' })
			fetchDirectors()
		} catch (error) {
			console.error(error)
			toast.error('Error al crear director')
		}
	}

	const handleUpdate = async (id: number, updatedFields: Partial<Director>) => {
		try {
			await updateDirectorService(id, updatedFields, user!.token)
			toast.success('Director actualizado')
			fetchDirectors()
		} catch (error) {
			console.error(error)
			toast.error('Error al actualizar director')
		}
	}

	const handleDelete = async (id: number) => {
		try {
			await deleteDirectorService(id, user!.token)
			toast.success('Director eliminado')
			fetchDirectors()
		} catch (error) {
			console.error(error)
			toast.error('Error al eliminar director')
		}
	}

	const filteredDirectors = directors.filter((director) =>
		director.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='w-full mx-auto p-4 text-white flex gap-8'>
			{/* Formulario para crear director */}

			<form
				onSubmit={handleCreate}
				className='bg-[#202020] p-4 rounded-xl flex flex-col gap-4 mb-8'
			>
				<input
					name='name'
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					placeholder='Nombre'
					className='p-2 rounded bg-white text-black'
				/>
				<textarea
					name='biography'
					value={formData.biography}
					onChange={(e) =>
						setFormData({ ...formData, biography: e.target.value })
					}
					placeholder='Biografía'
					className='p-2 rounded bg-white text-black'
				/>
				<input
					name='avatar'
					value={formData.avatar}
					onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
					placeholder='URL del avatar'
					className='p-2 rounded bg-white text-black'
				/>
				<button
					type='submit'
					className='bg-[#00a878] text-white rounded py-2 hover:bg-[#00cc92]'
				>
					Crear Director
				</button>
			</form>

			{/* Buscador */}
			<div>
				<input
					type='text'
					placeholder='Buscar director por nombre'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='w-full mb-4 p-2 rounded bg-white text-black'
				/>

				{/* Lista de directores */}

				<div className='space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{filteredDirectors.map((director) => (
						<DirectorItem
							key={director.id}
							director={director}
							onUpdate={handleUpdate}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

interface DirectorItemProps {
	director: Director
	onUpdate: (id: number, data: Partial<Director>) => void
	onDelete: (id: number) => void
}

const DirectorItem = ({ director, onUpdate, onDelete }: DirectorItemProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		name: director.name,
		biography: director.biography,
		avatar: director.avatar,
	})

	const handleSave = () => {
		const updatedFields: Partial<Director> = {}
		if (formData.name !== director.name) updatedFields.name = formData.name
		if (formData.biography !== director.biography)
			updatedFields.biography = formData.biography
		if (formData.avatar !== director.avatar)
			updatedFields.avatar = formData.avatar

		if (Object.keys(updatedFields).length > 0) {
			onUpdate(director.id, updatedFields)
		}
		setIsEditing(false)
	}

	return (
		<div className='bg-[#202020] p-4 rounded-xl flex flex-col gap-2 '>
			{isEditing ? (
				<>
					<input
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className='p-2 rounded bg-white text-black'
					/>
					<textarea
						value={formData.biography}
						onChange={(e) =>
							setFormData({ ...formData, biography: e.target.value })
						}
						className='p-2 rounded bg-white text-black'
					/>
					<input
						value={formData.avatar}
						onChange={(e) =>
							setFormData({ ...formData, avatar: e.target.value })
						}
						className='p-2 rounded bg-white text-black'
					/>
					<button
						onClick={handleSave}
						className='bg-quaternary text-white py-1 rounded hover:bg-quaternary/70'
					>
						Guardar
					</button>
				</>
			) : (
				<>
					<div className='overflow-hidden rounded-lg'>
						<img
							src={director.avatar}
							alt={director.name}
							className='object-cover'
						/>
					</div>
					<h3 className='text-lg font-semibold'>{director.name}</h3>
					<p className='text-sm text-gray-300'>{director.biography}</p>
					<div className='flex gap-2 mt-2'>
						<button
							onClick={() => setIsEditing(true)}
							className='bg-quaternary text-white px-4 py-1 rounded hover:bg-quaternary/80'
						>
							Editar
						</button>
						<button
							onClick={() => onDelete(director.id)}
							className='bg-red-900 text-white px-3 py-1 rounded hover:bg-red-800 '
						>
							Eliminar
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default DirectorManager
