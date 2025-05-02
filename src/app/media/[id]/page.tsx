import { getMovie } from '@/services/movieServices';
import { use } from 'react';
import MediaView from '@/views/MediaView/MediaView';



const Media = ({ params }: { params: Promise<{ id: string }> }) => {
	const {id} =  use(params)
	const movie = getMovie(Number(id))

	if (!movie) {
		return <p>Película no encontrada</p>
	}

	return <MediaView movie={movie} movieCard={movie} />
}



export default Media;