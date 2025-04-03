"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Card from "@/components/card/Card";
import {mediaList} from "@/utils/utils";
import { IMedia } from "@/interfaces/IMedia";

const Search: React.FC = () => {
  const { name } = useParams<{ name: string }>(); 
  const [media, setProduct] = useState<IMedia[]>([]);
  const [filter, setFilter] = useState<IMedia[] | null>(null);

  useEffect(() => {
    if (name && media.length > 0) {
      setFilter(
        media.filter(
          (item) =>
            item.title.toLowerCase().includes(name.toLowerCase()) 
        )
      );
    }
  }, [name,media]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(mediaList));
  }, []);


  return (
		<div className='bg-[#202020] max-h-max min-h-lvh pb-5 text-white'>
			{filter && (
				<p className='ml-[2%] p-1 font-semibold font-second text-1xl'>
					Resultados de la búsqueda {`"${name}"`} ({filter.length} Resultados)
				</p>
			)}
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 m-2 gap-6'>
				{filter?.map((movie) => (
					<Card key={movie.id} {...movie} movie={movie}/>
				))}
			</div>
		</div>
	)
};

export default Search;

