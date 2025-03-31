'use client'
import { useAuth } from "@/store/useAuth"

const UserInfo = () => {

    const {data} = useAuth()

  return (
		<div>
			<h1>Bienvenido, {data?.name}</h1>
			<div>
				<h3>Informacion del usuario:</h3>
				<p>Nombre: {data?.name}</p>
				<p>Email: {data?.email}</p>
				<p>Numero de peliculas vistas: {data?.views}</p>
                <p>Numero de peliculas favoritas: {data?.favorites}</p>
                <p>Numero de criticas: {data?.criticas}</p>
                <p>Tipo de usuario:{data?.cuenta}</p>
                <img src={data?.image} alt={data?.name} />
			</div>
		</div>
	)
}

export default UserInfo