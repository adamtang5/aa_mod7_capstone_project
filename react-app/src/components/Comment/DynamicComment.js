import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from '../../store/comment';
import Avatar from "../Icons/Avatar";

const DynamicComment = ({ comment }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [body, setBody] = useState(comment?.body);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        setSubmitDisabled(!body);
    }, [body]);

    const handleEditCancel = e => {
        setBody(comment?.body);
        setShowForm(false);
    };

    const toggleBodyToEdit = e => {
        setBody(comment?.body);
        setShowForm(true);
    }

    const handleBodyEditSubmit = async (e) => {
        e.preventDefault();
        const updatedComment = {
            id: comment?.id,
            user_id: sessionUser.id,
            issue_id: comment?.issue_id,
            body,
        };

        const data = await dispatch(editComment(updatedComment));
        if (data && Array.isArray(data)) {
            setErrors(data.errors);
        } else {
            setBody('');
            setShowForm(false);
        }
    };

    return (
        <div className="comment-card flex-row">
            <div className="comment-user">
                <Avatar user={comment.user} />
            </div>
            <div className="comment-content">
                <div className="comment-meta flex-row">
                    <div className="display-name">
                        {comment.user.display_name}
                    </div>
                    <div className="comment-created">
                        <Moment fromNow>{comment.created_at}</Moment>
                    </div>
                </div>
                <div className={`comment-body${showForm ? ' hidden' : ''}`}>
                    <p>{comment.body}</p>
                </div>
                <div className={`comment-actions flex-row${showForm ? ' hidden' : ''}`}>
                    <div
                        className="comment-edit cursor-pointer"
                        onClick={toggleBodyToEdit}
                    >Edit</div>
                    <div
                        className="comment-delete cursor-pointer"
                    // onClick={ }
                    >Delete</div>
                </div>
                <div className={`comment-edit-form${showForm ? '' : ' hidden'}`}>
                    <textarea
                        className="edit-body"
                        onChange={e => setBody(e.target.value)}
                        value={body}
                    />

                    <div className="errors">
                        {errors?.map((error, ind) => (
                            <div key={ind} className="error-text">{error}</div>
                        ))}
                    </div>

                    <div className="edit-body-actions flex-row">
                        <div
                            className="button-submit button cursor-pointer"
                            onClick={handleBodyEditSubmit}
                            disabled={submitDisabled}
                        >
                            Save
                        </div>
                        <div
                            className="button cancel cursor-pointer"
                            onClick={handleEditCancel}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
};

export default DynamicComment;
