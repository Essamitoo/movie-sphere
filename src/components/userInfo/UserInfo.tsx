'use client'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/authContext'

const UserInfo = () => {
	const { user } = useContext(AuthContext)

	const getGreeting = () => {
		const hour = new Date().getHours()
		if (hour < 12) return 'Buenos Dias'
		if (hour < 18) return 'Buenas Tardes'
		return 'Buenas Noches'
	}

	if (!user) {
		return <p>Cargando...</p>
	}
	
	return (
		<div className='h-screen bg-[#303030] text-white px-4'>
			<h1 className='font-bold text-4xl'>{getGreeting()}, <span className='text-quinary'>{user?.user.name}</span>
			</h1>
			<div className='flex mt-10 gap-4'>
				<div>
					<h3>Informacion del usuario:</h3>
					<p>Nombre: {user?.user.name}</p>
					<p>Email: {user?.user.email}</p>
				</div>
				<div>
					<img src={user?.user?.image} alt={user?.user?.name} />
				</div>
			</div>
		</div>
	)
	
}

export default UserInfo
