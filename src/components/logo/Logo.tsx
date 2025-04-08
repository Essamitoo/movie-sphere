import { TvMinimalPlay } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Logo = () => {
	return (
			<Link href={'/home'} className='flex text-tertiary gap-2 justify-center items-center hover:scale-105 hover:text-quaternary transition-all duration-200'>
            <TvMinimalPlay  className='size-7'/>
				<h1 className='text-lg'>MovieSphere</h1>
			</Link>
	)
}

export default Logo
