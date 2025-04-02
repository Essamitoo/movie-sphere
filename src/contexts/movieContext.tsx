'use client'
import { createContext, useState, useContext } from 'react'
import { IMedia } from '@/interfaces/IMedia'
import { AuthContext } from './authContext'

interface ChildrenType {
	children: React.ReactNode
}

interface MoviesContextProps {
    favorites: IMedia[]
    views: IMedia[]
    list: IMedia[]
    addToFavorites: (movie: IMedia) => void
    removeFromFavorites: (movie: IMedia) => void
    addToViews: (movie: IMedia) => void
    removeFromViews: (movie: IMedia) => void
    addToList: (movie: IMedia) => void
    removeFromList: (movie: IMedia) => void
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined)

const MoviesProvider = ({ children }: ChildrenType) => {
    const { user } = useContext(AuthContext)
    const [favorites, setFavorites] = useState<IMedia[]>(user?.user.favorites || [])
    const [views, setViews] = useState<IMedia[]>(user?.user.views || [])
    const [list, setList] = useState<IMedia[]>(user?.user.list || [])

    const addToFavorites = (movie: IMedia) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites([...favorites, movie])
        }
    }

    const removeFromFavorites = (movie: IMedia) => {
        setFavorites(favorites.filter(fav => fav.id !== movie.id))
    }

    const addToViews = (movie: IMedia) => {
        if (!views.some(view => view.id === movie.id)) {
            setViews([...views, movie])
        }
    }

    const removeFromViews = (movie: IMedia) => {
        setViews(views.filter(view => view.id !== movie.id))
    }

    const addToList = (movie: IMedia) => {
        if (!list.some(item => item.id === movie.id)) {
            setList([...list, movie])
        }
    }

    const removeFromList = (movie: IMedia) => {
        setList(list.filter(item => item.id !== movie.id))
    }

    return (
        <MoviesContext.Provider value={{
            favorites,
            views,
            list,
            addToFavorites,
            removeFromFavorites,
            addToViews,
            removeFromViews,
            addToList,
            removeFromList
        }}>
            {children}
        </MoviesContext.Provider>
    )
}

export default MoviesProvider
