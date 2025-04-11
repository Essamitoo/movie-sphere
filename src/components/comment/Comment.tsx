import StarRating from '../starRating/StartRating'

const Comment: React.FC<{img:string,name:string}> = ({ img, name }) => {
	return (
		<div className='w-full max-w-3xl rounded-xl border border-gray-800 bg-white/5 p-4 grid grid-cols-[80px_1fr] gap-4 shadow-lg'>

	{/* Usuario */}

	<div className='flex flex-col items-center'>
		<img src={img} alt={name} className='w-14 h-14 rounded-full object-cover ' />
		<p className='text-sm mt-2 text-white text-center line-clamp-1'>{name}</p>
	</div>

	{/* Caja de comentario */}

	<div className='flex flex-col justify-between'>
		<div className='flex flex-col gap-2'>
			<StarRating rating={4} />
			<textarea
				className='text-sm text-white p-3 rounded-md h-[140px] bg-gray-800/40 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-quaternary resize-none'
				placeholder='Escribe aquí...'
			/>
		</div>

		<div className='flex justify-end'>
			<button className='bg-[#00a878] w-[150px] h-[36px] mt-3 rounded-md font-medium text-sm text-white hover:scale-105 transition-transform'>
				Comentar
			</button>
		</div>
	</div>
</div>

	)
}
export default Comment
