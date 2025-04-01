import SideBar from '@/components/sidebar/SideBar'
import UserInfo from '@/components/userInfo/UserInfo'

const DashboardView = () => {
	return (
		<div className='flex flex-row h-screen'>
			<div className='w-1/8'>
				<SideBar />
			</div>
			<div className='w-7/8 bg-[#303030] text-white '>

			<UserInfo />
			</div>
		</div>
	)
}

export default DashboardView
