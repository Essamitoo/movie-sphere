'use client'
import React from 'react';
import { RoomsCard } from '@/interfaces/IRooms';
interface Props {
	room: RoomsCard;
	onEnterRoom: (roomName: string,id:number) => void;
	count:number;
	id:number;
}

const RoomCard: React.FC<Props> = ({ room, onEnterRoom,count,id }) => {
	const userMax=3;
	return (
		<div
			className={`border h-[350px] m-4 p-1 flex flex-col items-center hover:cursor-pointer border-[#000000]/40  w-[240px] ${count>userMax?"bg-red-500/20":" bg-[#000000]"}`}
		>
			<div className='rounded-xl h-[240px] w-full'>
				<img
					src={room.url_media}
					className='h-[240px] w-full'
					alt={room.url_media}
				/>
			</div>
			<p className='text-[#00A878]'>{room.room}</p>
			<p className='text-sm m-1'>{count} conectados {count>userMax?"🔴":"🟢"}</p>
			{count>userMax?<button
				className='text-red-600 w-[200px] h-[35px] rounded-md text-ms hover:cursor-pointer hover:scale-105 bg-[#000000]'
			>
				Sala llena
			</button>:<button
				onClick={() => onEnterRoom(room.room,id)}
				className='w-[200px] h-[35px] rounded-md text-ms hover:scale-105  hover:cursor-pointer bg-[#00A878]'
			>
				Entrar a la sala
			</button>}
		</div>
	);
};

export default RoomCard;
