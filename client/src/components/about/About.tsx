import { useState } from 'react';

import { GiPalmTree } from 'react-icons/gi';
import { BiHappy } from 'react-icons/bi';
import { FaUmbrellaBeach } from 'react-icons/fa';

import './About.scss';

const About = () => {
  const [type, setType] = useState('');

  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {};

  return (
    <section id="about" className="about__container">
      <div className="about__wrapper">
        <div className="imgWrapper">
          <img src="/assets/img1.jpg" alt="background" />
        </div>
        <div className="title">
          <h5>Your dream vacations await you</h5>
          <h2>
            Book now for <span>20% off!</span>
          </h2>
        </div>
        <div className="inputsContainer">
          <div className="inputContainer">
            <span>
              Type <GiPalmTree className="icon" />
            </span>
            <select onChange={(e) => setType(e.target.value)}>
              <option disabled>Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Valia">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Bungalow">Bungalow</option>
            </select>
          </div>
          <div className="inputContainer">
            <span>
              First Day <BiHappy className="icon" />
            </span>
            <input
              type="text"
              placeholder="Type date..."
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <span>
              Last Day <FaUmbrellaBeach className="icon" />
            </span>
            <input
              type="text"
              placeholder="Type date..."
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="bookBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
