import AuthProtected from '@/components/authProtected/AuthProtected'
import Search from '@/components/search/Search'
import SideBar from '@/components/sidebar/SideBar'
import DashboardHeader from '@/views/DashboardView/DashboardHeader'
import React from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthProtected>
			<div className='flex min-h-screen'>
				<div className='w-1/8'>
					<SideBar />
				</div>
				<main className='w-7/8 bg-[#303030] text-tertiary px-16 py-10 '>
					<div className='flex gap-6'>
						<DashboardHeader />
					</div>
					<div>{children}</div>
				</main>
			</div>
		</AuthProtected>
	)
}
