import { ChangeEvent, useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import { deleteUserService, updateUserService } from '@/services/authServices'
import { toast } from 'react-toastify'
import { BiEditAlt } from 'react-icons/bi'
import ConfirmModal from '@/ui/ConfirmModal/ConfirmModal'

const UserSettings = () => {
	const { user, logout, setUser } = useAuthContext()
	if (!user) return null

	const [editMode, setEditMode] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		password: '',
	})
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleUpdate = async () => {
		try {
			setLoading(true)

			const res = await updateUserService(formData, user.token, Number(user.id))

			const updatedUser = {
				...user,
				name: formData.name,
				email: formData.email,
			}

			setUser(updatedUser)
			localStorage.setItem('user', JSON.stringify(updatedUser))

			toast.success(res.message || 'Datos actualizados.')
			setEditMode(false)
		} catch (err) {
			toast.error('Error al actualizar.')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async () => {
		setShowModal(false)  // Cerrar el modal antes de continuar con la eliminación.
		setLoading(true)
		try {
			await deleteUserService(user.token, Number(user.id))
			logout()
		} catch (err) {
			toast.error('Error al eliminar usuario.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='max-w-2xl mt-10 p-6 rounded-2xl space-y-8'>
			<div>
				{!editMode ? (
					<div className='space-y-2'>
						<p>Nombre: {user.name}</p>
						<p>Email: {user.email}</p>

						<div className='flex gap-4 mt-4'>
							<button
								onClick={() => setEditMode(true)}
								className='bg-quaternary text-white px-4 py-2 rounded hover:bg-quaternary/80 flex items-center gap-1'
							>
								Editar
								<BiEditAlt />
							</button>

							<button
								onClick={() => setShowModal(true)} // Aquí mostramos el modal.
								className='bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700'
							>
								Eliminar cuenta
							</button>
						</div>
					</div>
				) : (
					<div className='space-y-4'>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Nombre'
							className='w-full p-2 border rounded'
						/>

						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Correo electrónico'
							className='w-full p-2 border rounded'
						/>

						<div className='flex gap-4'>
							<button
								onClick={handleUpdate}
								disabled={loading}
								className='bg-quaternary text-white px-4 py-2 rounded hover:bg-quaternary/80'
							>
								{loading ? 'Guardando...' : 'Guardar cambios'}
							</button>

							<button
								onClick={() => setEditMode(false)}
								className='bg-tertiary text-black px-4 py-2 rounded hover:bg-tertiary/80'
							>
								Cancelar
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Modal de Confirmación */}
			<ConfirmModal
			confirmLabel='Confirmar'
				isOpen={showModal}
				message='¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
				onConfirm={handleDelete}
				onCancel={() => setShowModal(false)} // Cerrar el modal al cancelar.
			/>
		</div>
	)
}

export default UserSettings
