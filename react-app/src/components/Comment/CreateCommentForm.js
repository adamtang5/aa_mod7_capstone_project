import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comment';
import Avatar from '../Icons/Avatar';

const CreateCommentForm = ({ issue }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [body, setBody] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        setSubmitDisabled(!body);
    }, [body]);

    const handleEditCancel = e => {
        setBody('');
        setShowForm(false);
    };

    const handleBodyEditSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            user_id: sessionUser.id,
            issue_id: issue.id,
            body,
        };

        const data = await dispatch(createComment(comment));
        if (data && Array.isArray(data)) {
            setErrors(data.errors);
        } else {
            setBody('');
            setShowForm(false);
        }
    };

    return (
        <div id="create-comment-form" className="flex-row">
            <div className="current-user">
                <Avatar user={sessionUser} />
            </div>
            <div className="dynamic-form">
                <div className={`activate-form${showForm ? ' hidden' : ''}`}>
                    <div
                        className="activate-form-text cursor-pointer"
                        onClick={e => setShowForm(true)}
                    >
                        Add comment
                    </div>
                </div>
                <textarea
                    className={`edit-body${showForm ? '' : ' hidden'}`}
                    onChange={e => setBody(e.target.value)}
                    value={body}
                    placeholder="Add a comment..."
                />

                <div className="errors">
                    {errors?.map((error, ind) => (
                        <div key={ind} className="error-text">{error}</div>
                    ))}
                </div>

                <div className={`body-actions flex-row${showForm ? '' : ' hidden'}`}>
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
    )
};

export default CreateCommentForm;
