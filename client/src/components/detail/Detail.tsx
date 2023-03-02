import { useRef, useState, useEffect, FormEvent } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { PlaceType } from '../../types/types';
import { getDatesInRange, isUnavailable } from '../../utils/dateFunc';

import './Detail.scss';

const Detail = () => {
  const [roomDetail, setRoomDetail] = useState<PlaceType | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState<string | boolean>(false);
  const [success, setSuccess] = useState(false);

  const { token } = useAppSelector((state) => state.auth);
  const { id } = useParams();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`http://localhost:3001/api/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const room = await response.json();
      setRoomDetail(room);
    };

    fetchRoom();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bookedDates = getDatesInRange(startDate, endDate);

    if (!roomDetail) return;

    const isUnavailableDates = isUnavailable(roomDetail, bookedDates);

    if (isUnavailableDates) {
      const lastAvailableDate = new Date(
        roomDetail.unavailableDates[roomDetail.unavailableDates.length - 1]
      );
      const lastAvailableDay = lastAvailableDate.getDate();
      const lastAvailableMonth = lastAvailableDate.getMonth();

      const formattedMonth =
        lastAvailableMonth + 1 > 9
          ? `${lastAvailableMonth + 1}`
          : `0${lastAvailableMonth + 1}`;
      const formattedDay =
        lastAvailableDay > 9 ? `${lastAvailableDay}` : `0${lastAvailableDay}`;

      const formattedDate = `${formattedDay}-${formattedMonth}`;

      setError(formattedDate);
      setTimeout(() => {
        setError(false);
      }, 5000);

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/room/bookroom/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'PUT',
          body: JSON.stringify({
            unavailableDates: bookedDates,
          }),
        }
      );

      const updatedRoom = await response.json();

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 5000);

      setRoomDetail(updatedRoom);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!roomDetail) return <div>Loading...</div>;

  return (
    <div className="detail__container" ref={containerRef}>
      <div className="wrapper">
        <div className="leftSide">
          <div className="imgWrapper">
            <img
              src={`http://localhost:3001/images/${roomDetail.img}`}
              alt={roomDetail.title}
            />
          </div>
        </div>

        <div className="rightSide">
          <h2>{roomDetail.title}</h2>
          <p className="type">
            Type: <span>{roomDetail.type}</span>
          </p>
          <div className="review">
            Review: <AiFillStar className="icon" />
          </div>
          <p className="description">
            <span>Description: </span>
            {roomDetail.desc}
          </p>

          <div className="detail">
            <span>Country: {roomDetail.country}</span>
            <span className="price">
              <i>{roomDetail!.price}$</i> / person
            </span>
          </div>

          <form className="info_form" onSubmit={handleSubmit}>
            <h3>Enter Your Infomation</h3>
            <input
              type="text"
              placeholder="Full name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="date">
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>

            <button type="submit">Book Now</button>
          </form>
          {error && (
            <div className="error">
              Your date is in the booked range! Last booked day is {error}
            </div>
          )}
          {success && (
            <div className="success">
              Success! You booked from {startDate} to {endDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
