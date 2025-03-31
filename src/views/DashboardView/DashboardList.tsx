'use client'
import { getMovies } from "@/services/movieServices"
import { useAuth } from "@/store/useAuth"

const DashboardList = () => {
 const { data } = useAuth()
 
    const getFavoriteMovies = () => {
        const movies = getMovies()
        const favMovies = movies.filter((movie) =>
            data?.favorites?.includes(String(movie.id))
        )
        return favMovies
    }
 
     const favoriteMovies = getFavoriteMovies()
 
    return (
        <div>
            <p>Peliculas favoritas:</p>
            <div>
                {favoriteMovies.map((movie) => (
                     <div key={movie.id}>
                         <p>{movie.title}</p>
                         <p>{movie.genre}</p>
                     </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardList