'use client'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const DashboardList = () => {
  const { user } = useContext(AuthContext)

  // Accede directamente a las películas favoritas del usuario
  const favoriteMovies = user?.user?.favorites || []

  return (
    <div>
      <p>Películas favoritas:</p>
      <div>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div key={movie.id}>
              <p>{movie.title}</p>
              <p>{movie.genre}</p>
            </div>
          ))
        ) : (
          'No hay películas favoritas'
        )}
      </div>
    </div>
  )
}

export default DashboardList
