import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Icons/Avatar';

const CreateCommentForm = ({ issue }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [showEditBody, setShowEditBody] = useState(false);
    const [showBodyActions, setShowBodyActions] = useState(false);
    const [body, setBody] = useState('');

    const handleEditCancel = e => {

    };

    const handleBodyEditSubmit = e => {

    };

    return (
        <>
            <div className="create-comment-header">
                <Avatar user={sessionUser} />
            </div>
            <textarea
                className={`edit-body${showEditBody ? '' : ' hidden'}`}
                onChange={e => setBody(e.target.value)}
                value={body}
            />
            <div className={`body-actions flex-row${showBodyActions ? '' : ' hidden'}`}>
                <div
                    className="button-submit button body-action-buttons cursor-pointer"
                    onClick={handleBodyEditSubmit}
                >
                    Save
                </div>
                <div
                    className="button cancel body-action-buttons cursor-pointer"
                    onClick={handleEditCancel}
                >
                    Cancel
                </div>
            </div>
        </>
    )
};

export default CreateCommentForm;
