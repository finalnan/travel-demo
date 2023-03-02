import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Place.scss';

interface Props {
  id: string;
  title: string;
  img: string;
  price: number;
  country: string;
  review: number;
}

const Place: React.FC<Props> = ({ id, title, img, price, country, review }) => {
  console.log(img);

  return (
    <Link to={`/typedetail/${id}`} key={id} className="place">
      <div className="imgWrapper">
        {/* <img src={img} alt={title} /> */}
        <img src={`http://localhost:3001/images/${img}`} />
      </div>
      <div className="detail">
        <span className="place__title">{title}</span>
        <span className="review">
          <AiFillStar className="icon" /> {review}
        </span>
      </div>
      <div className="detail">
        <span className="country">
          Country:<span>{country}</span>
        </span>
        <span className="price">
          <i>{price}$</i> / person
        </span>
      </div>
    </Link>
  );
};

export default Place;
