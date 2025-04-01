import StarRating from '../starRating/StartRating'

const Comment: React.FC<{img:string,name:string}> = ({ img, name }) => {
	return (
		<div className='rounded-xl w-[60%] h-[230px] text-black grid grid-cols-[20%_80%] border border-gray-700/60 p-2'>
			<div className='flex flex-col items-center'>
				<img src={img} alt='' className='w-12 h-12 rounded-full' />
				<p className='font-semibold text-sm'>{name}</p>
			</div>
			<div className='flex flex-col'>
				<div className='flex flex-col bg-gray-100/40'>
					<StarRating rating={4} />
					<input className='text-sm text-center border border-gray-700/60 h-[140px]'placeholder='Escribe aqui...'/>
				</div>
                <div className="w-full flex justify-end items-center">
				<button className='bg-[#00a878] w-[150px] h-[30px] p-1 rounded font-medium text-sm mt-2 text-center hover:cursor-pointer hover:scale-105 text-white'>
					Comentar
				</button>
                </div>
			</div>
		</div>
	)
}
export default Comment
