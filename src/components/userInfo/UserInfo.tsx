'use client'
import { useAuth } from '@/store/useAuth'

const UserInfo = () => {
	
	const { data } = useAuth()

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Buenos Dias";
		if (hour < 18) return "Buenas Tardes";
		return "Buenas Noches";
	  };

	return (
		<div className=' h-screen bg-[#303030] text-white px-4 '>
			<h1 className='font-bold text-4xl'>
				{' '}
				{getGreeting()}, <span className='text-quinary'>{data?.name}</span>
			</h1>
			<div className='flex mt-10 gap-4'>
				<div>
					<h3>Informacion del usuario:</h3>
					<p>Nombre: {data?.name}</p>
					<p>Email: {data?.email}</p>
					<p>Numero de peliculas vistas: {data?.views}</p>
					<p>Numero de peliculas favoritas: {data?.favorites}</p>
					<p>Numero de criticas: {data?.criticas}</p>
					<p>Tipo de usuario:{data?.cuenta}</p>
				</div>
				<div>
					<img src={data?.image} alt={data?.name} />
				</div>
			</div>
		</div>
	)
}

export default UserInfo
