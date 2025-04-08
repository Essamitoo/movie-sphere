const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => (
    <div className='flex justify-center items-center gap-2 p-4 mb-6 pt-0'>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-xl font-bold ${
            currentPage === index + 1
              ? 'bg-quaternary text-white'
              : 'bg-primary text-quinary cursor-pointer'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
  
  export default Pagination
  