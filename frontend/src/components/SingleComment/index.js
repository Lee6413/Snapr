import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../store/comments';
import EditComment from '../EditComment';
import './SingleComment.css'

const SingleComment = ({comment}) => {
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();

    const [showEditForm, setShowEditForm] = useState(false);

    const ownerPermission = userId === comment?.userId;

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment));
    }

    if (!comment) {
        return null;
    }

    let content = null;
    if (showEditForm){
        content = (
            <EditComment comment={comment} hideForm={() => setShowEditForm(false)} />
          )
        }

    if(!comment){
        return null;
    }
    return (
      <main>
        <div id="comment">
            {!showEditForm &&
              <p key={comment.id}>
                {comment.content}
              </p>}
            {(ownerPermission && !showEditForm) ? <button className="edit-button" onClick={() => setShowEditForm(!showEditForm)}>Edit Comment</button> : null}
            {(ownerPermission && !showEditForm) ? <button className="delete-button" onClick={handleDelete}>Delete Comment</button> : null}
            {content}
              <br />
        </ div>
      </main>
    );
};

export default SingleComment;
