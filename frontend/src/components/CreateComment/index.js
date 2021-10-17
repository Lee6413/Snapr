import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import './CreateComment.css';

const CreateComment = ({photoId}) => {
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId,
    content,
    photoId
    };

    try{
      const createdComment = await dispatch(createComment(payload));
      if (createdComment) {
        history.push(`/photos/${photoId}`);
      }
    } catch (err){
      const errorResponse = await err.json();
      const errorsArray = errorResponse.errors.filter(error => error !=="Invalid value")
      setErrors(errorsArray)

    }

  };

  return (
    <>
      {userId && (
        <form onSubmit={handleSubmit} className='form'>
          {errors.map((error)=>(
            <p key={error}>{error}</p>
          ))}
          <textarea
            className="textarea"
            type="text"
            placeholder="Comment Here"
            value={content}
            onChange={updateContent} />
          <div>
            <button className="button" type="submit">Post Comment</button>
          </div>
        </form>)
      }
    </>
  )
};

export default CreateComment;
