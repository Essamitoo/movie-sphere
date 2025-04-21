"use client"
import { useEffect, useRef, useState } from 'react'
import { FaSmile } from 'react-icons/fa'
import { Socket } from 'socket.io-client'
import FireworksExplosion from '@/components/animations/ThreeExplosion'
import GifVip from '@/components/animations/GifVip'
import ButtonVip from '../buttons-chat/ButtonVip'
import EmojiInput from './EmojiInput'
const constgifs=[
	"https://media1.tenor.com/images/81743d296c1dff3e1d6e5724f9ab37df/tenor.gif?itemid=16876730",
	"https://distritoxr.com/wp-content/uploads/2021/10/e69b0cae40694232988f6b6e17641256.gif",
	"https://www.goforquiz.com/wp-content/uploads/2021/10/squid-game-tug-of-war.gif",
	"https://media.tenor.com/U1hmW6tsQvoAAAAd/squidgame-squid-game-doll.gif",
	"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_I08lhj-2LRKRh5iJ9l3iAogepgqvhx8Qg4XcCbjyf-RjtGc6r3FOKZt7IPog8cgSILB5ZII-c0Qx_N4ai0_6cRHg8fkA_WgREnLBnwQsg5RJd-7i1E59y8h9zhci-isMm5jiKfpSanbpa7PSYTfH6YqbE0qNg3YEY_3Uczhb6IaPxCUHwtbrPUbsig/s498/Oh%20Il-nam%20gif.gif",
	"https://media.tenor.com/TDWUuaRKVgYAAAAM/squid-game-squid-game-2.gif",
	"https://media.tenor.com/stJUwbc1qfcAAAAC/mandalorian-darksaber.gif",
	"https://media.tenor.com/hDfUFubtwasAAAAd/the-mandalorian.gif",
	"https://giffiles.alphacoders.com/206/206000.gif",
	"https://media1.tenor.com/images/fac0051bde08d98afbeac0e6e1c6ffe5/tenor.gif?itemid=5489667",
	"https://i.pinimg.com/originals/f6/12/1c/f6121c2fec22e4bbd97c8345e7ed6b4b.gif",
	"https://cdn.atomix.vg/wp-content/uploads/2015/07/Dragon-Gif.gif",
	"https://images6.fanpop.com/image/photos/34400000/game-of-thrones-gifs-game-of-thrones-34487250-245-244.gif",
	"https://i.gifer.com/HGha.gif",
	"https://gifdb.com/images/high/walter-white-breaking-bad-gun-fkqo60zjucjqhpeu.gif",
	"https://giffiles.alphacoders.com/312/3125.gif",
	"https://media.tenor.com/vl-iHfEeQLgAAAAC/better-call-saul-breaking-bad.gif",
	"https://c.tenor.com/z_tyBN8feB8AAAAC/breaking-bad-sad.gif",
	"https://assets.eventingnation.com/eventingnation.com/images/2013/09/Jesse-Pinkman-Walter-White-handshake.gif",
	"https://cadenaser00.epimg.net/ser/imagenes/2015/03/11/television/1426102691_680594_1426103429_noticia_normal.gif",
	"https://i.pinimg.com/originals/17/04/eb/1704eb40ac187571c904c67a715315b3.gif",
	"https://fmraicesrock.org/wp-content/uploads/2022/03/bravo-los-simuladores.gif",
	"https://media.tenor.com/GZvGUI59a_wAAAAC/felices-los-simuladores.gif",
	"https://media.tenor.com/oe-oLXiFZDYAAAAM/artes-marciales-los-simuladores.gif",
	"https://64.media.tumblr.com/040777ad24f6cd9f39fca99ba4181ef6/79336c3b76d11cb0-f5/s540x810/3436ff54b67bbbb6bc26ac08419b6c34aa5d6f5d.gif",
	"https://media.tenor.com/8OPwGCVjAzMAAAAC/molero-los.gif",
	]
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
	code:string
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
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);
	const [currentMessage, setCurrentMessage] = useState<string>('');
	const [users, setUsers] = useState<User[]>([]);
	const [listMenssage, setListMenssage] = useState<Message[]>([]);
	const [code,setCode]=useState('');
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
				code,
				rol,
			}
			console.log(info)
			await socket.emit('send_message', info)
			setCurrentMessage('')
			setCode("")
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
					code:'',
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
		<div className='h-screen flex justify-center items-center'>
			<img src={cover} alt='' className='h-full w-full absolute' />
			<div className='h-[80vh] w-[70vw] max-w-6xl rounded-2xl overflow-hidden z-4 mt-10'>
				<div className='flex items-center h-[30px] w-full  bg-black'>
					<button
						onClick={() => leaveRoom()}
						className='flex items-center bg-red-600 text-white h-[30px] w-[100px] px-2 text-xs hover:cursor-pointer'
					>
						Abandonar Sala
					</button>
					<p className='flex items-center text-[#00A878] w-[100%] h-[30px] px-2 font-semibold'>
						Chat en vivo<span className="text-white">({users.length} Usuarios)</span> / Sala {room}
					</p>
				</div>

				<div className='grid grid-cols-[70%_30%]'>
					<div
						className='bg-gradient-to-r from-[#171717]/40 to-black/40  h-[50vh] overflow-y-auto flex flex-col p-4 gap-3'
						ref={messagesContainerRef}
					>
						{listMenssage.map((item, index) =>
							item.message ? (
								item.code.startsWith('0') ? (
									<FireworksExplosion
										key={index}
										message={item.message}
										user={item.author}
									/>
								) : (item.code.length>0&&!item.code.startsWith('0')) ? (
									<div key={index}>
										<GifVip
											gifUrl={constgifs[Number(item.code)]}
											message={item.message}
											user={item.author}
											photo={item.photo}
										/>
									</div>
								) : (
									<div
										key={index}
										className={`${
											username === item.author
												? 'bg-[#202020] text-white'
												: 'bg-[#f7f7f7cb] border border-black text-black'
										} flex flex-col text-sm px-2 py-1 rounded-md max-w-[70%] min-w-[40%] break-words`}
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

										<p className='mt-1 text-center font-medium text-lg'>
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
					<EmojiInput
						value={currentMessage}
						onChangeText={setCurrentMessage}
						children={
							<input
								type='text'
								placeholder='Mensaje...'
								onChange={(e) => setCurrentMessage(e.target.value)}
								value={currentMessage}
								onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
								className='h-[80px] px-4 rounded-md bg-white text-black w-full'
							/>
						}
					/>
					<div className='flex flex-col items-center justify-between gap-1'>
						{rol === 'Premium' ? (
							<ButtonVip setCode={setCode} code={code}/>
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
