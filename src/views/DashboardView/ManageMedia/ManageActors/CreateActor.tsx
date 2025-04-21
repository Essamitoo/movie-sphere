'use client'

import { useAuthContext } from '@/contexts/authContext'
import { createActorService } from '@/services/actorServices'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

const CreateActor = () => {
	const [formData, setFormData] = useState({
		name: '',
		birthdate: '',
		avatar: '',
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const { user } = useAuthContext()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setSuccess(false)
		setError('')

		if (new Date(formData.birthdate) > new Date()) {
			setError('La fecha de nacimiento no puede ser en el futuro.')
			setLoading(false)
			return
		}

		try {
			const formattedData = {
				...formData,
				birthdate:
					new Date(formData.birthdate).toISOString().split('T')[0] +
					'T00:00:00.000Z',
			}
			console.log(formData)

			const res = await createActorService(formattedData, user!.token)
			console.log(res)

			setSuccess(true)
		} catch (err) {
			console.error(err)
			setError('Error al guardar el actor.')
			toast.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-[#202020] p-6 rounded-xl shadow-md text-[#d0d0d0]'>
			<h3 className='text-lg font-bold mb-4 text-[#ffffff]'>Crear Actor</h3>

			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<div>
					<label className='block mb-1'>Nombre</label>
					<input
						name='name'
						type='text'
						value={formData.name}
						onChange={handleChange}
						className='w-full p-2 rounded bg-[#ffffff] text-[#202020] outline-none'
						required
					/>
				</div>

				<div>
					<label className='block mb-1'>Fecha de nacimiento</label>
					<input
						name='birthdate'
						type='date'
						value={formData.birthdate}
						onChange={handleChange}
						className='w-full p-2 rounded bg-[#ffffff] text-[#202020] outline-none'
						required
					/>
				</div>

				<div>
					<label className='block mb-1'>URL del avatar</label>
					<input
						name='avatar'
						type='url'
						value={formData.avatar}
						onChange={handleChange}
						className='w-full p-2 rounded bg-[#ffffff] text-[#202020] outline-none'
						required
					/>
				</div>

				<button
					type='submit'
					className='font-semibold py-2 rounded transition bg-[#00a878] text-[#ffffff] hover:bg-[#00cc92]'
					disabled={loading}
				>
					{loading ? 'Creando...' : 'Crear actor'}
				</button>

				{error && <p className='text-red-400'>{error}</p>}
				{success && <p className='text-[#00cc92]'>Actor creado exitosamente</p>}
			</form>
		</div>
	)
}

export default CreateActor
