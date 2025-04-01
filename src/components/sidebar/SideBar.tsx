import Link from "next/link"
import { FiClock, FiHeart, FiHome } from "react-icons/fi"
import { TbEyeCheck } from "react-icons/tb"

const SideBar = () => {
  return (
		<>
			<div className='left-0 h-full w-full bg-secondary flex flex-col items-center py-8 '>
				<div className='flex flex-col items-center space-y-6'>
					<FiHome className='w-6 h-6 text-[#00F0FF] cursor-pointer' />
					<Link href={'/dashboard/favorites'}>
          
					<FiHeart className='w-6 h-6 text-gray-400 hover:text-quaternary cursor-pointer' />
          </Link>
					<FiClock className='w-6 h-6 text-gray-400 hover:text-quaternary cursor-pointer' />
					<TbEyeCheck className='w-7 h-10 text-gray-400 hover:text-quaternary cursor-pointer' />
				</div>
			</div>
		</>
	)
}

export default SideBar