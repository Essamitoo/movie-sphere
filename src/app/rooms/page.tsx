import RoomCard from "@/components/roomCard/RoomCard";
import { RoomsCard } from "@/interfaces/IRooms";
const userData:RoomsCard = {
    username: "Franco",
    image: "https://example.com/avatar.jpg",
    rol: "Admin",
    room: "The_Mandalorian",
    url_media: 'https://www.starwarsnewsnet.com/wp-content/uploads/2023/01/TheMandalorian_Poster_Season3.jpg'
  };
  
const RoomsPages:React.FC=()=>{
    return(
        <div className="bg-[#202020] max-h-max min-h-lvh pb-5 text-white pt-3">
            <RoomCard room={userData}/>
        </div>
    )
}
export default RoomsPages;