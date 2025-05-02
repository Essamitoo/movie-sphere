'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { confirmPayment } from '@/services/authServices'
import { useAuthContext } from '@/contexts/authContext'

const ConfirmPaymentComponent: React.FC = () => {
	const { user, setUser } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const sessionId = queryParams.get('session_id') || ''
		const userId = queryParams.get('user_id') || ''
		if (sessionId && userId) {
			confirmPayment({ sessionId, userId })
				.then(() => {
					setUser((prevUser) =>
						prevUser ? { ...prevUser, role: 'PREMIUM' } : null
					)
					setTimeout(() => {
						router.push('/home') // Redirige después de 1 segundo
					}, 5000)
				})
				.catch((error) => {
					alert('Hubo un error al confirmar el pago.')
				})
		} else {
			console.error('Faltan sessionId o userId en la URL.')
		}
	}, [router])

	return (
		<div className='text-center flex justify-center items-center h-screen flex-col'>
			{user && user.role === 'PREMIUM' && (
				<div className='bg-white text-black p-6 flex flex-col justify-content-center items-center rounded-lg'>
					<img src={user?.avatar} alt='' className='rounded-full w-40 h-40' />
					<p>{user.name}</p>
					<h3 className='text-2xl font-bold'>✔️ ¡Ya sos PREMIUM!</h3>
				</div>
			)}
		</div>
	)
}

export default ConfirmPaymentComponent
