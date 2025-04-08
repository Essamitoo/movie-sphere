'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiHeart, FiClock, FiEye } from 'react-icons/fi'
import UserInfo from '../userInfo/UserInfo'
import Logo from '../logo/Logo'

const SideBar = () => {
	const pathname = usePathname()

	const links = [
		{
			href: '/dashboard',
			icon: <FiHome className='sidebar-icon' />,
			label: 'Inicio',
		},
		{
			href: '/dashboard/favorites',
			icon: <FiHeart className='sidebar-icon' />,
			label: 'Favoritos',
		},
		{
			href: '/dashboard/views',
			icon: <FiEye className='sidebar-icon' />,
			label: 'Vistas',
		},
		{
			href: '/dashboard/list',
			icon: <FiClock className='sidebar-icon' />,
			label: 'Listas',
		},
	]

	return (
		<div className='left-0 h-full w-full bg-secondary flex flex-col items-center py-8'>
			<Logo/>
			<UserInfo />
			<div className='flex flex-col space-y-6 '>
				{links.map((link) => {
					const isActive = pathname === link.href

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`flex gap-2 items-center transition-all duration-300 ${
								isActive ? ' font-extrabold text-quinary' : 'text-tertiary'
							}`}
						>
							<span
								className={`sidebar-icon transition-transform duration-300 ${
									isActive ? 'scale-105 rotate-2 text-quinary' : ''
								}`}
							>
								{link.icon}
							</span>
							<p className='text-sm p-2'>{link.label}</p>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default SideBar
