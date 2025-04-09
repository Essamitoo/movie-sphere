"use client";
import "@/styles/globals.css"
import RoomCard from "@/components/roomCard/RoomCard";
import { RoomsCard } from "@/interfaces/IRooms";
import io, { Socket } from "socket.io-client";
import { useState, useEffect} from "react";
import Chat from "@/components/chat/Chat";
  import { useAuthContext } from "@/contexts/authContext";

const userData: RoomsCard = {
  username: "Franco",
  image: "https://th.bing.com/th/id/OIP.YoqbqWmGad0HqSkuML5cEQAAAA?rs=1&pid=ImgDetMain",
  rol: "Premium",
  room: "The_Mandalorian",
  url_media:
    "https://www.starwarsnewsnet.com/wp-content/uploads/2023/01/TheMandalorian_Poster_Season3.jpg",
  cover:"https://images.hdqwalls.com/download/the-mandalorian-tv-4k-0b-3840x2160.jpg",
}; 

const RoomsPages: React.FC = () => {
  const { user } = useAuthContext()
  const [username, setUsername] = useState<string>(user?.name||userData.username);
  const [room, setRoom] = useState<string>("");
  const [photo, setPhoto] = useState<string>(user?.image||userData.image);
  const [rol, setRol] = useState<string>(user?.role||userData.rol);
  const [chat, setChat] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  useEffect(()=>{
    if(user&&user.name.length>0){
      setUsername(user?.name)
      setPhoto(user?.image)
      setRol(user.role)
    }
  },[user])
  useEffect(() => {
    const newSocket: Socket = io(BACKEND_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [BACKEND_URL]);

  const handleEnterRoom = (roomName: string) => {
    if (!socket) return;
    if (username.trim() !== "" && roomName.trim() !== "") {
      setRoom(roomName);
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

  return (
    <div className="bg-[#202020] min-h-lvh text-white">
      {chat && socket ? (
        <Chat
          socket={socket}
          username={username}
          room={room}
          photo={photo}
          rol={rol}
          cover={userData.cover}
          leaveRoom={leaveRoom}
        />
      ) : (
        <div className="p-2">
          <RoomCard room={userData} onEnterRoom={handleEnterRoom} />
        </div>
      )}
    </div>
  );
};

export default RoomsPages;
