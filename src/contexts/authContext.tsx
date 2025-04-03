'use client'
import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react'
import { IUserSession } from '@/interfaces/IUser'
import { IMedia } from '@/interfaces/IMedia'
import { MoviesContext } from './movieContext'

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
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	setUser: () => {},
	logout: () => {},
	updateUserLists: () => {},
	removeFromUserLists: () => {},
})

const AuthProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState<IUserSession | null>(null)

	// Guarda el usuario en el localStorage cada vez que el user se actualiza

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
		}
	}, [user])

	// Carga al usuario desde localStorage

	useEffect(() => {
		const localUser = localStorage.getItem('user')
		if (localUser) {
			const parsedUser: IUserSession = JSON.parse(localUser)
			// Asegurar que los arrays siempre sean válidos y valores por defecto 
			const sanitizedUser = {
				...parsedUser,
				user: {
					...parsedUser.user,
					favorites: parsedUser.user.favorites || [],
					views: parsedUser.user.views || [],
					list: parsedUser.user.list || [],
					image: '../assets/default-avatar-user.webp',
					account: parsedUser.user.account || 'Free',
					role: parsedUser.user.role || 'User',
					reviews: parsedUser.user.reviews || [],
				},
			}
			setUser(sanitizedUser)
		}
	}, [])

	// Función para agregar y actualizar las películas agregadas en las listas del usuario

	const updateUserLists = (
		type: 'favorites' | 'views' | 'list',
		movie: any
	) => {
		if (!user) return

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

	//Funcion para remover y actualizar las películas eliminadas en las listas del usuario

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

	// Elimina al usuario del localStorage

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider
			value={{ user, setUser, logout, updateUserLists, removeFromUserLists }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
