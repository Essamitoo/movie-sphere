'use client'

import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import io from 'socket.io-client'
import Link from 'next/link';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_RANKING_URL || "http://localhost:3001";
const socket = io(`${BACKEND_URL}`) 

interface IRankingUser {
	avatar: string
	name: string
	score: number
	live: number
	time: number
}

interface Question {
	question: string
	options: string[]
	answer: string
	image: string
}

export default function TriviaGame() {
	const [ranking, setRanking] = useState<IRankingUser[]>([])
	const [questions, setQuestions] = useState<Question[]>([])
	const [totalTimeLeft, setTotalTimeLeft] = useState(0)
	const [questionsAnswered, setQuestionsAnswered] = useState(0)
	const { user } = useAuthContext()
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [score, setScore] = useState(0)
	const [timeLeft, setTimeLeft] = useState(10)
	const [lives, setLives] = useState(3)
	const [showQuestion, setShowQuestion] = useState(false)
	const [awaitNext, setAwaitNext] = useState(false)
	const [gameStarted, setGameStarted] = useState(false)
	const averageTime =
		questionsAnswered > 0
			? ((10 * questionsAnswered - totalTimeLeft) / questionsAnswered).toFixed(
					2
			  )
			: '0'
	useEffect(() => {
		if (!showQuestion || !gameStarted) return

		if (timeLeft === 0) {
			handleAnswer(null)
			return
		}

		const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
		return () => clearTimeout(timer)
	}, [timeLeft, showQuestion, gameStarted])
	//PREGUNTAS
	useEffect(() => {
		fetch('https://api.jsonbin.io/v3/b/68138f1a8561e97a500b920e', {
			method: 'GET',
			headers: {
				'X-Master-Key':
					'$2a$10$4W77Gxlv/Tk0.Thuz3lmR.7sZL2ydFkathmtSFsL0NGAAvXw3iNeG',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setQuestions(data.record)
			})
			.catch((err) => console.error('Error al obtener las preguntas:', err))
	}, [])

	useEffect(() => {
		socket.emit('get_ranking')
		socket.on('ranking_update', (data) => {
			setRanking(data)
		})
		return () => {
			socket.off('ranking_update')
		}
	}, [])

	const handleAnswer = (selected: string | null) => {
		setShowQuestion(false)
		setAwaitNext(true)
		setTotalTimeLeft((prev) => prev + timeLeft)
		setQuestionsAnswered((prev) => prev + 1)

		if (selected === questions[currentQuestion].answer) {
			setScore((prev) => prev + 10)
			setLives((prev) => Math.min(prev + 0.5, 3))
		} else {
			setLives((prev) => prev - 1)
			setScore((prev) => prev - 5)
		}
	}

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1)
			setTimeLeft(10)
			setShowQuestion(true)
			setAwaitNext(false)
		} else {
			socket.emit('submit_score', {
				name: user?.name,
				avatar: user?.avatar,
				score: score,
				live: lives,
				time: averageTime,
			})
			setGameStarted(false)
		}
	}

	const startGame = () => {
		setGameStarted(true)
		setShowQuestion(true)
		setTimeLeft(10)
		setCurrentQuestion(0)
		setScore(0)
		setLives(3)
	}

	return (
		<div className='flex items-center justify-center p-4 text-white h-screen pt-[60px] gap-4'>
			<p className='text-2xl font-bold mb-6 absolute top-[80px] left-[50px]'>
				🎬 Trivia de Películas y Series
			</p>
			<div className='h-[50vh] bg-black p-6 rounded-lg shadow-lg w-full max-w-md text-center flex flex-col items-center justify-center gap-4 border border-gray-400/50'>
				<p className='text-cente text-2xl'>Reglamento</p>
				<p className='text-md  bg-black'>⏱10seg por pregunta</p>
				<p className='text-md  bg-black'>❤️3 Vidas</p>
				<p className='text-md  bg-black'>
					<span className='text-green-400'>✔ </span>Respuesta correcta:
				</p>
				<p className='text-md  bg-black'>+10⭐Puntos +0,5❤️(Max 3)</p>
				<p className='text-md  bg-black'>❌Respuestas incorrectas:</p>
				<p className='text-md  bg-black'>-5⭐Puntos -1❤️</p>
			</div>
			<div className='bg-black p-6 rounded-lg shadow-lg w-full max-w-md text-center flex flex-col items-center justify-center border border-gray-400/50'>
				{gameStarted && (
					<div className='flex justify-between items-center text-lg w-full mb-4'>
						<span>❤️ Vidas: {lives}</span>
						<span>⏰ Tiempo: {timeLeft}s</span>
						<span>⭐ Puntos: {score}</span>
					</div>
				)}

				{!gameStarted ? (
					<>
						<img
							src='https://res.cloudinary.com/dpyotudkz/image/upload/v1745884706/trivia_mkuvmm.jpg'
							alt=''
							className='w-full h-full'
						/>
						<div className='absolute z-2 bg-black/70 w-90 h-80 flex flex-col items-center gap-5'>
							<img
								src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
								alt=''
								className='w-16 h-16 rounded-full'
							/>
							<p>Nombre</p>
							<p className='text-md text-green-500 bg-black/80'>
								⏱10seg por pregunta
							</p>
							<p className='text-3xl'>❤️❤️❤️</p>
						</div>
						{user&&user.role==='PREMIUM'?<button
							onClick={startGame}
							className='z-3 px-6 py-2 border border-gray-400/50 bg-black mt-40 text-white font-bold rounded hover:bg-[#00cc92] hover:text-black absolute hover:cursor-pointer hover:scale-105 w-[200px]'
						>
							Iniciar Trivia
						</button>:<Link href='/premium' className='z-3 px-6 py-2 border border-gray-400/50 bg-black mt-40 text-white font-bold rounded hover:bg-[#00cc92] hover:text-black/70 absolute hover:cursor-pointer hover:scale-105 w-[200px]'>Iniciar Trivia</Link>}
					</>
				) : showQuestion ? (
					<>
						<img
							src={questions[currentQuestion].image}
							alt=''
							className='w-40 h-28 mb-2'
						/>
						<h2 className='text-xl font-semibold mb-4'>
							{questions[currentQuestion].question}
						</h2>

						<div className='flex flex-col gap-4 mb-6 w-[80%]'>
							{questions[currentQuestion].options.map((option, idx) => (
								<button
									key={idx}
									onClick={() => handleAnswer(option)}
									className='bg-black hover:bg-[#00cc92] hover:text-black hover:font-bold px-4 py-2 rounded hover:cursor-pointer hover:scale-105 border border-gray-400/50'
								>
									{option}
								</button>
							))}
						</div>
					</>
				) : (
					<>
						<h2 className='text-2xl mb-4'>
							{lives > 0 ? '¡Listo!' : 'Fin del juego'}
						</h2>
						{lives === 0 && (
							<img
								src='https://tse4.mm.bing.net/th/id/OIP.5kLW-F-nfH5zyRlaZqLXJQHaEK?rs=1&pid=ImgDetMain'
								className='w-50 h-50'
							/>
						)}
						{awaitNext && lives > 0 && (
							<button
								onClick={handleNext}
								className='mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600'
							>
								{currentQuestion < questions.length - 1
									? 'Continuar'
									: 'Intentar de nuevo'}
							</button>
						)}
						{lives <= 0 && (
							<>
								<p className='mt-4 text-red-500 font-bold'>
									Se acabaron tus vidas 🤍🤍🤍
								</p>
								<button
									onClick={handleNext}
									className='mt-4 px-6 py-2 bg-cyan-700 text-white font-bold rounded hover:bg-cyan-800 hover:cursor-pointer'
								>
									Volver a jugar
								</button>
							</>
						)}
					</>
				)}
			</div>
			<div className='bg-black p-6 rounded-lg shadow-lg w-full max-w-md text-center flex flex-col items-center justify-center border border-gray-400/50'>
				<p>🏆Ranking:</p>
				{ranking.map((user, index) => (
					<div key={index} className='grid grid-cols-5 w-full items-center'>
						<p
							className={`${Number(index + 1) > 3 && 'bg-white'} ${
								Number(index + 1) === 3 && 'bg-amber-700'
							} ${Number(index + 1) === 2 && 'bg-gray-400'} ${
								Number(index + 1) === 1 && 'bg-amber-300'
							} w-6 h-6 text-black rounded-md`}
						>
							{index + 1}
						</p>
						<div className='flex flex-col items-center'>
							<img
								src={user.avatar}
								alt='avatar'
								className='w-8 h-8 rounded-full'
							/>
							<p className='text-xs'>{user.name}</p>
						</div>
						<p>⭐{user.score}</p>
						<p>❤️{user.live}</p>
						<p>⏰{user.time}</p>
					</div>
				))}
			</div>
		</div>
	)
}
