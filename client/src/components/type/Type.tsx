import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

import { PlaceType } from '../../types/types';
import Place from '../place/Place';

import './Type.scss';

const Type = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const { type } = useParams();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/room?type=${type}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, [type, token]);

  return (
    <div className="type__container">
      <div className="wrapper">
        <div className="title">
          <h5>All {type}s</h5>
          <h2>Pick from the best {type}s</h2>
        </div>
        <div className="places">
          {places.map((place) => (
            <Place
              key={place._id}
              img={place.img}
              country={place.country}
              title={place.title}
              id={place._id}
              price={place.price}
              review={place.review}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Type;
