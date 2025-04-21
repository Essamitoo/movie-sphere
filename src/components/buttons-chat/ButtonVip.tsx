"use client";
import {useState, useEffect, useRef } from "react";

interface ButtonVipProps {
  setCode: (code: string) => void;
  code:string;
}

const constminiaturas=[
  "https://th.bing.com/th/id/R.321f0a5cebe6b6868f0d5a90d19179a3?rik=nFCNpgg8Q0OP%2bA&riu=http%3a%2f%2fclarouche.be%2fwp-content%2fuploads%2f2016%2f11%2ffeu-dartifice-300x164.jpg&ehk=d1jvGWhereSNMf17mZ8L%2fGR6Nt%2fSkoK0s%2fSsHyC0qAA%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.Mu39eFMt4ekDbUkQWxvuVAHaGL?w=188&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th?q=Cositos+Juego+Del+Calamar+Tirar+Y+Atrapar&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247",
  "https://th.bing.com/th/id/OIP.aINGXsKmn7VdnMUtXKonqwAAAA?w=148&h=150&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th?q=Juego+Del+Calamar+2+Luz+Verde+Luz+Roja&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247",
  "https://th.bing.com/th/id/OIP.wryXethBxQw7B34HMiu5XgHaDh?w=276&h=166&c=7&r=0&o=5&pid=1.7",
  "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/09/mandalorian-2485773.jpg?tf=128x",
  "https://img.gta5-mods.com/q75-w100-h100-cfill/avatars/874537/f4ff3f-Baby%20Yoda.png",
  "https://swall.teahub.io/photos/small/232-2326855_dark-knight-wallpaper-desktop-batman.jpg",
  "https://tse2.mm.bing.net/th/id/OIP.9K5dfzS6XpuNFwhDvE001AAAAA?rs=1&pid=ImgDetMain",
  "https://i.imgflip.com/2/6hoalo.jpg",
  "https://th.bing.com/th/id/OIP.J_ibiwTDUzcCjhy-oJhQ3QHaE8?w=269&h=180&c=7&r=0&o=5&pid=1.7",
  "https://tse2.mm.bing.net/th/id/OIP.VMF-ftcyaXFVY685amaYlQHaEM?pid=ImgDet&w=188&h=106&c=7",
  "https://www.rebanando.com/cache/slideshow/2a/d5/0f/5b/got-1.jpg/2cb6823c975ee09b0d93e071c71c86d5.jpg",
  "https://th.bing.com/th/id/OIP.2r6UXX6gyEFztppwyxTOBQHaEK?w=271&h=180&c=7&r=0&o=5&pid=1.7",
  "https://www.hallofseries.com/wp-content/uploads/2019/09/Immagine-1.png",
  "https://th.bing.com/th/id/OIP.ZCpF3Xhvul1skh_wBij4owHaDt?w=340&h=175&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.3ZjVGVKRX6hAocSVMOH-BgHaEK?w=279&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.h0xy__566Fvdrt2uPV1oPwHaDt?w=318&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.T8GvK1OvpYOYBgcp7xbxXgHaEE?w=303&h=180&c=7&r=0&o=5&pid=1.7",
  "https://tse3.mm.bing.net/th/id/OIP.4jQy95KYy3VJGbYlsFi8MgAAAA?pid=ImgDet&w=188&h=105&c=7",
  "https://i.ytimg.com/vi/fj-F-qg4Pm4/hqdefault.jpg",
  "https://tse4.mm.bing.net/th/id/OIP.vQ6OAlMKojjOAk8QS3A3wwHaFj?pid=ImgDet&w=188&h=141&c=7",
  "https://th.bing.com/th/id/OIP._-NOMkw9g1MJ85BzaN6_0gHaHK?w=174&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.XIY16AK7S0xDOUwPzNwzgAHaEK?w=322&h=181&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.0nHiNkhkGXDRvc1vHIEtvwHaEK?w=298&h=180&c=7&r=0&o=5&pid=1.7"
  ]

  const ButtonVip: React.FC<ButtonVipProps> = ({ setCode,code}) => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
  
    const handleClick = (code: string) => {
      setCode(code);
      setMenu(false);
    };
  
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenu(false);
        }
      };
      if (menu) document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [menu]);
  
    return (
      <div className="inline-block" ref={menuRef}>
        {menu && (
          <div className="absolute ml-[-50px] top-[45vh] overflow-y-scroll h-[150px]">
            <div className="bg-black/70 px-2 py-1 rounded shadow w-80 grid grid-cols-3 gap-2 h-auto">
              {constminiaturas.map((item, index) => (
                <button key={index} onClick={() => handleClick(index.toString())} className="w-21 h-16 border-2 border-white/70 rounded hover:cursor-pointer hover:scale-105" >
                  <img
                    src={item}
                    alt={`vip-${index}`}
                    className="w-20 h-15 object-cover rounded"
                  />
                  <p className="absolute ml-[30px] mt-[-40px]">GIF</p>
                </button>
              ))}
            </div>
          </div>
        )}
        {code===""?<button
          onClick={() => setMenu(!menu)}
          className="bg-yellow-500 px-2 py-1 rounded hover:cursor-pointer text-black"
        >
          ⭐VIP⭐
        </button>:<button onClick={() => handleClick("")} className="w-21 h-16 border-2 border-white/70 rounded hover:cursor-pointer hover:scale-105" >
                  <img
                    src={constminiaturas[Number(code)]}
                    className="w-20 h-15 object-cover rounded"
                  />
                  <p className="absolute ml-[30px] mt-[-40px]">GIF</p>
                </button>}
      </div>
    );
  };
  export default ButtonVip;