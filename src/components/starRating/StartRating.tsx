import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type StarRatingProps = {
    rating: number;
  };
const StarRating:React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" 
            style={{ stroke: "black", strokeWidth: 2 }}/>);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return <div className="flex space-x-1 text-3xl">{renderStars()}</div>;
};

export default StarRating;
