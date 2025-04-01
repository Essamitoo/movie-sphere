import { formatearFecha } from "@/utils/utils";
import StarRating from "../starRating/StartRating";
import { Review } from "@/interfaces/IMedia";

const Criticas=({userImg,userName,reviewCount,comment,rating,date}:Review)=>{
 return(
    <div className="w-[60%] h-[200px] text-black grid grid-cols-[20%_80%]">
        <div className="flex flex-col items-center">
            <img src={userImg} alt="" className="w-12 h-12 rounded-full"/>
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-xs">{reviewCount} Reseñas</p>
        </div>
        <div className="flex flex-col shadow-sm shadow-gray-900 h-[200px] bg-gray-100/40">
        <div className="flex justify-around h-[40px] items-center">
        <StarRating  rating={rating}/>
        <p className="text-gray-700 text-sm">{formatearFecha(date)}</p>
        </div>
        <p className="text-sm text-center">{comment}</p>
        </div>
    </div>
 )
}
export default Criticas;