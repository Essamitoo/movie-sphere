'use client'

import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { FiLock, FiMail } from 'react-icons/fi'
import { LuCrown, LuStar } from 'react-icons/lu'
import { MdOutlineMovieFilter } from 'react-icons/md'

interface FormData {
	[key: string]: string
}

const LoginView = () => {
	const initialData: FormData = { email: '', password: '' }

	const [data, setData] = useState(initialData)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
		console.log(data);
		
	}

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if( data.email && data.password) alert('logged in!')
			else alert('error en input')
	}

	return (
		<div className='flex min-h-screen '>
			<div className="bg-[url('../assets/sign-in-bg.webp')] w-1/3 flex justify-center items-center">
				<div className='text-white space-y-8 p-4 text-lg'>
					<div className='relative'>
						<MdOutlineMovieFilter className='absolute top-[-.5rem] left-[-.65rem] size-10 text-quinary' />
						<p className='pl-12'>Disfruta de los mejores estrenos</p>
					</div>
					<div className='relative'>
						<FaRegHeart className='absolute top-[-.4rem] left-[-.65rem] size-9 text-quinary' />
						<p className='pl-12'>
							Organiza tus peliculas{' '}
							<span className='font-bold'>favoritas, pendientes y vistas</span>
						</p>
					</div>
					<div className='relative'>
						<LuStar className='absolute top-[-.5rem] left-[-.65rem] size-10 text-quinary' />
						<p className='pl-12'>
							Puntua y deja tu opinion sobre las peliculas
						</p>
					</div>
					<div className='relative'>
						<LuCrown className='absolute top-[-.5rem] left-[-.65rem] size-10 text-quinary' />
						<p className='pl-12'>
							Obten <span className='font-bold'>premium</span> para funciones
							exclusivas!
						</p>
					</div>
				</div>
			</div>
			<div className='w-[66.6%] flex flex-col justify-center '>
				<div className='min-h-screen bg-gradient-to-br from-primary to-secondary py-12 px-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8 bg-secondary  p-8 rounded-xl shadow-lg'>
						<div className='text-center'>
							<h2 className='text-3xl font-extrabold text-white mb-2'>
								Bienvenido de vuelta
							</h2>
							<p className='text-sm text-tertiary'>Nos alegra tenerte aqui</p>
						</div>

						<form className='mt-8 space-y-6' onSubmit={onSubmit}>
							<div className='space-y-4'>
								<div>
									<div className='relative'>
										<FiMail className='absolute top-3 left-3 text-white' />
										<input
											name='email'
											value={data.email}
											type='email'
											className='w-full pl-9 pr-3 py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='email@ejemplo.com'
											onChange={onChange}
										/>
									</div>
								</div>

								<div>
									<div className='relative'>
										<FiLock className='absolute top-3 left-3 text-white' />
										<input
											name='password'
											value={data.password}
											type='password'
											className='w-full pl-9 pr-10 py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='Crea una contraseña fuerte'
											onChange={onChange}
										/>
									</div>
								</div>

								<div className='flex items-center'>
									<p className='ml-2 block text-sm text-tertiary'>
										Aun no tienes una cuenta?{' '}
										<Link
											href={'/auth/register'}
											className='text-quinary hover:text-quaternary'
										>
											Crear cuenta
										</Link>
									</p>
								</div>
							</div>

							<div className='space-y-4'>
								<button
									type='submit'
									className='w-full flex justify-center py-2 px-4  placehoder:text-smtext-sm font-semibold rounded-lg text-white bg-quaternary hover:cursor-pointer hover:bg-quinary transition duration-300 ease-in-out'
								>
									Iniciar sesion
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginView
