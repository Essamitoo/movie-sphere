"use client";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";

 const Search=()=> {
  const [search, setSearch] = useState("");

  return (
    <div className="w-[30%] flex items-center h-[37px] border border-b-gray-300/70 rounded-lg">
      <FaSearch size={20} className="text-gray-500 font-light p-1 relative w-[30px]" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="w-full p-2 focus:outline-none focus:ring-0"
      />
      {search && (
        <FaTimes
          size={20}
          className="relative text-gray-500 cursor-pointer w-[30px] p-1"
          onClick={() => setSearch("")}
        />
      )}
    </div>
  );
}
export default Search;