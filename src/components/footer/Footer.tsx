'use client'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

 
  if (pathname.startsWith('/dashboard')) return null
  if (pathname.startsWith('/auth')) return null

  return (
    <footer className='bg-secondary h-18 w-full flex justify-center items-center text-tertiary'>
      Todos los derechos reservados &copy; 2025 | Movie Sphere
    </footer>
  )
}

export default Footer
