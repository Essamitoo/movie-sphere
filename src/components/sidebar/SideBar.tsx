'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	FiHome,
	FiHeart,
	FiClock,
	FiEye,
	FiSettings,
	FiUsers,
} from 'react-icons/fi'
import UserInfo from '../userInfo/UserInfo'
import Logo from '../logo/Logo'
import { useAuthContext } from '@/contexts/authContext'
import { MdMovieEdit } from 'react-icons/md'
import { TbDoorExit } from 'react-icons/tb'

const SideBar = () => {
	const pathname = usePathname()
	const { user, logout } = useAuthContext()

	const isAdmin = user?.role === 'ADMIN'

	const commonLinks = [
		{
			href: '/dashboard/user',
			icon: <FiHome className='sidebar-icon' />,
			label: 'Inicio',
		},
		{
			href: '/dashboard/user/favorites',
			icon: <FiHeart className='sidebar-icon' />,
			label: 'Favoritos',
		},
		{
			href: '/dashboard/user/views',
			icon: <FiEye className='sidebar-icon' />,
			label: 'Vistas',
		},
		{
			href: '/dashboard/user/list',
			icon: <FiClock className='sidebar-icon' />,
			label: 'Listas',
		},
		{
			href: '/dashboard/user/settings',
			icon: <FiSettings className='sidebar-icon' />,
			label: 'Configuración',
		},
	]

	const adminLinks = [
		{
			href: '/dashboard/admin',
			icon: <FiHome className='sidebar-icon' />,
			label: 'Inicio',
		},
		{
			href: '/dashboard/admin/manage-users',
			icon: <FiUsers className='sidebar-icon' />,
			label: 'Usuarios',
		},
		{
			href: '/dashboard/admin/settings',
			icon: <FiSettings className='sidebar-icon' />,
			label: 'Configuración',
		},
		{
			href: '/dashboard/admin/manage-media',
			icon: <MdMovieEdit className='sidebar-icon' />,
			label: 'Media',
		},
	]

	const linksToShow = isAdmin ? adminLinks : commonLinks

	return (
		<div className='h-screen w-full bg-secondary flex flex-col items-center py-8 sticky top-0'>
			<Logo />
			<UserInfo />
			<div className='flex flex-col space-y-6 flex-grow'>
				{linksToShow.map((link) => {
					const isActive = pathname === link.href

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`flex gap-2 items-center transition-all duration-300 ${
								isActive ? 'text-tertiary font-extrabold' : 'text-tertiary'
							}`}
						>
							<span
								className={`sidebar-icon transition-transform duration-300 ${
									isActive ? 'scale-105 rotate-2 font-extrabold' : ''
								}`}
							>
								{link.icon}
							</span>
							<p className='text-sm p-2'>{link.label}</p>
						</Link>
					)
				})}
			</div>
			<div className=''>
				<button
					onClick={logout}
					className='cursor-pointer  flex items-center gap-2 text-tertiary'
				>
					<TbDoorExit />
					Salir
				</button>
			</div>
		</div>
	)
}

export default SideBar
