import { useState, FormEvent } from 'react';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

import './Create.scss';

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [review, setReview] = useState('');
  const [typeError, setTypeError] = useState(false);

  const { token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const acceptabelTypes = ['apartment', 'penthouse', 'bungalow', 'villa'];

    if (!acceptabelTypes.includes(type)) {
      setTypeError(true);
      setTimeout(() => {
        setTypeError(false);
      }, 10 * 100);
      return;
    }
    try {
      const formData = new FormData();

      let filename = '';

      if (img) {
        formData.append('file', img);

        const data = await fetch(`http://localhost:3001/api/room/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        filename = data.filename;
      }

      const response = await fetch(`http://localhost:3001/api/room`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          country,
          type,
          img: filename,
          price: parseFloat(price),
          review: parseInt(review),
        }),
      });
      const newRoom = await response.json();
      navigate(`/typeDetail/${newRoom._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create__container">
      <div className="wrapper">
        <h2>Create Room</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="inputWrapper">
            <label>Description: </label>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <div className="inputWrapper">
            <label>Country: </label>
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          <div className="inputWrapper">
            <label>Type: </label>
            <input
              type="text"
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </div>

          <div className="inputWrapper__img">
            <label className="file" htmlFor="img">
              Image: <span>Upload</span>
            </label>
            <input
              onChange={(e) => setImg(e.target.files![0])}
              type="file"
              id="img"
              style={{ display: 'none' }}
              multiple={false}
            />
            {img && (
              <p className="img__title">
                {img.name}
                <AiOutlineCloseCircle
                  className="icon"
                  onClick={() => setImg(null)}
                />
              </p>
            )}
          </div>
          <div className="inputWrapper">
            <label>Price: </label>
            <input
              type="number"
              step={0.01}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="inputWrapper">
            <label>Review: </label>
            <input
              type="number"
              step={1}
              min={1}
              max={5}
              placeholder="Review"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            />
          </div>
          <div className="btn__wrapper">
            <button type="submit">Create Room</button>
          </div>
        </form>
        {typeError && (
          <div className="error">
            Wrong Type! Acceptable types are- apartment, villa, penthouse and
            bungalow
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
