'use client'
import { useAuthContext } from '@/contexts/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
	children: React.ReactNode
}

const AuthProtected = ({ children }: Props) => {
	const { user, loading } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !user) {
			router.replace('/auth/login')
		}
	}, [user, router, loading])

	if (loading) return <p>Loading ...</p>
	if (!user) return null

	return <> {children}</>
}

export default AuthProtected
