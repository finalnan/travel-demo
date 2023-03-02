import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import './Types.scss';

interface TypesInterface {
  apartment: number;
  villa: number;
  penthouse: number;
  bungalow: number;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmY2JiMmUxODQwMjU0NDFlYjc0N2JiIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjc3NTY4NTcyLCJleHAiOjE2Nzc1NzIxNzJ9.C1RlFAUZPUeSzyyi8oVzdHqMCpZTjnlrQBHXuPjKY1s';

const Types = () => {
  const [types, setTypes] = useState<TypesInterface | null>();

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/room/types`, {
          headers: {
            Authorization: `Bearen ${token}`,
          },
        });
        const types = await response.json();
        setTypes(types);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTypes();
  }, [token]);

  return (
    <section id="services" className="types__container">
      <div className="wrapper">
        <div className="title">
          <h5>Residing place</h5>
          <h2>What type of place you want</h2>
        </div>
        <div className="types">
          {!types ? (
            <div>Loading...</div>
          ) : (
            Object.entries(types).map(([key, value]) => (
              <Link to={`/types/${key}`} key={key + value} className="type">
                <div className="imgWrapper">
                  <img src="/assets/img7.jpg" alt="type" />
                </div>
                <span>
                  {key} {value}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Types;
