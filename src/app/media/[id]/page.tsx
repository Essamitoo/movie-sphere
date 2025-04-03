import { getMovie } from '@/services/movieServices';
import MediaView from '@/views/MediaView/MediaView';

interface MediaProps {
	params: { id: string };
}

const Media = ({ params}: MediaProps) => {
	const id = params.id;
	const movie = getMovie(Number(id));
  
	if (!movie) {
	  return <p>Película no encontrada</p>;
	}
  
	return <MediaView movie={movie} />;
};

export default Media;