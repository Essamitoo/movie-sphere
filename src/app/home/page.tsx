'use client'
import { useState } from 'react'
import Card from '@/components/card/Card'
import { mediaList } from '@/utils/utils'
import { IMedia } from '@/interfaces/IMedia'
import { useAuth } from "@/store/useAuth";

const HomePage = () => {
	const { setData, logout } = useAuth();
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
			<button
						onClick={logout}
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer"
					  >
						Cerrar sesión
					  </button>
						<button
						onClick={() => setData({ name: "Pepe", email: "franco@email.com",favorites:["1","2","4"],views:["3","7"],criticas:["1","2"],cuenta:"Free",list:["1","2"],image:"https://th.bing.com/th/id/OIP.CO3XC04tdvus7TFR4p3dTwHaIU?pid=ImgDet&w=191&h=214&c=7" })}
						className="mt-4 px-4 py-2 bg-blue-400 text-black rounded hover:cursor-pointer"
					  >
						Cuenta Free (Demo)
					  </button>
						<button
						onClick={() => setData({ name: "Franco", email: "franco@email.com",favorites:["1","2","4"],views:["3","7"],criticas:["1","2"],cuenta:"Premium",list:["1","2"],image:"https://th.bing.com/th/id/OIP.CO3XC04tdvus7TFR4p3dTwHaIU?pid=ImgDet&w=191&h=214&c=7" })}
						className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:cursor-pointer"
					  >
						Cuenta Premium (Demo)
					  </button>
			<div className='flex gap-4 justify-around'>
				<div className="flex justify-around w-[20%]">
					<button onClick={() => setFilter('')} className='flex flex-col hover:cursor-pointer'>
						VER TODO{filter === '' && <div className='bg-[#00A878] h-1'></div>}
					</button>
					<button onClick={() => {setFilter('movie')
						setCurrentPage(1)}} className='flex flex-col hover:cursor-pointer'>
						Peliculas
						{filter === 'movie' && <div className='bg-[#00A878] h-1'></div>}
					</button>
					<button onClick={() => {setFilter('serie')
						setCurrentPage(1)}} className='flex flex-col hover:cursor-pointer'>
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
				setCurrentPage(1)
                }}>2024</button>
							<button onClick={() => {
                setYearFilter('2023') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>2023</button>
							<button onClick={() => {
                setYearFilter('') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>Todos los Años</button>
						</div>}
					</details>
					<details className='flex flex-col w-[150px]' open={openDetails==='genre'}>
						<summary className={`cursor-pointer ${genreFilter&&"text-[#00A878]"}`} onClick={() => setOpenDetails('genre')}>{genreFilter === '' ? 'Genero' : genreFilter}</summary>
						{openDetails === 'genre'&&<div className='flex absolute flex-col bg-[#202020] z-4 w-[150px]'>
							<button onClick={() => {
                setGenreFilter('Acción') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>Acción</button>
							<button onClick={() => {
                setGenreFilter('Drama') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>Drama</button>
							<button onClick={() => {
                setGenreFilter('Ciencia Ficción') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>Ciencia Ficción</button>
							<button onClick={() => {
                setGenreFilter('') 
                setOpenDetails(null)
				setCurrentPage(1)
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
			  setCurrentPage(1)
              }}>18+</button>
							<button onClick={() => {
                setAgeFilter('16+')
                setOpenDetails(null)
				setCurrentPage(1)
                }}>16+</button>
							<button onClick={() => {
                setAgeFilter('ATP') 
                setOpenDetails(null)
				setCurrentPage(1)
                }}>ATP</button>
							<button onClick={() => {
                setAgeFilter('') 
                setOpenDetails(null)
				setCurrentPage(1)
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
			  setCurrentPage(1)
						}} className={`cursor-pointer ${booleanFilter?"text-[#00A878]": "text-gray-400/70"}`}
					>
						LIMPIAR FILTRO {countFilter>0&&`[${countFilter}]`}
					</button>
				</div>
			</div>
			{displayedItems.length>0?<div className='grid grid-cols-5'>
				{displayedItems.map((item) => (
					<Card key={item.id} {...item} />
				))}
			</div>:<div className='flex justify-center items-center h-[50vh] w-full'>
					<p className='text-center font-bold text-3xl'>
					No se encontraron peliculas o series
					</p>
				</div>}
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
