'use client'

import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { isValid } from '@/utils/validation'
import { FaRegHeart } from 'react-icons/fa'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import { LuCrown, LuStar } from 'react-icons/lu'
import { MdOutlineMovieFilter } from 'react-icons/md'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import { IFormData, ITouched } from '@/interfaces/IForm'
import { useRouter } from 'next/navigation'
import { registerService } from '@/services/authServices'
import { toast } from 'react-toastify'
import Link from 'next/link'
import GoogleAuth from '@/components/googleAuth/GoogleAuth'

const RegisterView = () => {
	const initialData: IFormData = {
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	}

	const initialTouched: ITouched = {
		email: false,
		password: false,
		name: false,
		address: false,
		phone: false,
	}

	const router = useRouter()
	const [data, setFormData] = useState(initialData)
	const [touched, setTouched] = useState(initialTouched)
	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = useState(false)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...data, [name]: value })
	}

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const response = await registerService(data)

		if (response?.message === 'Email already exists') {
			toast.error('El email ya existe')
			return
		}

		toast.success('Usuario creado con exito')
		router.push('/auth/login')
	}

	const handleBlur = (field: string) => {
		setTouched({ ...touched, [field]: true })
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
					<div className='max-w-md w-full space-y-8 bg-secondary p-8 rounded-xl shadow-lg'>
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
								{/* Nombre */}

								<div>
									<div className='relative'>
										<FiUser className='absolute top-3 left-3 text-white' />
										<input
											name='name'
											type='text'
											value={data.name}
											onChange={onChange}
											onBlur={() => handleBlur('name')}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg text-white'
											placeholder='Nombre'
										/>
									</div>
									{touched.name && !isValid('name', data.name) && (
										<p className='text-red-700 ml-4 text-sm'>Nombre invalido</p>
									)}
								</div>

								{/* Email */}

								<div>
									<div className='relative'>
										<FiMail className='absolute top-3 left-3 text-white' />
										<input
											name='email'
											type='email'
											value={data.email}
											onChange={onChange}
											onBlur={() => handleBlur('email')}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg text-white'
											placeholder='email@ejemplo.com'
										/>
									</div>
									{touched.email && !isValid('email', data.email) && (
										<p className='text-red-700 ml-4 text-sm'>Email invalido</p>
									)}
								</div>

								{/* Contraseña */}

								<div>
									<div className='relative'>
										<FiLock className='absolute top-3 left-3 text-white' />
										<input
											name='password'
											type={showPassword ? 'text' : 'password'}
											value={data.password}
											onChange={onChange}
											onBlur={() => handleBlur('password')}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg text-white placeholder:text-sm'
											placeholder='Crea una contraseña'
										/>
										<button
											type='button'
											onClick={() => setShowPassword(!showPassword)}
											className='absolute top-3 right-3 text-white hover:cursor-pointer hover:scale-115 transition duration-200 ease-in-out'
										>
											{showPassword ? <TbEyeOff /> : <TbEye />}
										</button>
									</div>
									{touched.password && !isValid('password', data.password) && (
										<p className='text-red-700 ml-4 text-sm'>
											Contraseña invalida
										</p>
									)}
								</div>

								{/* Repetir Contraseña */}

								<div>
									<div className='relative'>
										<FiLock className='absolute top-3 left-3 text-white' />
										<input
											name='repeatPassword'
											type={showRepeatPassword ? 'text' : 'password'}
											value={data.repeatPassword}
											onChange={onChange}
											onBlur={() => handleBlur('repeatPassword')}
											className='w-full pl-9 py-2 border border-tertiary rounded-lg text-white'
											placeholder='Repite tu contraseña'
										/>
										<button
											type='button'
											onClick={() => setShowRepeatPassword(!showRepeatPassword)}
											className='absolute top-3 right-3 text-white hover:cursor-pointer hover:scale-115 transition duration-200 ease-in-out'
										>
											{showRepeatPassword ? <TbEyeOff /> : <TbEye />}
										</button>
									</div>
									{touched.repeatPassword &&
										!isValid('repeatPassword', data.repeatPassword, data) && (
											<p className='text-red-700 ml-4 text-sm'>
												Las contraseñas no coinciden
											</p>
										)}
								</div>
										<div className='pl-2'>
											<p className='text-tertiary text-sm'>Ya tienes una cuenta, <Link href={'/auth/login'} className='text-quaternary hover:text-quinary'>Iniciar sesion</Link></p>
										</div>
								<div className='-mb-4'>
									<button
										type='submit'
										className='w-full flex justify-center py-2 px-4  placehoder:text-smtext-sm font-semibold rounded-lg text-white bg-quaternary hover:cursor-pointer hover:bg-quinary transition duration-300 ease-in-out'
										disabled={
											!data.name ||
											!data.email ||
											!data.password ||
											!data.repeatPassword
										}
									>
										Crear Cuenta
									</button>
								</div>
							</div>
						</form>
						<div className='flex items-center justify-center space-x-2 '>
							<hr className='flex-grow border-t border-tertiary' />
							<span className='text-tertiary'>o</span>
							<hr className='flex-grow border-t border-tertiary' />
						</div>
						<GoogleAuth />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterView
