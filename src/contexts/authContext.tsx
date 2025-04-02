'use client'
import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react'
import { IUserSession } from '@/interfaces/IUser'

interface ChildrenType {
	children: React.ReactNode
}

interface AuthContextProps {
	user: IUserSession | null
	setUser: Dispatch<SetStateAction<IUserSession | null>>
	logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	setUser: () => {},
	logout: () => {},
})

const AuthProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState<IUserSession | null>(null)

	// Guarda el usuario en el localStorage

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
		}
	}, [user])

	// Carga al usuario desde localStorage

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user')!)
		setUser(localUser)
	}, [])

	// Elimina al usuario del localStorage

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
