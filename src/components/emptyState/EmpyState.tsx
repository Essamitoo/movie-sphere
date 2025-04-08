interface Props {
    text: string
}

const EmptyState = ({text}: Props) => (
    <div className='flex justify-center items-center h-[50vh] w-full'>
      <p className='text-center font-bold text-3xl'>
        {text}
      </p>
    </div>
  )
  
  export default EmptyState
  