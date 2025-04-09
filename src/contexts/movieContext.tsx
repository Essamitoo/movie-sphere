'use client'
import { createContext, useContext, useEffect,  } from 'react'
import { IMedia } from '@/interfaces/IMedia'
import { useAuthContext } from './authContext'

interface ChildrenType {
	children: React.ReactNode
}

interface MoviesContextProps {
	addToFavorites: (movie: IMedia) => void
	removeFromFavorites: (movie: IMedia) => void
	addToViews: (movie: IMedia) => void
	removeFromViews: (movie: IMedia) => void
	addToList: (movie: IMedia) => void
	removeFromList: (movie: IMedia) => void
	isMovieInUserList: (
		type: 'favorites' | 'views' | 'list',
		movie: IMedia
	) => boolean
    isFavorite: (movie: any) => boolean
    isViewed: (movie: any) => boolean
    isInList: (movie: any) => boolean
}

const MoviesContext = createContext<MoviesContextProps>({
	addToFavorites: () => {},
	removeFromFavorites: () => {},
	addToViews: () => {},
	removeFromViews: () => {},
	addToList: () => {},
	removeFromList: () => {},
	isMovieInUserList: () => false,
    isFavorite: () => false,
    isViewed: () => false,
    isInList: () => false,
})

const MoviesProvider = ({ children }: ChildrenType) => {
	const { user, updateUserLists, removeFromUserLists } = useAuthContext()

	const isMovieInUserList = (
		type: 'favorites' | 'views' | 'list',
		movie: any
	): boolean => {
		if (!user?.[type]) return false
		return user?.[type].some((item: any) => item.id === movie.id)
	}

    useEffect(() => {
        
    })

	const addToFavorites = (movie: IMedia) => {
        if(!isMovieInUserList('favorites', movie)) {

            updateUserLists('favorites', movie)
            alert('Película añadida a favoritos')

        } else alert('Ya tienes esta película en favoritos')
        
	}

	const addToViews = (movie: IMedia) => {
        if(!isMovieInUserList('views', movie)) {
            updateUserLists('views', movie)
            alert('Película añadida a vistas')

        } else alert('La pelicula ya esta en vistas')
	}

	const addToList = (movie: IMedia) => {
        if(!isMovieInUserList('list', movie)) {
            updateUserLists('list', movie)
            alert('Película añadida a la lista')

        } else alert('La pelicula ya esta en la lista')
	}

	const removeFromFavorites = (movie: IMedia) => {
		removeFromUserLists('favorites', movie)
	}

	const removeFromViews = (movie: IMedia) => {
		removeFromUserLists('views', movie)
	}

	const removeFromList = (movie: IMedia) => {
		removeFromUserLists('list', movie)
	}

	// Variables para estilos condicionales

    const isFavorite = (movie: IMedia) => isMovieInUserList('favorites', movie);
    const isViewed = (movie: IMedia) => isMovieInUserList('views', movie);
    const isInList = (movie: IMedia) => isMovieInUserList('list', movie);

	return (
		<MoviesContext.Provider
			value={{
				addToFavorites,
				removeFromFavorites,
				addToViews,
				removeFromViews,
				addToList,
				removeFromList,
				isMovieInUserList,
                isFavorite,
                isViewed,
                isInList,
			}}
		>
			{children}
		</MoviesContext.Provider>
	)
}

export const useMovieContext = () => {
	return useContext(MoviesContext)
}

export default MoviesProvider
