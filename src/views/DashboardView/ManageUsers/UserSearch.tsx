'use client'

import { useState, ChangeEvent } from "react"
import { deleteUserService, getUserByIdService } from "@/services/authServices"
import { IUser } from "@/interfaces/IUser"
import { toast } from "react-toastify"
import { useAuthContext } from "@/contexts/authContext"

const UserSearch = () => {
  const { user } = useAuthContext()
  const [searchId, setSearchId] = useState("")
  const [searchedUser, setSearchedUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found'>('idle')

  const handleSearch = async () => {
    if (!searchId) return
    setLoading(true)
    setStatus('idle')
    setSearchedUser(null)

    try {
      const result = await getUserByIdService(Number(searchId), user!.token)
      setSearchedUser(result)
      setStatus('found')
    } catch (err) {
      toast.error("Usuario no encontrado.")
      setSearchedUser(null)
      setStatus('not-found')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!searchedUser) return
    setLoading(true)

    try {
      await deleteUserService(user!.token, Number(searchedUser.id))
      toast.success("Usuario eliminado correctamente.")
      setSearchedUser(null)
      setStatus('idle')
    } catch (err) {
      toast.error("Error al eliminar el usuario.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value)
    setStatus('idle')
    setSearchedUser(null)
  }

  return (
		<div>
			<h3 className='text-xl font-semibold mb-2'>Buscar usuario por ID</h3>

			<div className='flex gap-2'>
				<input
					type='text'
					value={searchId}
					onChange={handleChange}
					placeholder='ID del usuario'
					className='flex-1 p-2 border rounded'
				/>

				<button
					onClick={handleSearch}
					className='bg-quaternary text-white px-4 py-2 rounded hover:bg-quaternary/80'
				>
					{loading ? 'Buscando...' : 'Buscar'}
				</button>
			</div>

			{/* Usuario encontrado */}
			{status === 'found' && searchedUser && (
				<div className='mt-4 p-4 border rounded'>
					<div className='size-35 mb-2'>
						<img
							src={searchedUser.avatar || '/default-avatar.jpg'}
							alt='Avatar'
							className='rounded-full w-20 h-20 object-cover'
						/>
					</div>
					<div>
						<p>
							<strong>Nombre:</strong> {searchedUser.name}
						</p>
						<p>
							<strong>Email:</strong> {searchedUser.email}
						</p>
					</div>
					<button
						className='mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800'
						onClick={handleDelete}
					>
						Eliminar usuario
					</button>
				</div>
			)}

			{/* Usuario no encontrado */}
			{status === 'not-found' && (
				<p className='mt-4 text-red-200 font-medium bg-red-900 w-50 text-center p-2 rounded'>
					Usuario no encontrado!
				</p>
			)}
		</div>
	)
}

export default UserSearch
