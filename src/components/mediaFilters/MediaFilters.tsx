import DropdownFilter from "../dropDownFilter/DropDownFilter";


const MediaFilters = ({
  filters,
  setFilters,
  setCurrentPage,
  openDetails,
  setOpenDetails,
}: {
  filters: { type: string; year: string; genre: string; age: string }
  setFilters: React.Dispatch<
    React.SetStateAction<{ type: string; year: string; genre: string; age: string }>
  >
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  openDetails: string | null
  setOpenDetails: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return (
    <div className="flex p-4 gap-8">
      {/* Filtro de tipo */}

        <button
          onClick={() => {
            setFilters({ ...filters, type: '' })
            setCurrentPage(1)
          }}
          className="flex flex-col hover:cursor-pointer"
        >
          Ver todo
          {filters.type === '' && <div className="bg-[#00A878] h-1" />}
        </button>
        <button
          onClick={() => {
            setFilters({ ...filters, type: 'movie' })
            setCurrentPage(1)
          }}
          className="flex flex-col hover:cursor-pointer"
        >
          Películas
          {filters.type === 'movie' && <div className="bg-[#00A878] h-1" />}
        </button>
        <button
          onClick={() => {
            setFilters({ ...filters, type: 'serie' })
            setCurrentPage(1)
          }}
          className="flex flex-col hover:cursor-pointer"
        >
          Series
          {filters.type === 'serie' && <div className="bg-[#00A878] h-1" />}
        </button>
    

      {/* Año */}
      <DropdownFilter
        label="Año de estreno"
        options={['2024', '2023', 'Todos los Años']}
        selected={filters.year}
        onSelect={(value) => {
          setFilters({ ...filters, year: value })
          setCurrentPage(1)
        }}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        id="year"
      />

      {/* Género */}
      <DropdownFilter
        label="Género"
        options={['Acción', 'Drama', 'Ciencia Ficción', 'Todos los Géneros']}
        selected={filters.genre}
        onSelect={(value) => {
          setFilters({ ...filters, genre: value })
          setCurrentPage(1)
        }}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        id="genre"
      />

      {/* Edad */}
      <DropdownFilter
        label="Clasificación por Edad"
        options={['18+', '16+', 'ATP', 'Todas las edades']}
        selected={filters.age}
        onSelect={(value) => {
          setFilters({ ...filters, age: value })
          setCurrentPage(1)
        }}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        id="age"
      />

      {/* Botón limpiar filtros */}
      <div className="m-auto">
      <button
        onClick={() => {
          setFilters({ type: '', year: '', genre: '', age: '' })
          setOpenDetails(null)
          setCurrentPage(1)
        }}
        className={`cursor-pointer ${
          Object.values(filters).some((f) => f) ? 'text-quinary' : 'hidden'
        }`}
      >
        {`Limpiar filtro ( ${Object.values(filters).filter((f) => f).length} )`}
      </button>
      </div>
    </div>
  )
}

export default MediaFilters
