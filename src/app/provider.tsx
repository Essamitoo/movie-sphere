import AuthProvider from '@/contexts/authContext'
import MoviesProvider from '@/contexts/movieContext'
import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<MoviesProvider>
        {children}
      </MoviesProvider>
		</AuthProvider>
	)
}

export default Provider
