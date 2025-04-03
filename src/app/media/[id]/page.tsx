import { IMedia } from '@/interfaces/IMedia'
import { getMovies } from '@/services/movieServices'
import MediaPage from '@/views/MediaView/MediaView'
import React from 'react'

const Media = () => {
	const movie: IMedia[] = getMovies()
  return (
	<MediaPage movie={movie}></MediaPage>
  )
}

export default Media