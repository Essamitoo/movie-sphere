import Link from "next/link"

const SideBar = () => {
  return (
    <div>
        <Link href={'/dashboard/lists'}>Guardados</Link>
        <p>hola</p>
    </div>
  )
}

export default SideBar