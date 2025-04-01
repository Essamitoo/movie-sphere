const Reparto = () => {
	return (
		<div className='flex flex-col  h-[250px]  w-full bg-black'>
            <p className="text-[#00A878] pl-10 text-xl font-semibold">Reparto</p>
			<div className='ml-[5%] grid grid-cols-6 w-[90%] gap-1 h-[150px]'>
				<div className="flex flex-col">
                <img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img2.acsta.net/c_162_216/pictures/23/07/26/21/51/1073414.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Ae-sim Kang</p>
                <p className="text-xs ">Personaje: Jang Geum-ja/149</p>
                </div>
                <div className="flex flex-col">
				<img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img2.acsta.net/c_162_216/medias/nmedia/18/79/29/04/19496216.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Jung-jae Lee</p>
                <p className="text-xs ">Personaje: Seong Gi-Hun/456</p></div>
                <div className="flex flex-col">
				<img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img3.acsta.net/c_162_216/pictures/15/06/22/14/14/546861.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Lee Byung-Hun</p>
                <p className="text-xs ">Personaje: Front man/In-ho/001</p></div>
                <div className="flex flex-col">
				<img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img3.acsta.net/c_162_216/pictures/23/07/26/21/41/3263675.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Yu-ri Jo</p>
                <p className="text-xs ">Personaje: Kim Jun-hee/222</p></div>
                <div className="flex flex-col">
				<img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img3.acsta.net/c_162_216/pictures/23/07/17/22/26/4889557.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Sung-Hoon Park</p>
                <p className="text-xs ">Personaje: Cho Hyun-ju/120</p></div>
                <div className="flex flex-col">
				<img
					className='p-1 w-[140px] h-[150px] rounded-xl'
					src='https://mx.web.img3.acsta.net/c_162_216/pictures/22/08/23/19/02/4236187.jpg'
					alt=''
				/>
                <p className="text-sm text-[#00A878]">Yang Dong-Geun</p>
                <p className="text-xs ">Personaje: Park Yong-sik/007</p></div>
			</div>
		</div>
	)
}
export default Reparto
