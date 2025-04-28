'use client'
import { useAuthContext } from '@/contexts/authContext'
import { createCheckoutSession } from '@/services/authServices'
import Link from 'next/link'
const PremiumPage: React.FC = () => {
	const { user } = useAuthContext()
	const handlePayment = async () => {
		try {
			if (user&&user.id) {
				const url = await createCheckoutSession(user.id.toString())
				if (url) {
					window.location.href = url 
				}
			}
		} catch (error) {
			alert(
				'Hubo un problema al iniciar el proceso de pago. Por favor, intenta de nuevo.'
			)
			console.error(error)
		}
	}
	return (
		<div className='h-screen w-full flex justify-center items-center bg-black gap-8'>
			<div className='bg-gradient-to-b from-[#171717]/70 via-[#202020]/30 to-[#000000]/70  h-[70vh] w-[350px] rounded-xl border border-gray-400/60 flex flex-col items-center justify-around'>
				<p className='text-gray-400'>Free</p>
				<h3 className='text-white text-2xl'>
					$0
				</h3>
                <Link href="/home" className='text-center bg-white rounded-xl w-[80%] p-2 text-xm hover:cursor-pointer hover:scale-105'>
                Cuenta Gratis
                </Link>
				<hr className='border-t border-gray-300 rounded-full w-1/2 mx-auto' />
				<h3 className='text-white text-2xl'>Incluye el plan</h3>
				<ul className='text-white'>
					<li>✔️ Lista de favoritos</li>
					<li>✔️ Lista de series peliculas vistas</li>
					<li>✔️ Reseñas de peliculas</li>
					<li>✔️ Sala de Chat</li>
					<li>❌ Comentarios premium</li>
					<li>❌ Distintivo Premium</li>
				</ul>
			</div>
			<div className='bg-gradient-to-b from-[#00cc92]/20 via-[#00cc92]/50 to-[#00cc92]/70 h-[70vh] w-[350px] rounded-xl border border-gray-400/60 flex flex-col items-center justify-around shadow-lg shadow-[#00cc92]/50'>
				<p className='text-gray-400'>PREMIUM</p>
				<h3 className='text-white text-2xl'>
					$10USD<span className='text-xs'>/año</span>
				</h3>
				<button onClick={handlePayment} className='bg-white rounded-xl w-[80%] p-2 text-xm hover:cursor-pointer hover:scale-105'>
					Cuenta Premium
				</button>
				<hr className='border-t border-gray-300 rounded-full w-1/2 mx-auto' />
				<h3 className='text-white text-2xl'>Incluye el plan</h3>
				<ul className='text-white'>
					<li>✔️ Lista de favoritos</li>
					<li>✔️ Lista de series peliculas vistas</li>
					<li>✔️ Reseñas de peliculas</li>
					<li>✔️ Sala de Chat</li>
					<li>✔️ Comentarios premium</li>
					<li>✔️ Distintivo Premium</li>
				</ul>
			</div>
		</div>
	)
}
export default PremiumPage
