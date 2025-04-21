'use client'

import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import {
	createGenreService,
	deleteGenreService,
	getGenresService,
	updateGenreService,
} from '@/services/genreServices'
import { toast } from 'react-toastify'

const GenreManager = () => {
	const { user } = useAuthContext()

	const [genres, setGenres] = useState<{ id: number; title: string }[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [newGenre, setNewGenre] = useState('')
	const [editingId, setEditingId] = useState<number | null>(null)
	const [editingTitle, setEditingTitle] = useState('')

	useEffect(() => {
		fetchGenres()
	}, [])

	const fetchGenres = async () => {
		try {
			setLoading(true)
			const data = await getGenresService()
			setGenres(data)
		} catch (err) {
			toast.error('Error al obtener los géneros')
		} finally {
			setLoading(false)
		}
	}

	const handleCreate = async () => {
		if (!newGenre.trim()) {
			toast.error('El nombre no puede estar vacío')
			return
		}
		try {
			await createGenreService(newGenre, user!.token)
			toast.success('Género creado ✅')
			setNewGenre('')
			fetchGenres()
		} catch {
			toast.error('Error al crear el género')
		}
	}

	const handleEdit = async (id: number) => {
		if (!editingTitle.trim()) {
			toast.error('El nombre no puede estar vacío')
			return
		}
		try {
			await updateGenreService(Number(id), editingTitle, user!.token)
			toast.success('Género actualizado ✅')
			setEditingId(null)
			fetchGenres()
		} catch {
			toast.error('Error al editar el género')
		}
	}

	const handleDelete = async (id: number) => {
		if (!confirm('¿Estás seguro de eliminar este género?')) return
		try {
			await deleteGenreService(Number(id), user!.token)
			toast.success('Género eliminado 🗑️')
			fetchGenres()
		} catch {
			toast.error('Error al eliminar el género')
		}
	}

	const filteredGenres = genres.filter((g) =>
		g.title.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className='p-6 bg-[#202020] text-[#d0d0d0] rounded-xl shadow-md'>
			<h2 className='text-xl font-bold mb-4 text-white'>Gestión de Géneros</h2>

			<div className='mb-4 flex gap-2'>
				<input
					type='text'
					placeholder='Buscar género...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='flex-1 p-2 rounded bg-white text-black'
				/>
				<input
					type='text'
					placeholder='Nuevo género'
					value={newGenre}
					onChange={(e) => setNewGenre(e.target.value)}
					className='p-2 rounded bg-white text-black'
				/>
				<button
					onClick={handleCreate}
					className='bg-[#00a878] text-white px-4 py-2 rounded hover:bg-[#00cc92]'
				>
					Crear
				</button>
			</div>

			{loading ? (
				<p>Cargando géneros...</p>
			) : filteredGenres.length === 0 ? (
				<p>No se encontraron géneros.</p>
			) : (
				<ul className='space-y-2'>
					{filteredGenres.map((genre) => (
						<li
							key={genre.id}
							className='flex items-center justify-between bg-[#2a2a2a] p-3 rounded'
						>
							{editingId === genre.id ? (
								<>
									<input
										type='text'
										value={editingTitle}
										onChange={(e) => setEditingTitle(e.target.value)}
										className='flex-1 p-2 rounded bg-white text-black'
									/>
									<div className='flex gap-2 ml-2'>
										<button
											onClick={() => handleEdit(genre.id)}
											className='bg-quaternary text-white px-2 py-1 rounded hover:bg-quaternary/80'
										>
											Guardar
										</button>
										<button
											onClick={() => setEditingId(null)}
											className='bg-red-900 text-white px-2 py-1 rounded hover:bg-red-800'
										>
											Cancelar
										</button>
									</div>
								</>
							) : (
								<>
									<span className='flex-1'>{genre.title}</span>
									<div className='flex gap-2 ml-2'>
										<button
											onClick={() => {
												setEditingId(genre.id)
												setEditingTitle(genre.title)
											}}
											className='bg-quaternary text-white px-3 py-1 rounded hover:bg-quaternary/80'
										>
											Editar
										</button>
										<button
											onClick={() => handleDelete(genre.id)}
											className='bg-red-900 text-white px-2 py-1 rounded hover:bg-red-800'
										>
											Eliminar
										</button>
									</div>
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default GenreManager
