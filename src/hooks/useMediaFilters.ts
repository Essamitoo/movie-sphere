import { IMedia } from '@/interfaces/IMedia'

export const useMediaFilter = (
  list: IMedia[], 
  filters: { type: string, year: string, genre: string, age: string }
) => {
  return list.filter((item) => {
    const typeMatch = filters.type ? item.type === filters.type : true
    const yearMatch = filters.year ? item.date.includes(filters.year) : true
    const genreMatch = filters.genre ? item.genre.includes(filters.genre) : true
    const ageMatch = filters.age ? item.age === filters.age : true
    return typeMatch && yearMatch && genreMatch && ageMatch
  })
}
