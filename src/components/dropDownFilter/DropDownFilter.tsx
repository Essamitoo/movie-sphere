import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const DropdownFilter = ({
  label,
  options,
  selected,
  onSelect,
  openDetails,
  setOpenDetails,
  id,
}: {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
  openDetails: string | null
  setOpenDetails: React.Dispatch<React.SetStateAction<string | null>>
  id: string
}) => {
  return (
    <details className="relative z-50 w-53" open={openDetails === id}>
      <summary
        className={`cursor-pointer rounded-lg px-2 flex items-center justify-around ${selected && 'text-tertiary'}`}
        onClick={(e) => {
          e.preventDefault()
          setOpenDetails(openDetails === id ? null : id)
        }}
      >
        <span>{selected === '' ? label : selected}</span>
        {/* Icono de despliegue */}
        <span className="ml-2 ">
          {openDetails === id ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </summary>
      {openDetails === id && (
        <div className="flex flex-col absolute bg-[#202020] w-full">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt === 'Todos los Años' || opt === 'Todos los Géneros' || opt === 'Todas las edades' ? '' : opt)
                setOpenDetails(null)
              }}
              className="text-left px-2 py-1 hover:bg-primary hover:cursor-pointer text-tertiary"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </details>
  )
}

export default DropdownFilter
