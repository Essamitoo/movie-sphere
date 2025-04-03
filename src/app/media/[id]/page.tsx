import { getMovie } from '@/services/movieServices';
import MediaView from '@/views/MediaView/MediaView';

const Media = ({ params }: { params: { id: string } }) => {
	const id = Number(params.id);
	const movie = getMovie(id);
  
	if (!movie) {
	  return <p>Película no encontrada</p>;
	}
  
	return <MediaView movie={movie} />;
};

export default Media;