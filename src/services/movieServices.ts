import {IMediaPage } from "@/interfaces/IMedia";
import { mediaInfo } from "@/utils/mediaInfo";

export const getMovies = () => { 
    const movies: IMediaPage[] = mediaInfo
    return movies
}

export const getMovie = (id: number) => {
    const movies = getMovies();
    const movie = movies.find((movie) => movie.id === id); 
    return movie;
  };
  