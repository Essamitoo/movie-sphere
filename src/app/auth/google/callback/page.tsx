'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '@/contexts/authContext'

const GoogleCallback = () => {
	const router = useRouter()
	const { setUser } = useAuthContext()
	const searchParams = useSearchParams()

	useEffect(() => {
		// Read user info from query params
		const email = searchParams.get('email')
		const role = searchParams.get('role')
		const avatar = searchParams.get('avatar')
		const name = searchParams.get('name')
		const access_token = searchParams.get('access_token')

		if (email && role && avatar && name && access_token) {
			const user = {
				email,
				role,
				avatar,
				name,
				access_token,
				id: '',
				avatar_token: '',
				account: '',
				token: '',
				provider: '',
				favorites: [],
				reviews: [],
				views: [],
				list: [],
			}
			localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
			// router.push('/home')
		} else {
			router.push('/auth/login')
		}
	}, [router, setUser, searchParams])

	router.replace('/home')

	return (
		<div className='text-center mt-10 text-lg text-white'>
			Iniciando sesión con Google...
		</div>
	)
}

export default GoogleCallback
