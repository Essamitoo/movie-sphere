import { IMedia } from "@/interfaces/IMedia";
import { mediaList } from "@/utils/utils"

export const getMovies = () => {
    const movies: IMedia[] = mediaList
    return movies
}

export const getMovie = (id: number) => {
    const movies = getMovies();
    const movie = movies.find((movie) => movie.id === id); 
    return movie;
  };
  