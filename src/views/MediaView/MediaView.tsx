'use client'

import { formatearFecha, mediaInfo } from '@/utils/utils'
import { FaPlus, FaPlay, FaHeart } from 'react-icons/fa'
import { AuthContext } from '@/contexts/authContext'
import { useState, useContext } from 'react'
import Comment from '@/components/comment/Comment'
import StarRating from '@/components/starRating/StartRating'
import Reparto from '@/components/reparto/Reparto'
import Criticas from '@/components/criticas/Criticas'
import Trailer from '@/components/trailer/Trailer'
import { useParams } from 'next/navigation'
import { MoviesContext } from '@/contexts/movieContext'
import { IMedia } from '@/interfaces/IMedia'

const MediaPage = ({movie}: {movie:IMedia}) => {
    const params = useParams()
    const VIDEO_ID = 'Oh_B9Ejvn-8?si=5p_r5UFVH2z3BRP_'
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const {addToFavorites, addToList, addToViews, isInList, isFavorite } = useContext(MoviesContext)

    const id = Array.isArray(params.id) ? params.id[0] : params.id
    if (!id) return <p>Cargando...</p>

    return (
        <div className='max-h-max min-h-lvh pb-5 text-white flex flex-col items-center gap-6'>
            {open && <Trailer videoId={VIDEO_ID} open={open} setOpen={setOpen} />}
            <div className='bg-gradient-to-r from-black via-black/60 to-white/15 w-full h-[400px] absolute'></div>
            <img
                src={mediaInfo?.cover}
                alt='calamar-games'
                className='w-screen h-[400px]'
            />

            <div className='absolute top-[240px] left-8 flex gap-2'>
                <button
                    onClick={() => setOpen(true)}
                    className='bg-gray-300 font-medium text-black rounded-lg w-[150px] flex gap-1 p-2 hover:scale-105'
                >
                    <FaPlay size={15} /> TRAILER
                </button>
                <button
                    onClick={() => addToList(movie)}
                    className='border-2 border-gray-300 font-medium text-white text-sm rounded-lg w-[150px] flex gap-1 p-2 hover:scale-105'
                >
                     <FaPlus size={15} />
                    {isInList(movie) ? 'Agregada' : 'Agregar a la lista'} 
                </button>
            </div>

            <div className='w-[90%] border border-black h-[300px] mt-10 grid grid-cols-[20%_50%_30%] rounded-lg'>
                <img src={mediaInfo?.image} alt='' className='w-full h-[290px] p-2' />
                <div className='h-full text-black text-center flex flex-col justify-center gap-2'>
                    <h1 className='font-bold text-2xl'>{mediaInfo?.name}</h1>
                    <p className='text-gray-700 text-sm'>
                        Fecha de estreno: {formatearFecha(mediaInfo?.releaseDate)}
                    </p>
                    <p className='text-md'>Duración: {mediaInfo?.duration} min</p>
                    <p className='text-md'>
                        Serie: <span className='font-semibold'>{mediaInfo?.series}</span>
                    </p>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>{mediaInfo?.rating}</h3>
                        <StarRating rating={mediaInfo?.rating} />
                    </div>
                </div>
                <div className='text-black flex flex-col justify-around items-center'>
                    <button
                        onClick={() => addToFavorites(movie)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                            isFavorite(movie)
                                ? 'text-[#00A878] bg-black'
                                : 'text-white bg-gray-700/70'
                        }`}
                    >
                        <FaHeart size={20} />
                    </button>
                </div>
            </div>

            <Reparto />
            <h2 className='text-black font-semibold text-2xl'>
                Tu opinión nos importa, compártela aquí.
            </h2>
            <Comment img={user?.user.image || ''} name={user?.user.name || ''} />
            {mediaInfo?.reviews?.map((item, index) => (
                <Criticas key={index} {...item} />
            ))}

            <div className='flex flex-col justify-center gap-4'>
                <p className='text-black text-xl font-semibold'>
                    Películas y series similares
                </p>
                <div className='grid grid-cols-4 gap-4'>
                    {mediaInfo?.suggestions?.map((item, index) => (
                        <img
                            key={index}
                            className='w-[180px] h-[250px] rounded-lg'
                            src={item.img}
                            alt='image'
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MediaPage


