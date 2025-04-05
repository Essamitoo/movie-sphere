'use client'

import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { IUserSession } from '@/interfaces/IUser'
import { IMedia } from '@/interfaces/IMedia'
import { loginService } from '@/services/authServices'
import { IFormData } from '@/interfaces/IForm'

interface ChildrenType {
	children: React.ReactNode
}

interface AuthContextProps {
	user: IUserSession | null
	setUser: Dispatch<SetStateAction<IUserSession | null>>
	logout: () => void
	updateUserLists: (type: 'favorites' | 'views' | 'list', movie: IMedia) => void
	removeFromUserLists: (
		type: 'favorites' | 'views' | 'list',
		movie: IMedia
	) => void
	localLogin: (loginData: any) => Promise<void>
	googleLogin: () => void
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	setUser: () => {},
	logout: () => {},
	updateUserLists: () => {},
	removeFromUserLists: () => {},
	localLogin: async () => {},
	googleLogin: () => {},
})

const AuthProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState<IUserSession | null>(null)
	const { data: session } = useSession()

	// Normaliza los datos según el tipo de proveedor
	const normalizeUserData = (
		data: any,
		type: 'local' | 'google'
	): IUserSession => {
		if (type === 'local') {
			return {
				user: {
					id: data.user.id,
					name: data.user.name,
					email: data.user.email,
					password: data.user.password || '',
					image:
						'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
					account: 'free',
					role: 'user',
					favorites: [],
					reviews: [],
					views: [],
					list: [],
				},
				token: data.token,
				provider: 'local',
			}
		} else {
			return {
				user: {
					id: 'google_' + data.user.email, // usar el email como ID temporal
					name: data.user.name,
					email: data.user.email,
					password: '',
					image: data.user.image,
					account: 'free',
					role: 'user',
					favorites: [],
					reviews: [],
					views: [],
					list: [],
				},
				token: '',
				provider: 'google',
			}
		}
	}

	// Login local
	const localLogin = async (loginData: IFormData) => {
		try {
			console.log('Iniciando sesión local...')
			const response = await loginService(loginData)
			if (response.statusCode >= 400) throw new Error('Credenciales incorrectas')

			const userDefault = normalizeUserData(response, 'local')
			setUser(userDefault)
			localStorage.setItem('user', JSON.stringify(userDefault))
			console.log('Usuario local guardado:', userDefault)
		} catch (error) {
			console.error('Error en login local:', error)
			throw error
		}
	}

	// Login con Google
	const googleLogin = () => {
		console.log('Iniciando sesión con Google...')
		signIn('google')
	}

	// Escuchar cambios despues de el login con Google
	useEffect(() => {
		if (session?.user && !localStorage.getItem('user')) {
			const googleUserData = {
				user: {
					name: session.user.name || '',
					email: session.user.email || '',
					image: session.user.image || '',
				},
			}
			const userDefault = normalizeUserData(googleUserData, 'google')
			setUser(userDefault)
			localStorage.setItem('user', JSON.stringify(userDefault))
			console.log('Usuario de Google guardado:', userDefault)
		}
	}, [session])

	// Cargar usuario del localStorage

	useEffect(() => {

		const localUser = localStorage.getItem('user')
		if (localUser) {
			setUser(JSON.parse(localUser))
		}
	}, [])

	// Cerrar sesión

	const logout = () => {
		if (user?.provider === 'google') {
		  signOut({ callbackUrl: '/' }) // Cierra sesión de NextAuth
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
		const isDuplicate = user.user[type].some((m) => m.id === movie.id)
		if (isDuplicate) return

		const updatedUser = {
			...user,
			user: {
				...user.user,
				[type]: [...user.user[type], movie],
			},
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
			user: {
				...user.user,
				[type]: user.user[type].filter((item) => item.id !== movie.id),
			},
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
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider