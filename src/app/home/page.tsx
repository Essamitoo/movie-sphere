'use client'
import { useState } from 'react'
import Card from '@/components/card/Card'
import { mediaList } from '@/utils/utils'
import { IMedia } from '@/interfaces/IMedia'

const HomePage = () => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [yearFilter, setYearFilter] = useState('')
	const [genreFilter, setGenreFilter] = useState('')
	const [ageFilter, setAgeFilter] = useState('')
	const [openDetails, setOpenDetails] = useState<string | null>(null) 
	const itemsPerPage = 10
	const filteredItems: IMedia[] = mediaList.filter((item) => {
		const typeMatch = filter ? item.type === filter : true
		const yearMatch = yearFilter ? item.date.includes(yearFilter) : true
		const genreMatch = genreFilter ? item.genre.includes(genreFilter) : true
		const ageMatch = ageFilter ? item.age === ageFilter : true
		return typeMatch && yearMatch && genreMatch && ageMatch
	})

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const displayedItems: IMedia[] = filteredItems.slice(startIndex, endIndex)

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

	const handleScrollToTop = (n: number) => {
		setCurrentPage(n)
		window.scrollTo({
			top: 0,
			behavior: 'smooth', 
		})
	}
  const booleanFilter=yearFilter.length>0||genreFilter.length>0||ageFilter.length>0||filter.length>0;
  const countFilter=(yearFilter.length>0?1:0)+(genreFilter.length>0?1:0)+(ageFilter.length>0?1:0)+(filter.length>0?1:0);
	return (
		<div className='bg-[#202020] max-h-max min-h-lvh pb-5 text-white'>
			<div className='flex justify-center gap-2 p-5'>
				<img className='w-[48px] h-[48px] rounded-lg' src='https://th.bing.com/th/id/R.7c7a5ffd585e8780f4d46387eb161f93?rik=BjmA1Mqpxvuliw&pid=ImgRaw&r=0' alt='' />
				<img className='w-[48px] h-[48px] rounded-lg' src='https://th.bing.com/th/id/OIP.PmFNtBFSGTPzIp2lhp7uuAHaEL?pid=ImgDet&w=191&h=107&c=7' alt='' />
				<img className='w-[48px] h-[48px] rounded-lg' src='https://th.bing.com/th/id/OIP.uCNT2iqsyBGXddafSsC-zwHaEK?rs=1&pid=ImgDetMain' alt='' />
			</div>
			<div className='flex gap-4 justify-around'>
				<div className="flex justify-around w-[20%]">
					<button onClick={() => setFilter('')} className='flex flex-col hover:cursor-pointer'>
						VER TODO{filter === '' && <div className='bg-[#00A878] h-1'></div>}
					</button>
					<button onClick={() => setFilter('movie')} className='flex flex-col hover:cursor-pointer'>
						Peliculas
						{filter === 'movie' && <div className='bg-[#00A878] h-1'></div>}
					</button>
					<button onClick={() => setFilter('serie')} className='flex flex-col hover:cursor-pointer'>
						Series{filter === 'serie' && <div className='bg-[#00A878] h-1'></div>}
					</button>
				</div>
				<div className="flex justify-around w-[50%]">
					<details className='flex flex-col w-[150px]' open={openDetails==='year'}>
						<summary className={`cursor-pointer ${yearFilter&&"text-[#00A878]"}`} onClick={() => setOpenDetails('year')}>{yearFilter === '' ? 'Año de estreno' : yearFilter}</summary>
						{openDetails === 'year'&&<div className='flex flex-col absolute bg-[#202020] z-4 w-[150px]'>
							<button onClick={() => {
                setYearFilter('2024') 
                setOpenDetails(null)
                }}>2024</button>
							<button onClick={() => {
                setYearFilter('2023') 
                setOpenDetails(null)
                }}>2023</button>
							<button onClick={() => {
                setYearFilter('') 
                setOpenDetails(null)
                }}>Todos los Años</button>
						</div>}
					</details>
					<details className='flex flex-col w-[150px]' open={openDetails==='genre'}>
						<summary className={`cursor-pointer ${genreFilter&&"text-[#00A878]"}`} onClick={() => setOpenDetails('genre')}>{genreFilter === '' ? 'Genero' : genreFilter}</summary>
						{openDetails === 'genre'&&<div className='flex absolute flex-col bg-[#202020] z-4 w-[150px]'>
							<button onClick={() => {
                setGenreFilter('Acción') 
                setOpenDetails(null)
                }}>Acción</button>
							<button onClick={() => {
                setGenreFilter('Drama') 
                setOpenDetails(null)
                }}>Drama</button>
							<button onClick={() => {
                setGenreFilter('Ciencia Ficción') 
                setOpenDetails(null)
                }}>Ciencia Ficción</button>
							<button onClick={() => {
                setGenreFilter('') 
                setOpenDetails(null)
                }}>Todos los Géneros</button>
						</div>}
					</details>
					<details className='z-4 w-[180px]' open={openDetails==='age'}>
						<summary className={`cursor-pointer ${ageFilter&&"text-[#00A878]"}`} onClick={() =>setOpenDetails('age')}>
							{ageFilter === '' ? 'Clasificación por Edad' : ageFilter}
						</summary>
						{openDetails === 'age'&&<div className='flex flex-col absolute bg-[#202020] z-4 w-[180px]'>
							<button onClick={() => {
              setAgeFilter('18+') 
              setOpenDetails(null)
              }}>18+</button>
							<button onClick={() => {
                setAgeFilter('16+')
                setOpenDetails(null)
                }}>16+</button>
							<button onClick={() => {
                setAgeFilter('ATP') 
                setOpenDetails(null)
                }}>ATP</button>
							<button onClick={() => {
                setAgeFilter('') 
                setOpenDetails(null)
                }}>Todas las edades</button>
						</div>}
					</details>
					<button
						onClick={() => {
							setYearFilter('')
							setGenreFilter('')
							setAgeFilter('')
							setFilter('')
              setOpenDetails(null)
						}} className={`cursor-pointer ${booleanFilter?"text-[#00A878]": "text-gray-400/70"}`}
					>
						LIMPIAR FILTRO {countFilter>0&&`[${countFilter}]`}
					</button>
				</div>
			</div>
			<div className='grid grid-cols-5'>
				{displayedItems.map((item) => (
					<Card key={item.id} {...item} />
				))}
			</div>
			<div className='flex justify-center gap-2'>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => handleScrollToTop(index + 1)}
						className={`px-4 py-2 rounded-md ${
							currentPage === index + 1
								? 'bg-[#00A878] text-white'
								: 'bg-[#171717] text-[#00A878] border border-slate-100/40 hover:cursor-pointer'
						}`}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	)
}

export default HomePage
