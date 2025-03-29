'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import { LuCrown, LuStar } from 'react-icons/lu'
import { MdOutlineMovieFilter } from 'react-icons/md'

interface FormData {
	[key: string]: string
}

const RegisterView = () => {
	const initialData: FormData = {
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	}

	const [data, setData] = useState(initialData)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (data.name && data.email && data.password && data.repeatPassword)
			alert('faltan completar campos')
		else alert('logged in!')
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
			<div className='w-[66.6%] flex flex-col'>
				<div className='min-h-screen bg-gradient-to-br from-primary to-secondary py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8 bg-secondary  p-8 rounded-xl shadow-lg'>
						<div className='text-center'>
							<h2 className='text-3xl font-extrabold text-white mb-2'>
								Crear Cuenta
							</h2>
							<p className='text-sm text-tertiary'>
								Unete y explora experiencias inolvidables
							</p>
						</div>

						<form className='mt-8 space-y-6' onSubmit={onSubmit}>
							<div className='space-y-4'>
								<div>
									<div className='relative'>
										<FiUser className='absolute top-3 left-3 text-white' />
										<input
											name='name'
											type='text'
											value={data.name}
											onChange={onChange}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='Nombre'
										/>
									</div>
								</div>

								<div>
									<div className='relative'>
										<FiMail className='absolute top-3 left-3 text-white' />
										<input
											name='email'
											type='email'
											value={data.email}
											onChange={onChange}
											className='w-full pl-9  py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='email@ejemplo.com'
										/>
									</div>
								</div>

								<div>
									<div className='relative'>
										<FiLock className='absolute top-3 left-3 text-white' />
										<input
										name='password'
											type='password'
											value={data.password}
											onChange={onChange}
											className='w-full pl-9  py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='Crea una contraseña fuerte'
										/>
									</div>
								</div>

								<div>
									<div className='relative'>
										<FiLock className='absolute top-3 left-3 text-white' />
										<input
										name='repeatPassword'
											type='password'
											value={data.repeatPassword}
											onChange={onChange}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg focus:outline-none focus:border-quaternary focus:shadow-sm transition-all duration-200 ease-in-out placeholder-tertiary text-sm text-white'
											placeholder='Repite tu contraseña'
										/>
									</div>
								</div>

								<div className='flex items-center pl-2'>
									<input
										type='checkbox'
										className='w-4 h-4 focus:ring-quaternary'
									/>
									<label className='ml-2 block text-sm text-tertiary'>
										Estoy de acuerdo con los{' '}
										<a href='#' className='text-quinary hover:text-quaternary'>
											terminos y condiciones
										</a>
									</label>
								</div>
							</div>

							<div className='space-y-4'>
								<button
									type='submit'
									className='w-full flex justify-center py-2 px-4  placehoder:text-smtext-sm font-semibold rounded-lg text-white bg-quaternary hover:cursor-pointer hover:bg-quinary transition duration-300 ease-in-out'
								>
									Crear Cuenta
								</button>

								<button
									type='button'
									className='w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-secondary bg-white transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-white/50 '
								>
									<FcGoogle className='mr-2 w-4 h-4' />
									Registrarse con Google
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterView
