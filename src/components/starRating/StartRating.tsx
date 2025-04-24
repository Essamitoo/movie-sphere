'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { FaStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number 
  onChange?: Dispatch<SetStateAction<number>> 
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className='flex items-center'>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1
        return (
          <label key={index}>
            <input
              type='radio'
              name='rating'
              value={currentRating}
              onClick={() => onChange && onChange(currentRating)} // Usar onChange si existe
              className='hidden'
            />
            <FaStar
              className='cursor-pointer transition-colors duration-200'
              size={25}
              color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
