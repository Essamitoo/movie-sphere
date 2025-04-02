'use client'
import Search from '@/components/search/Search'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthContext } from '@/contexts/authContext'
import { useContext } from 'react'

const Header = () => {
	const { user } = useContext(AuthContext)
	const pathname = usePathname()
	const hideHeaderRoutes = ['/', '/auth/register', '/auth/login']
	const shouldShowHeader = !hideHeaderRoutes.includes(pathname)
	return (
		<>
			{shouldShowHeader && (
				<div className='w-[100%] h-[70px] bg-[#171717] flex justify-around items-center text-white'>
					<Link href='/home' className='flex w-[20%]'>
						<img
							src='https://res.cloudinary.com/dpyotudkz/image/upload/v1743098027/2082059f-cf96-4dad-aebf-e219a93a9c74.png'
							alt=''
						/>
						<h3 className='bg-gradient-to-r from-[#00CC92] via-[#016b4d] to-[#013023] bg-clip-text text-transparent text-xl font-bold '>
							MOVIE SPHERE
						</h3>
					</Link>
					<Search />
					<div className='flex flex-col w-[25%]'>
						{false ? (
							<Link
								href='/chat'
								className='text-md bg-gradient-to-r from-[#F1FDFA] via-[#c5c7c7] to-[#313131] bg-clip-text text-transparent flex justify-items-end ml-[60%]'
							>
								Salas de Chat
								<span className='text-[8px] text-green-400'>🟢</span>
							</Link>
						) : (
							<></>
						)}
						<div className='flex justify-around'>
							<Link href='/home' className='link'>
								Inicio
							</Link>
							{false ? (
								<>
									<Link href='/series' className='link'>
										Noticias
									</Link>
									<Link href='/popular' className='link'>
										Popular
									</Link>
									<Link href='/estrenos' className='link'>
										Estrenos
									</Link>
								</>
							) : (
								<>
									<p className='link'>Noticias</p>
									<p className='link'>Popular</p>
									<p className='link'>Estrenos</p>
								</>
							)}
						</div>
					</div>

					{!user?.user ? (
						<Link
							href='/auth/login'
							className='bg-[#00a878] w-[150px] h-[30px] p-1 rounded font-medium text-sm mt-2 text-center hover:scale-105 text-gray-900'
						>
							Ingresar
						</Link>
					) : (
						<Link href='/dashboard' className='flex items-center gap-1'>
							<img
								className='border h-10 w-10 rounded-full'
								src={user.user.image}
							/>
							<div
								className={`${
									user.user.account === 'Premium' ? 'text-amber-300' : ''
								}`}
							>
								<p>{user.user.name}</p>
								{user.user.account === 'Premium' && (
									<h3 className='font-extrabold'>PREMIUM</h3>
								)}
							</div>
						</Link>
					)}
				</div>
			)}
		</>
	)
}
export default Header

