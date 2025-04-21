import CreateActor from './CreateActor'
import DeleteActor from './DeleteActor'
import EditarActor from './EditActor'
import SearchActor from './SearchActor'

const ManageActors = () => {
	return (
		<div>
			<div className='flex gap-4 w-full'>
				<div className='w-1/2'>
					<CreateActor />
				</div>
				<div className='w-1/2'>
					<SearchActor />
				</div>
				{/* <div>
        <EditarActor/>
    </div> */}
			</div>

			{/* <div className='mt-4'>
        <DeleteActor/>
      </div> */}
		</div>
	)
}

export default ManageActors
