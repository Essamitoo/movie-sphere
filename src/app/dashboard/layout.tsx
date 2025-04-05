import Greeting from '@/components/greeting/Greeting'
import SideBar from '@/components/sidebar/SideBar'
import React from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex min-h-screen'>
			<div className='w-1/6'>
				<SideBar />
			</div>
			<main className='w-5/6 bg-[#303030] text-tertiary px-16 py-10 '>
				<div>{children}</div>
			</main>
		</div>
	)
}
