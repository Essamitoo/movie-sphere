'use client'
import { formatearFecha, mediaInfo } from '@/utils/utils'
import { FaPlus, FaPlay,FaHeart  } from 'react-icons/fa'
import { useAuth } from '@/store/useAuth'
import { useState, useEffect } from 'react'
import Comment from '@/components/comment/Comment'
import StarRating from '@/components/starRating/StartRating'
import Reparto from '@/components/reparto/Reparto'
import Criticas from '@/components/criticas/Criticas'
import Trailer from '@/components/trailer/Trailer'
interface MediaPageProps {
	params: { id: string };
  }
  
  const MediaPage: React.FC<MediaPageProps> = ({ params }) => {
	const VIDEO_ID="Oh_B9Ejvn-8?si=5p_r5UFVH2z3BRP_"
	const { data, setData } = useAuth()
	const [isInViews, setIsInViews] = useState(false)
	const [isInFavorite, setIsInFavorite] = useState(false)
	const [isInList, setIsInList] = useState(false)
	const [open,setOpen]=useState(false)
	if (!params || !params.id) return <p>Cargando...</p>;
	useEffect(() => {
		if (!data || !params.id) return
		setIsInViews(data.views?.includes(params.id) || false)
		setIsInFavorite(data.favorites?.includes(params.id) || false)
		setIsInList(data.list?.includes(params.id) || false)
	}, [data, params.id])

	const toggleFavorite = () => {
		if (!isInFavorite) {
			setData({
				favorites: [...(data?.favorites || []), params.id],
			})
		} else {
			const newFavorites =
				data?.favorites?.filter((item) => item !== params.id) || []
			setData({
				favorites: newFavorites,
			})
		}
	}
	const addList = () => {
		if (!isInList) {
			setData({
				list: [...(data?.list || []), params.id],
			})
		} else {
			const newList = data?.list?.filter((item) => item !== params.id) || []
			setData({
				list: newList,
			})
		}
	}
	return (
		<div className=' max-h-max min-h-lvh pb-5 text-white flex flex-col items-center gap-6'>
			{open && <Trailer videoId={VIDEO_ID} open={open} setOpen={setOpen} />}
			<div className='bg-gradient-to-r from-[#000000] via-[#000000]/60 to-[#ffffff]/15 w-full h-[400px] z-2 absolute'></div>
			<img src={mediaInfo.cover} alt='' className='w-screen h-[400px]' />
			<div className='z-3 absolute top-[240px] left-8 flex justify-center items-center gap-2'>
				<button className='bg-[#d0d0d0] font-medium text-black rounded-lg w-[150px] flex justify-center items-center gap-1 p-2 hover:cursor-pointer hover:scale-105'>
					<FaPlay size={15} />
					TRAILER
				</button>
				<button className='border-2 border-[#d0d0d0] font-medium text-white text-sm rounded-lg w-[150px] flex justify-center items-center gap-1 p-2 hover:cursor-pointer hover:scale-105'>
					<FaPlus size={15} />
					Agregar a la lista
				</button>
			</div>
			<div className="flex justify-center z-3 absolute top-[300px] w-full gap-8">
			<button onClick={()=>setOpen(true)} className='flex justify-center gap-2 hover:cursor-pointer hover:scale-105 p-1 border-2 rounded-xl'>
				<img src={mediaInfo.trailers[0].img} alt="" className='w-30 h-30 rounded-lg'/>
			<div className='absolute m-4 w-20 h-20 rounded-full border-4 border-white/80 flex justify-center items-center'>
				<FaPlay size={40} className='text-white/80' />
			</div>
			</button><button onClick={()=>setOpen(true)} className='flex justify-center gap-2 hover:cursor-pointer hover:scale-105 p-1 border-2 rounded-xl'>
				<img src={mediaInfo.trailers[0].img} alt="" className='w-30 h-30 rounded-lg'/>
			<div className='absolute m-4 w-20 h-20 rounded-full border-4 border-white/80 flex justify-center items-center'>
				<FaPlay size={40} className='text-white/80' />
			</div>
			</button><button onClick={()=>setOpen(true)} className='flex justify-center gap-2 hover:cursor-pointer hover:scale-105 p-1 border-2 rounded-xl'>
				<img src={mediaInfo.trailers[0].img} alt="" className='w-30 h-30 rounded-lg'/>
			<div className='absolute m-4 w-20 h-20 rounded-full border-4 border-white/80 flex justify-center items-center'>
				<FaPlay size={40} className='text-white/80' />
			</div>
			</button>
			</div>
			<div className='w-[90%] border border-black h-[300px] mt-[5%] grid grid-cols-[20%_50%_30%] rounded-lg'>
				<div className=''>
					<img src={mediaInfo.image} alt='' className='w-full h-[290px] p-2' />
				</div>
				<div className=' h-full text-black text-center flex flex-col justify-center gap-2'>
					<h1 className='font-bold text-2xl'>{mediaInfo.name}</h1>
					<p className='text-gray-700 text-sm'>
						Fecha de estreno: {formatearFecha(mediaInfo.releaseDate)}
					</p>
					<p className='text-md'>Duracion: {mediaInfo.duration} min</p>
					<p className='text-md'>
						Serie:<span className='font-semibold'>{mediaInfo.series}</span>
					</p>
					<div className='flex flex-col justify-center items-center'>
						<h3 className=''>{mediaInfo.rating}</h3>
						<StarRating rating={mediaInfo.rating} />
					</div>
				</div>
				<div className='text-black flex flex-col justify-around items-center'>
					<button
						onClick={() => toggleFavorite()}
						className={`w-10 h-10 rounded-full border border-black flex items-center justify-center ${
							isInFavorite
								? 'text-[#00A878] bg-black'
								: 'text-white bg-gray-700/70'
						}`}
					>
						<FaHeart size={20} />
					</button>
					{!isInViews &&
						(isInList ? (
							<button
								onClick={() => addList()}
								className='border border-[#00A878]/50 text-[#00A878] w-[200px] rounded-sm hover:cursor-pointer bg-[#171717] h-10'
							>
								Agregada
							</button>
						) : (
							<button
								onClick={() => addList()}
								className='border border-slate-100/50 w-[200px] rounded-sm text-ms hover:cursor-pointer bg-[#171717] text-white h-10'
							>
								Agregar a la lista
							</button>
						))}
				</div>
			</div>
			<Reparto />
            <h2 className='text-black font-semibold text-2xl'>Tu opinion nos importa,compartela aqui.</h2>
			<Comment img={data?.image||""} name={data?.name||""} />
			{mediaInfo?.reviews?.map((item, index) => (
				<Criticas key={index} {...item} />
			))}
            <div className='flex flex-col justify-center gap-4'>
            <p className='text-black text-xl font-semibold relative'>Peliculas y series similares</p>
            <div className="grid grid-cols-4 gap-4">
            {mediaInfo?.suggestions?.map((item, index) => (
                <div key={index}>
                    <img className='w-[180px] h-[250px] rounded-lg' src={item.img} alt="" />
                </div>
			))}
            </div>
            </div>
			{params.id && params.id}
		</div>
	)
}
export default MediaPage
