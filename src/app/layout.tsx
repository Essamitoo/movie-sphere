import type { Metadata } from 'next'
import { Inter, Mulish, Alexandria } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/header/Header'
import Provider from './provider'
import { ToastContainer } from 'react-toastify'
import Footer from '@/components/footer/Footer'

const secondaryFont = Mulish({
	variable: '--font-secondary',
	subsets: ['latin'],
	weight: ['400', '700', '900'],
})

const primaryFont = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	weight: ['200','300','400','700'],
})

const logoFont = Alexandria({
	variable: '--font-logo',
	subsets: ['latin'],
	weight: ['400'],
})

export const metadata: Metadata = {
	title: 'Movie Sphere',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Provider>
			<html lang='es'>
				<body
					className={`${primaryFont.variable} ${secondaryFont.variable} ${logoFont.variable} antialiased min-h-screen flex flex-col  bg-primary`}
				>
					<div className=''>

					<Header />
					</div>
					<main className='flex-grow'>{children}</main>
					<Footer/>
					<ToastContainer/>
				</body>
			</html>
		</Provider>
	)
}

