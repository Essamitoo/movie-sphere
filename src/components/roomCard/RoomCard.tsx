'use client'
import { RoomsCard } from '@/interfaces/IRooms'
interface Props {
	room: RoomsCard;
	onEnterRoom: (roomName: string) => void;
}

const RoomCard: React.FC<Props> = ({ room, onEnterRoom }) => {
	return (
		<div
			className={`rounded-xl border h-[350px] m-4 p-1 flex flex-col items-center hover:scale-102 hover:cursor-pointer hover:border-[#00A878] w-[240px] border-[#00A878] bg-[#00A878]/10`}
		>
			<div className='rounded-xl h-[240px] w-full'>
				<img
					src={room.url_media}
					className='rounded-xl h-[240px] w-full'
					alt={room.url_media}
				/>
			</div>
			<p className='text-[#00A878]'>{room.room}</p>

			<button
				onClick={() => onEnterRoom(room.room)}
				className='border border-slate-100/50 w-full rounded-xl text-ms hover:cursor-pointer bg-[#171717]'
			>
				Entrar a la sala
			</button>
		</div>
	);
};

export default RoomCard;
