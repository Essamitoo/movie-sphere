import Search from "@/components/search/Search"
import Link from "next/link";

const Header=()=>{
    return(
        <div className="w-[100%] h-[70px] bg-[#171717] flex justify-around items-center text-white">
            <Link href="/home" className="flex w-[20%]">
                <img src="https://res.cloudinary.com/dpyotudkz/image/upload/v1743098027/2082059f-cf96-4dad-aebf-e219a93a9c74.png" alt="" />
                <h3 className="bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] bg-clip-text text-transparent text-xl font-bold ">MOVIE SPHERE</h3>
            </Link>
            <Search/>
            <div className="flex flex-col w-[25%]">
            <Link href="/chat" className="text-md bg-gradient-to-r from-[#F1FDFA] via-[#c5c7c7] to-[#313131] bg-clip-text text-transparent flex justify-items-end ml-[60%]">Salas de Chat  <span className="text-[8px] text-green-400">🟢</span></Link>
            <div className="flex justify-around">
                <Link href="/home" className="bg-gradient-to-b from-[#F1FDFA]  to-[#aaaaaa] bg-clip-text text-transparent text-lg font-bold ">Inicio</Link>
                <Link href="/series" className="bg-gradient-to-b from-[#F1FDFA]  to-[#aaaaaa] bg-clip-text text-transparent text-lg font-bold ">Noticias</Link>
                <Link href="/popular" className="bg-gradient-to-b from-[#F1FDFA]  to-[#aaaaaa] bg-clip-text text-transparent text-lg font-bold ">Popular</Link>
                <Link href="/estrenos" className="bg-gradient-to-b from-[#F1FDFA] to-[#aaaaaa] bg-clip-text text-transparent text-lg font-bold ">Estrenos</Link>
            </div>
            </div>
            <Link href="/auth/login" className="bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] w-[120px] h-[30px] p-1 rounded-xl font-bold text-md mt-2 text-center hover:scale-105">Ingresar</Link>
        </div>
    )
}
export default Header;