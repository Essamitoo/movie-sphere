'use client'
import Search from '@/components/search/Search'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/contexts/authContext'
import Logo from '../logo/Logo'

const Header = () => {
	const { user } = useAuthContext()
	const pathname = usePathname()
	const hideHeaderRoutes = [
		'/auth/register',
		'/auth/login',
		'/dashboard/user',
		'/dashboard/user/favorites',
		'/dashboard/user/list',
		'/dashboard/user/views',
		'/dashboard/admin',
		'/dashboard/admin/manage-media',
		'/dashboard/admin/manage-users',
		'/dashboard/admin/settings',
		'/dashboard/user/settings',
	]
	const shouldShowHeader = !hideHeaderRoutes.includes(pathname)

	return (
		<>
			{shouldShowHeader && (
				<div className='flex justify-around items-center mx-auto text-tertiary w-full  py-4 px-20  fixed z-60 bg-transparent backdrop-blur-sm'>
					<Logo />
					<Search />
					<div className=''>
						<Link
							href='/rooms'
							className='text-md bg-gradient-to-r from-[#F1FDFA] via-[#c5c7c7] to-[#313131] bg-clip-text text-transparent flex justify-items-end items-center gap-2'
						>
							Salas de Chat
						<span className='text-[8px] text-green-400'>🟢</span>
						</Link>
					</div>
					<div className=''>
						<div className=''>
							<Link href='/home' className='header-link'>
								Inicio
							</Link>

							<Link href='/series' className='header-link'>
								Noticias
							</Link>
							<Link href='/popular' className='header-link'>
								Popular
							</Link>
							<Link href='/estrenos' className='header-link'>
								Estrenos
							</Link>
						</div>
					</div>

					{user ? (
						<Link href={user.role === 'USER' ? '/dashboard/user' : '/dashboard/admin'}  className='flex items-center gap-2'>
							<img
								className='h-10 w-10 rounded-full'
								src={user.avatar}
								alt=''
							/>
							<div
								className={`${
									user.account === 'Premium' ? 'text-amber-300' : ''
								}`}
							>
								<h2 className='text-sm text-white'>{user.name}</h2>
								{user.account === 'Premium' && (
									<h3 className='font-extrabold'>PREMIUM</h3>
								)}
							</div>
						</Link>
					) : (
						<Link
							href='/auth/login'
							className='bg-quaternary px-8 py-1 rounded-xl text-center hover:scale-105 text-white font-bold'
						>
							Ingresar
						</Link>
					)}
				</div>
			)}
		</>
	)
}
export default Header



