interface Props {
    text: string
}

const EmptyState = ({text}: Props) => (
    <div className='flex justify-center items-center h-[30vh] w-full'>
      <h2 className='text-center text-3xl'>
        {text}
      </h2>
    </div>
  )
  
  export default EmptyState
  