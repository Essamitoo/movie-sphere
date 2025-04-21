"use client";
import "@/styles/globals.css"
import RoomCard from "@/components/roomCard/RoomCard";
//import { RoomsCard } from "@/interfaces/IRooms";
import io, { Socket } from "socket.io-client";
import { useState, useEffect} from "react";
import Chat from "@/components/chat/Chat";
  import { useAuthContext } from "@/contexts/authContext";
interface CardsRooms {
  room:string;
  url_media: string;
  cover: string;
}
const userInfo = {
  username: "Franco",
  image: "https://th.bing.com/th/id/OIP.YoqbqWmGad0HqSkuML5cEQAAAA?rs=1&pid=ImgDetMain",
  rol: "Premium"
};
const roomsData:CardsRooms[] = [
  {
    room: "El_hoyo",
    url_media: "https://image.tmdb.org/t/p/original/yVPear63M3MRiDyrSf6wsFgzN3A.jpg",
    cover: "https://elfinalde.s3-accelerate.amazonaws.com/2020/03/7hQyopDwtmwVBQHHcj8l5hkcJLG-1024x576.jpg"
  },
  {
    room: "El_juego_del_calamar 2",
    url_media: "https://f.rpp-noticias.io/2024/11/27/1674491gdto4imwkaar6zmjpg.jpg",
    cover: "https://www.formulatv.com/images/articulos/123000/123353_MH5BckJ4Nxz8L3m0e9aFgoRPYvit6U72E-h2.jpg"
  },{
    room: "The_Mandalorian",
    url_media: "https://www.starwarsnewsnet.com/wp-content/uploads/2023/01/TheMandalorian_Poster_Season3.jpg",
    cover: "https://images.hdqwalls.com/download/the-mandalorian-tv-4k-0b-3840x2160.jpg"
  },
  {
    room: "The_Dark_Knight",
    url_media: "https://image.tmdb.org/t/p/original/r9BQs8VaMziqG2pVD7mcS3ORCWd.jpg",
    cover: "https://wallpaperaccess.com/full/2664063.jpg"
  },
  {
    room: "Game_of_Thrones",
    url_media: "https://www.el-parnasillo.com/juegotronos/juego-tronos-poster.jpg",
    cover: "https://wallpapercave.com/wp/wp5531918.jpg"
  },
  {
    room: "Inception",
    url_media: "https://flxt.tmsimg.com/assets/p7825626_p_v8_af.jpg",
    cover: "https://wallpaperaccess.com/full/1264684.jpg"
  }
];


const RoomsPages: React.FC = () => {
  const { user } = useAuthContext()
  const [username, setUsername] = useState<string>(user?.name||userInfo.username);
  const [room, setRoom] = useState<string>("");
  const [photo, setPhoto] = useState<string>(user?.avatar||userInfo.image);
  const [rol, setRol] = useState<string>(user?.role||userInfo.rol);
  const [cover,setCover]=useState("")
  const [chat, setChat] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({});
  console.log(roomCounts)
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  useEffect(()=>{
    if(user&&user.name.length>0){
      setUsername(user?.name)
      setPhoto(user?.avatar)
      setRol(user.role)
    }
  },[user])
  useEffect(() => {
    const newSocket: Socket = io(BACKEND_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
  
    return () => {
      newSocket.disconnect();
    };
  }, [BACKEND_URL]);
  
  const handleEnterRoom = (roomName: string,id:number) => {
    if (!socket) return;
    if (username.trim() !== "" && roomName.trim() !== "") {
      setRoom(roomName);
      setCover(roomsData[id].cover)
      socket.connect();
      socket.emit("join_room", { room: roomName, username, image: photo, rol });
      setChat(true);
    } else {
      alert("Completa todos los campos antes de entrar a la sala.");
    }
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit("leave_room", { room, username });

      setTimeout(() => {
        socket.disconnect();
      }, 500);
    }
    setChat(false);
  };
  useEffect(() => {
    if(!socket)return;
    socket.emit("get_rooms_info");

    socket.on("rooms_info", (data: any) => {
      setRoomCounts(data);
    });

    return () => {
      socket.off("rooms_info");
    };
  }, [socket]);

  return (
    <div className={`bg-[#202020] min-h-lvh text-white ${chat?"":"pt-[100px]"}`} >
      {chat && socket ? (
        <Chat
          socket={socket}
          username={username}
          room={room}
          photo={photo}
          rol={rol}
          cover={cover}
          leaveRoom={leaveRoom} 
        />
      ) : (
        <div className="p-2 grid grid-cols-5">
{socket&&roomsData.map((room, index) => (
    <RoomCard
      key={index}
      room={{...room,username:username,image:photo,rol}}
      onEnterRoom={handleEnterRoom}
      count={roomCounts[room.room]|| 0 }
      id={Number(index)}
    />
  ))
}
        </div>
      )}
    </div>
  );
};

export default RoomsPages;
