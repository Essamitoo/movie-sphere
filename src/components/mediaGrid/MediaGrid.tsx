import GridContainer from '@/components/grid/GridContainer'
import Card from '@/components/card/Card'
import { IMedia } from '@/interfaces/IMedia'

const MediaGrid = ({ items }: { items: IMedia[] }) => (
  <GridContainer>
    {items.map((movie) => (
      <Card key={movie.id} movie={movie} />
    ))}
  </GridContainer>
)

export default MediaGrid