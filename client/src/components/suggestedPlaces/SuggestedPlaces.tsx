import { useState, useEffect } from 'react';

import { useAppSelector } from '../../redux/store';
import { PlaceType } from '../../types/types';
import Place from '../place/Place';

import './SuggestedPlaces.scss';

const SuggestedPlaces = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchTypeRooms = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/room', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setPlaces(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTypeRooms();
  }, [token]);

  return (
    <section id="suggested" className="suggested__container">
      <div className="wrapper">
        <div className="title">
          <h5>Most visited places</h5>
          <h2>Favourite destination of our clients</h2>
        </div>
        <div className="places">
          {places.map((place) => (
            <Place
              key={place._id}
              id={place._id}
              img={place.img}
              price={place.price}
              country={place.country}
              title={place.title}
              review={place.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedPlaces;
