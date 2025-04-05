import Link from 'next/link'
import React from 'react'
import { MdOutlineMovieFilter } from 'react-icons/md'

const Logo = () => {
	return (
			<Link href={'/home'} className='flex gap-2 justify-center items-center text-white hover:scale-105 hover:rotate-2 transition-all duration-200'>
            <MdOutlineMovieFilter  className='size-10'/>
				<p className='font-bold text-xl font-logo'>Movie Sphere</p>
			</Link>
	)
}

export default Logo
