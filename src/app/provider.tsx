'use client'
import AuthProvider from '@/contexts/authContext'
import MoviesProvider from '@/contexts/movieContext'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<AuthProvider>
				<MoviesProvider>{children}</MoviesProvider>
			</AuthProvider>
		</SessionProvider>
	)
}

export default Provider
