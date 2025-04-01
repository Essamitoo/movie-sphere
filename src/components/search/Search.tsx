"use client";
import { useState } from "react";
import Link from "next/link";
import ListSearch from "@/components/listsearch/ListSearch";
import { FaSearch, FaTimes } from "react-icons/fa";

 const Search=()=> {
    const [textSearch, setTextSearch] = useState("");
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextSearch(e.target.value);
    };

  return (
    <div className="w-[30%] flex flex-col">
    <div className="w-full flex items-center h-[37px] border border-b-gray-300/70 rounded-lg">
       <Link href={`/search/${textSearch}`} onClick={()=>setTextSearch("")} className="btn-search h-[33px] w-[40px] flex justify-center items-center">
       <FaSearch size={20} className="text-gray-500 font-light p-1 relative w-[30px]" />
       </Link>    
      <input
        type="text"
        onChange={handleChangeSearch}
        value={textSearch}
        placeholder="Buscar..."
        className="w-full p-2 focus:outline-none focus:ring-0"
      />
      {textSearch.length>0 && (
        <FaTimes
          size={20}
          className="relative text-gray-500 cursor-pointer w-[30px] p-1"
          onClick={() => setTextSearch("")}
        />
      )}
    </div>
      {textSearch.length > 0 && (
        <ListSearch text={textSearch} setTextSearch={setTextSearch} />
      )}
    </div>
  );
}
export default Search;