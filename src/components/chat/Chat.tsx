import { useEffect, useRef, useState } from 'react'
import { FaSmile } from 'react-icons/fa'
import { Socket } from 'socket.io-client'
import FireworksExplosion from '@/components/animations/ThreeExplosion'
import ButtonVip from '../buttons-chat/ButtonVip'

interface User {
	username: string
	image?: string
	rol: string
}

interface Message {
	message?: string
	room: string
	author: string
	photo: string
	time: string
	rol: string
}

interface ChatProps {
	socket: Socket
	username: string
	room: string
	photo: string
	cover: string
	rol: string
	leaveRoom: () => void
}

const Chat: React.FC<ChatProps> = ({
	socket,
	username,
	room,
	photo,
	rol,
	cover,
	leaveRoom,
}) => {
	const messagesContainerRef = useRef<HTMLDivElement | null>(null)
	const [currentMessage, setCurrentMessage] = useState<string>('')
	const [users, setUsers] = useState<User[]>([])
	const [listMenssage, setListMenssage] = useState<Message[]>([])

	const scrollToBottom = () => {
		const container = messagesContainerRef.current
		if (container) {
			container.scrollTop = container.scrollHeight
		}
	}
	useEffect(() => {
		scrollToBottom()
	}, [listMenssage])

	const sendMessage = async () => {
		if (username && currentMessage) {
			const now = new Date()
			const hours = now.getHours().toString().padStart(2, '0')
			const minutes = now.getMinutes().toString().padStart(2, '0')

			const info: Message = {
				message: currentMessage,
				room,
				author: username,
				photo,
				time: `${hours}:${minutes}`,
				rol,
			}

			await socket.emit('send_message', info)
			setCurrentMessage('')
		}
	}

	useEffect(() => {
		const handleUsersUpdate = (data: { users: User[] }) => {
			setUsers(data.users)
		}

		const handleUserLeft = (data: { username: string }) => {
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user.username !== data.username)
			)
			setListMenssage((list) => [
				...list,
				{
					author: data.username,
					message: '',
					room: '',
					photo: '',
					time: '',
					rol: '',
				},
			])
		}

		socket.on('room_users', handleUsersUpdate)
		socket.on('user_left', handleUserLeft)

		return () => {
			socket.off('room_users', handleUsersUpdate)
			socket.off('user_left', handleUserLeft)
		}
	}, [socket])

	useEffect((): any => {
		const messageHandle = (data: Message) => {
			setListMenssage((list) => [...list, data])
		}
		socket.on('receive_message', messageHandle)
		return () => socket.off('receive_message', messageHandle)
	}, [socket])

	return (
		<div className='h-screen'>
			<img src={cover} alt='' className='h-full w-full absolute' />
			<div className='mx-auto w-full max-w-6xl rounded-2xl overflow-hidden absolute z-2 top-25 left-10'>
				<div className='flex items-center h-[30px] w-full  bg-black'>
					<button
						onClick={() => leaveRoom()}
						className='flex items-center bg-red-600 text-white h-[30px] w-[100px] px-2 text-xs hover:cursor-pointer'
					>
						Abandonar Sala
					</button>
					<p className='flex items-center text-[#00A878] w-[100%] h-[30px] px-2 font-semibold'>
						Chat en vivo ({users.length} Usuarios) / Sala {room}
					</p>
				</div>

				<div className='grid grid-cols-[70%_30%]'>
					<div
						className='bg-gradient-to-r from-[#171717]/40 to-black/40  h-[70vh] overflow-y-auto flex flex-col p-4 gap-3'
						ref={messagesContainerRef}
					>
						{listMenssage.map((item, index) =>
							item.message ? (
								item.message.startsWith('1234') ? (
									<FireworksExplosion
										message={item.message.substring(4)}
										user={item.author}
									/>
								) : (
									<div
										key={index}
										className={`${
											username === item.author
												? 'bg-[#202020] text-white'
												: 'bg-[#f7f7f7cb] border border-black text-black'
										} flex flex-col text-sm px-2 py-1 rounded-md max-w-[70%] w-[40%] break-words`}
									>
										<div className='flex justify-between w-full text-xs'>
											<div className='flex items-center gap-2'>
												<img
													src={item.photo}
													alt=''
													className={`w-12 h-12 rounded-full border-2 p-1 ${
														item.rol === 'Premium'
															? 'border-yellow-300'
															: item.rol === 'Admin'
															? 'border-blue-700'
															: ''
													}`}
												/>
												<p
													className={`${
														item.rol === 'Premium'
															? 'text-white font-bold premium-text chat'
															: item.rol === 'admin'
															? 'text-red-500'
															: 'text-green-400'
													} text-sm`}
												>
													{username === item.author ? 'Tú' : item.author}
													{item.rol === 'Premium' && '⭐VIP⭐'}
												</p>
											</div>

											<p>{item.time}hs</p>
										</div>

										<p className='mt-1 text-center font-medium text-xl'>
											{item.message}
										</p>
									</div>
								)
							) : (
								<p key={index} className='text-gray-400 italic'>
									{item.author} ha salido de la sala.
								</p>
							)
						)}
					</div>

					<div className='flex flex-col bg-black/60 p-2'>
						{users.length > 0 ? (
							users.map((item, index) => (
								<div
									key={index}
									className='flex items-center gap-2 text-[#00A878] mb-2'
								>
									<img
										src={item.image || 'default-image.jpg'}
										alt=''
										className={`w-15 h-15 rounded-full border-2 p-1 ${
											item.rol === 'Premium'
												? 'border-yellow-300'
												: item.rol === 'Admin'
												? 'border-blue-700'
												: ''
										}`}
									/>
									<p
										className={`${
											item.rol === 'Premium'
												? 'text-white font-bold premium-text'
												: item.rol === 'admin'
												? 'text-red-500'
												: 'text-green-400'
										}`}
									>
										{item.username}
										{item.rol === 'Premium' && '⭐VIP⭐'}
									</p>
								</div>
							))
						) : (
							<p className='text-white'>No hay usuarios en la sala</p>
						)}
					</div>
				</div>
				<div className='grid grid-cols-[60%_20%] rounded-b-2xl p-4 justify-center bg-[#171717]'>
					<input
						type='text'
						placeholder='Mensaje...'
						onChange={(e) => setCurrentMessage(e.target.value)}
						value={currentMessage}
						onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
						className='h-[80px] px-4 rounded-md bg-white text-black'
					/>
					<div className='flex flex-col items-center justify-between gap-1'>
						{rol === 'Premium' ? (
							<ButtonVip />
						) : (
							<button className='bg-gray-500 text-white px-2 py-1 rounded'>
								Free
							</button>
						)}
						{false && <FaSmile size={30} color='#00A878' />}
						<button
							onClick={() => sendMessage()}
							className='bg-[#00A878] text-white px-2 py-1 rounded'
						>
							Enviar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat
