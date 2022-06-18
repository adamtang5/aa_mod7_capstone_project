import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editIssue } from '../../store/issue';
import QuillEdit from './Quill/QuillEdit';

const DynamicBody = ({ issue }) => {
    const dispatch = useDispatch();

    const [showDisplayBody, setShowDisplayBody] = useState(true);
    const [showEditBody, setShowEditBody] = useState(false);
    const [showBodyActions, setShowBodyActions] = useState(false);
    const [body, setBody] = useState(issue?.body);

    const toggleBodyToEdit = e => {
        setBody(issue?.body);
        setShowDisplayBody(false);
        setShowEditBody(true);
        setShowBodyActions(true);
    };

    const toggleBodyToDisplay = e => {
        setShowDisplayBody(true);
        setShowEditBody(false);
        setShowBodyActions(false);
    };

    const handleBodyEditSubmit = async (e) => {
        e.stopPropagation();

        await dispatch(editIssue({
            id: issue?.id,
            title: issue?.title,    // data required
            body,
        }));

        setShowDisplayBody(true);
        setShowEditBody(false);
        setShowBodyActions(false);
        await setBody(issue?.body);
    };

    return (
        <>
            <div
                className={`display-body cursor-text${showDisplayBody ? '' : ' hidden'}`}
                onClick={toggleBodyToEdit}
                dangerouslySetInnerHTML={{ __html: issue?.body }}
            />
            {/* <textarea
                id="body-input"
                className={`display-body${showEditBody ? '' : ' hidden'}`}
                onClick={e => e.stopPropagation()}
                onChange={e => setBody(e.target.value)}
                value={body}
            /> */}
            <QuillEdit
                placeholder={""}
                className={`display-body${showEditBody ? '' : ' hidden'}`}
                value={body}
                setBody={setBody}
                elementId={"body-quill-toolbar"}
            />
            <div
                className={`body-actions flex-row${showBodyActions ? '' : ' hidden'}`}
            >
                <div
                    className="button-submit button body-action-buttons cursor-pointer"
                    onClick={handleBodyEditSubmit}
                >
                    Save
                </div>
                <div
                    className="button cancel body-action-buttons cursor-pointer"
                    onClick={toggleBodyToDisplay}
                >
                    Cancel
                </div>
            </div>
        </>
    )
};

export default DynamicBody;
