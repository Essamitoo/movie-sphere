'use client'
import {  useAuthContext } from '@/contexts/authContext'
import UploadImageClient from '@/components/upload/UploadImageClient'

const UserInfo = () => {
	const { user, logout } = useAuthContext()

	if (!user) {
		return <div className='h-screen text-white px-4'>Loading...</div>
	}

	const { image, name, email } = user

	return (
		<div className='text-white px-4 mb-30'>
			<div className='flex flex-col mt-10 gap-4 text-center'>
				<UploadImageClient image={image} />
				<div>
					<p className='font-semibold'>{name}</p>
					<p className='text-sm font-extralight'>{email}</p>
				</div>
				<div>
					<button onClick={logout} className='bg-quaternary rounded-lg px-4 py-1 text-sm font-bold  cursor-pointer hover:bg-quinary'>
						Cerrar Sesion
					</button>
				</div>
			</div>
		</div>
	)
}

export default UserInfo
