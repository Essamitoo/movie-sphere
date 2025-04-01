'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { mediaList} from "@/utils/utils"; 
import { IMedia } from "@/interfaces/IMedia";
interface ListSearchProps {
  text: string;
  setTextSearch: (value: string) => void; 
}

const ListSearch: React.FC<ListSearchProps> = ({ text, setTextSearch }) => {
  const [product, setProduct] = useState<IMedia[]>([]);
  const [filter, setFilter] = useState<IMedia[]>([]);
  const router = useRouter();

 
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(()=>setProduct(mediaList));
  }, []);

  useEffect(() => {
    if (text) {
      setFilter(
        product.filter(
          (item) =>
            item.title.toLowerCase().includes(text.toLowerCase()) 
        )
      );
    }
  }, [text, product]);

  const handleClick = (id: string) => {
    router.push(`/media/1`);
    setTextSearch(""); 
  };

  return (
    <>
      {filter.length > 0 && (
        <button className="bg-white font-semibold border border-blue-800  z-[12] text-black flex absolute w-[30%] mt-[38px]"
          onClick={() => handleClick(`${filter[0].id}`)} >
          <img className="w-[50px] h-[50px]" src={filter[0].image} alt="" />
          <p className="pl-[30px]">{filter[0].title}</p>
        </button>
      )}
    </>
  );
};

export default ListSearch;
