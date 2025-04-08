import { Cast } from "@/interfaces/IMedia";

const Reparto = ({reparto}:{reparto:Cast[]}) => {
	return (
	  <div className='flex flex-col h-[250px] w-full bg-black'>
		<p className="text-[#00A878] pl-10 text-xl font-semibold">Reparto</p>
		<div className='ml-[5%] grid grid-cols-6 w-[90%] gap-1 h-[150px]'>
		  {reparto.map((actor, index) => (
			<div className="flex flex-col" key={index}>
			  <img
				className='p-1 w-[140px] h-[150px] rounded-xl'
				src={actor.image}
				alt={actor.name}
			  />
			  <p className="text-sm text-[#00A878]">{actor.actor}</p>
			  <p className="text-xs">Personaje: {actor.name}</p>
			</div>
		  ))}
		</div>
	  </div>
	);
  };
  
  export default Reparto;
  