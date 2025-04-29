'use client'
import { useState } from 'react'
import { IMedia } from '@/interfaces/IMedia'
import { mediaList } from '@/utils/utils'
import MediaFilters from '@/components/mediaFilters/MediaFilters'
import EmptyState from '@/components/emptyState/EmpyState'
import Pagination from '@/components/pagination/Pagination'
import { useMediaFilter } from '@/hooks/useMediaFilters'
import MediaGrid from '@/components/mediaGrid/MediaGrid'
import { useAuthContext } from '@/contexts/authContext'
import GoogleAd from '@/ui/GoogleAd/GoogleAd'

const HomeView = () => {
	const {user} = useAuthContext()
	const [filters, setFilters] = useState({
		type: '',
		year: '',
		genre: '',
		age: '',
	})
	const [currentPage, setCurrentPage] = useState(1)
	const [openDetails, setOpenDetails] = useState<string | null>(null)
	const itemsPerPage = 10

	const filteredItems: IMedia[] = useMediaFilter(mediaList, filters)

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const displayedItems: IMedia[] = filteredItems.slice(startIndex, endIndex)

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='text-tertiary'>
			{user?.role !== 'PREMIUM' && <GoogleAd />}
			<div className='bg-secondary mx-auto w-full flex items-center justify-center mt-18'>
				<MediaFilters
					filters={filters}
					setFilters={setFilters}
					setCurrentPage={setCurrentPage}
					openDetails={openDetails}
					setOpenDetails={setOpenDetails}
				/>
			</div>

			{displayedItems.length > 0 ? (
				<MediaGrid items={displayedItems} />
			) : (
				<EmptyState text='No se encontraron peliculas' />
			)}

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default HomeView
