"use client";
import { IMedia } from "@/interfaces/IMedia";
import Link from "next/link";
import { useState,useEffect } from "react";
import { FaStar, FaHeart, FaPlay } from "react-icons/fa";
import { useAuth } from "@/store/useAuth";

const Card: React.FC<IMedia> = ({ image, rate, title, id, califications, type }) => {
  const { data, setData } = useAuth();
  const [isInViews, setIsInViews] = useState(false);
const [isInFavorite, setIsInFavorite] = useState(false);
const [isInList, setIsInList] = useState(false);

useEffect(() => {
  if (!data || !id) return;
  setIsInViews(data.views?.includes(id.toString()) || false);
  setIsInFavorite(data.favorites?.includes(id.toString()) || false);
  setIsInList(data.list?.includes(id.toString()) || false);
}, [data, id]); 

  const addList = () => {
    if(!isInList){
      setData({
        list: [...(data?.list || []), id.toString()]
      });
    }
    else{
      const newList = data?.list?.filter(item => item !== id.toString())|| [];
      setData({
          list: newList 
      });
    }
};

  
const toggleFavorite = () => {
  if (!isInFavorite) {
    setData({
      favorites: [...(data?.favorites || []), id.toString()],
    });
  } else {
    const newFavorites = data?.favorites?.filter(item => item !== id.toString()) || [];
    setData({
      favorites: newFavorites,
    });
  }
};

  

  return (
    <div className={`rounded-xl border h-[350px] m-4 p-1 flex flex-col items-center hover:scale-102 hover:cursor-pointer hover:border-[#00A878] w-[240px] ${isInViews ? "border-[#00A878] bg-[#00A878]/10" : "border-slate-400/40"}`}>
      <p className={`absolute w-[80px] text-center ml-[-150px] ${type === "movie" ? "bg-blue-800" : "bg-green-800"}`}>{type === "movie" ? "Pelicula" : "Serie"}</p>
      <Link href={`/info/${id}`} className="rounded-xl h-[240px] w-full">
        <img src={image} className="rounded-xl h-[240px] w-full" alt={title} />
      </Link>
      <div onClick={toggleFavorite} className={`w-8 h-8 rounded-full ml-[190px] border absolute flex items-center justify-center ${isInFavorite ? "text-[#00A878] bg-[#00A878]/50" : "text-gray-200/40 bg-gray-700/70"}`}>
        <FaHeart size={20} />
      </div>
      <div className="flex items-center mt-2 text-sm">
        <FaStar size={14} className="text-yellow-300" />
        <p>{rate} ({califications} Criticas)</p>
      </div>
      <div className="absolute m-[100px] w-20 h-20 rounded-full border-4 border-gray-300/70 flex justify-center items-center">
        <FaPlay size={40} className="text-gray-300/70" />
      </div>
      <Link href={`/info/${id}`}>
        <p className="text-[#00A878] font-bold m-1">{title}</p>
      </Link>
      {!isInViews && (isInList ? (
        <button onClick={() => addList()} className="border border-[#00A878]/50 text-[#00A878] w-full rounded-sm hover:cursor-pointer bg-[#171717] h-[30px]">Agregada</button>
      ) : (
        <button onClick={() => addList()} className="border border-slate-100/50 w-full rounded-xl text-ms hover:cursor-pointer bg-[#171717]">+ Agregar a la lista</button>
      ))}
      {isInViews && <button className="bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] w-full rounded-sm hover:cursor-pointer bg-[#171717] h-[30px]">Vista</button>}
    </div>
  );
};

export default Card;
