"use client"
import { useState } from "react";

const ButtonVip: React.FC = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="relative inline-block">
      {menu && (
        <div className="absolute bottom-full left-[-50px] mb-2 bg-white text-black px-2 py-1 rounded shadow h-30 w-80 grid grid-cols-3">
          <button><img src="https://th.bing.com/th/id/R.321f0a5cebe6b6868f0d5a90d19179a3?rik=nFCNpgg8Q0OP%2bA&riu=http%3a%2f%2fclarouche.be%2fwp-content%2fuploads%2f2016%2f11%2ffeu-dartifice-300x164.jpg&ehk=d1jvGWhereSNMf17mZ8L%2fGR6Nt%2fSkoK0s%2fSsHyC0qAA%3d&risl=&pid=ImgRaw&r=0" alt="" className="w-12 h-12"/></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      )}
      <button
        onClick={() => setMenu(!menu)}
        className="bg-black text-yellow-500 px-2 py-1 rounded hover:cursor-pointer"
      >
        ⭐VIP⭐
      </button>
    </div>
  );
};

export default ButtonVip;
