import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPhoto, } from '../../store/photos';
import { useHistory } from 'react-router-dom';
import './CreatePhoto.css';


const CreatePhoto = () => {
    //const photos = useSelector(state => state.photos);
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
        userId,
        title,
        imageUrl,
        description,
        };
        try{
            const createdPhoto = await dispatch(createPhoto(payload));
            if (createdPhoto) {
              history.push(`/photos/${createdPhoto.photo.id}`);
            }
        } catch (err){
            const errorResponse = await err.json();
            const errorsArray = errorResponse.errors.filter(error => error !=="Invalid value")
            setErrors(errorsArray)
        }

      };


  return (
    <>
      { userId && (
        <form onSubmit={handleSubmit} className='post-photo-form'>
          <div>
            <h3> Upload a new photo </h3>
          </div>
          <div>
          {errors.map((error)=>(
              <p key={error}>{error}</p>
          ))}
          </div>
          <div className="photo-title">
            <input
              className="photo-input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={updateTitle} />
          </div>
          <div className="photo-url">
            <input
            className="photo-input"
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={updateImageUrl} />
          </div>
          <div className="photo-text">
            <textarea
            className="photo-input photo-textarea"
            type="text"
            placeholder="description"
            value={description}
            onChange={updateDescription} />
          </div>
          <div className="photo-button">
            <button className="photo-input" type="submit">Create new photo</button>
          </div>
        </form>)
      }
    </>
  )
};

export default CreatePhoto;
