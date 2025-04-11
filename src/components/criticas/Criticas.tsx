import { formatearFecha } from "@/utils/utils";
import StarRating from "../starRating/StartRating";
import { IReview } from "@/interfaces/IMedia";

const Criticas=({userImg,userName,reviewCount,comment,rating,date}:IReview)=>{
 return(
    <div className="w-full max-w-3xl mx-auto flex gap-4 p-4 bg-white/5 rounded-xl shadow-lg">
        
	{/* Usuario */}

	<div className="flex flex-col items-center w-[90px]">
		<img
			src={userImg}
			alt={userName}
			className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
		/>
		<p className="font-semibold text-sm mt-2 text-white text-center line-clamp-1">
			{userName}
		</p>
		<p className="text-xs text-gray-400">{reviewCount} Reseñas</p>
	</div>

	{/* Comentario */}
    
	<div className="flex flex-col justify-between flex-1 bg-gray-100/10 p-4 rounded-lg backdrop-blur-sm border border-gray-800">
		<div className="flex items-center justify-between text-sm text-gray-300 mb-2">
			<StarRating rating={rating} />
			<p className="text-gray-500">{formatearFecha(date)}</p>
		</div>
		<p className="text-sm text-white text-pretty">{comment}</p>
	</div>
</div>

 )
}
export default Criticas;