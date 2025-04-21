'use client'

import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { IUser } from '@/interfaces/IUser'
import { IMedia } from '@/interfaces/IMedia'
import { loginService } from '@/services/authServices'
import { IFormData } from '@/interfaces/IForm'

interface ChildrenType {
	children: React.ReactNode
}

interface AuthContextProps {
	user: IUser | null
	setUser: Dispatch<SetStateAction<IUser | null>>
	logout: () => void
	updateUserLists: (type: 'favorites' | 'views' | 'list', movie: IMedia) => void
	removeFromUserLists: (
		type: 'favorites' | 'views' | 'list',
		movie: IMedia
	) => void
	localLogin: (loginData: any) => Promise<void>
	googleLogin: () => void
	loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	setUser: () => {},
	logout: () => {},
	updateUserLists: () => {},
	removeFromUserLists: () => {},
	localLogin: async () => {},
	googleLogin: () => {},
	loading: true,
})

const AuthProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState<IUser | null>(null)
	const { data: session } = useSession()
	const [loading, setLoading] = useState(true)

	// Normaliza los datos según el tipo de proveedor

	const normalizeUserData = (data: any, type: 'local' | 'google'): IUser => {
		
		if (type === 'local') {
			return {
				id: data.id, 
				name: data.name,
				email: data.email,
				avatar:
					data.avatar ||
					'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', // Imagen por defecto
				account: 'free',
				role: data.role,
				favorites: [],
				reviews: [],
				views: [],
				list: [],
				avatar_token: data.avatar_token || '', 

				token: data.access_token,
				provider: 'local',
			}
		} else {
			return {
				id: 'google_' + data.email,
				name: data.name,
				email: data.email,
				avatar:
					data.image ||
					'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
				account: 'free',
				role: data.role,
				favorites: [],
				reviews: [],
				views: [],
				list: [],
				avatar_token: data.token_avatar || '',

				token: data.token,
				provider: 'google',
			}
		}
	}

	// Login local
	const localLogin = async (loginData: IFormData) => {
		try {
			const response = await loginService(loginData)
			if (response.statusCode >= 400)
				throw new Error('Credenciales incorrectas')

			const userDefault = normalizeUserData(response, 'local')
			setUser(userDefault)
			localStorage.setItem('user', JSON.stringify(userDefault))
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	// Login con Google
	const googleLogin = () => {
		console.log(session)
		signIn('google', {
			callbackUrl: '/home',
		})
	}

	// Escuchar cambios despues de el login con Google

	useEffect(() => {
		if (session?.user && !localStorage.getItem('user')) {
			const googleUserData = {
				name: session.user.name || '',
				email: session.user.email || '',
				image: session.user.image || '',
			}
			console.log(googleUserData)

			const userDefault = normalizeUserData(googleUserData, 'google')
			setUser(userDefault)
			localStorage.setItem('user', JSON.stringify(userDefault))
		}
	}, [session])

	// Cargar usuario del localStorage

	useEffect(() => {
		const localUser = localStorage.getItem('user')
		if (localUser) {
			setUser(JSON.parse(localUser))
		}

		setLoading(false)
	}, [])

	// Cerrar sesión

	const logout = () => {
		if (user?.provider === 'google') {
			signOut() // Cierra sesión de NextAuth
		}

		setUser(null)
		localStorage.removeItem('user')
	}

	// Agregar película

	const updateUserLists = (
		type: 'favorites' | 'views' | 'list',
		movie: IMedia
	) => {
		if (!user) return
		const isDuplicate = user[type].some((m) => m.id === movie.id)
		if (isDuplicate) return

		const updatedUser = {
			...user,
			[type]: [...user[type], movie],
		}
		setUser(updatedUser)
		localStorage.setItem('user', JSON.stringify(updatedUser))
	}

	// Eliminar película

	const removeFromUserLists = (
		type: 'favorites' | 'views' | 'list',
		movie: IMedia
	) => {
		if (!user) return
		const updatedUser = {
			...user,
			[type]: user[type].filter((item) => item.id !== movie.id),
		}
		setUser(updatedUser)
		localStorage.setItem('user', JSON.stringify(updatedUser))
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				logout,
				updateUserLists,
				removeFromUserLists,
				localLogin,
				googleLogin,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}

export default AuthProvider
