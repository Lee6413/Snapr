import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { retrievePhoto, deletePhoto } from '../../store/photos';
import EditPhoto from './../EditPhoto';
import CreateComment from '../CreateComment';
import CommentSection from '../CommentSection';
import './SinglePhotoPage.css';

export const SinglePhotoPage = () => {
  const { photoId } = useParams();
  const photos = useSelector(state => state.photos);
  const userId = useSelector(state => state.session.user?.id);
  const selectedPhoto = photos[photoId]
  const dispatch = useDispatch();
  const history = useHistory();

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try{
        await dispatch(retrievePhoto(photoId));
      } catch (err){
        console.log("Photo of specified ID cannot be retrieved at this time");
        history.push("/photos");
      }

    }
    fetchData();
  }, [dispatch, photoId, ]);


  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePhoto(selectedPhoto));
    history.push("/photos");
  }

  let content = null;
  if (showEditForm){
    content = (
      <EditPhoto photo={selectedPhoto} hideForm={() => setShowEditForm(false)} />
    )
  }

  if(!selectedPhoto){
    return null;
  }

  return (
    <div className="photo-detail-container">
      <div className="photo-detail">
        <div>
          <h4> {selectedPhoto.title} </h4>
        </div>
        <div>
         <img src={selectedPhoto.imageUrl} alt="" />
        </div>
        <div>
          <p>{selectedPhoto.description}</p>
        </div>
        <div className="row-button">
          <div>
            {selectedPhoto.userId === userId ? <button className="edit-button" onClick={() => setShowEditForm(!showEditForm)}>Edit Photo</button> : null}
          </div>
          <div>
            {selectedPhoto.userId === userId ? <button className="delete-button" onClick={handleDelete}>Delete Photo</button> : null}
          </div>
        </div>
        {content}
         <div className="photo-create-comment">
          <CreateComment photoId = {selectedPhoto.id} />
        </div>
        <div className="photo-comments">
          <CommentSection className="test" photoId = {selectedPhoto.id} />
        </div>
      </div>
    </div>
  )
}

export default SinglePhotoPage;
