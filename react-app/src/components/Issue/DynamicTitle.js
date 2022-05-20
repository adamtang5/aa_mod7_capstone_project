import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editIssue } from '../../store/issue';

const DynamicTitle = ({ issue }) => {
    const dispatch = useDispatch();

    const [showDisplayTitle, setShowDisplayTitle] = useState(true);
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showTitleActions, setShowTitleActions] = useState(false);
    const [title, setTitle] = useState(issue?.title);

    useEffect(() => {
        if (!showEditTitle) return;

        const closeEditTitle = () => {
            setShowEditTitle(false);
            setShowTitleActions(false);
            setShowDisplayTitle(true);
        };

        document.addEventListener('click', closeEditTitle);
        document.getElementById('title-input').focus();

        return () => {
            document.removeEventListener('click', closeEditTitle);
            setTitle(issue?.title);
        };
    }, [showEditTitle]);

    const toggleTitleToEdit = e => {
        setTitle(issue?.title);
        setShowDisplayTitle(false);
        setShowEditTitle(true);
        setShowTitleActions(true);
    };

    const handleTitleEditSubmit = async (e) => {
        e.stopPropagation();
        // e.preventDefault();

        await dispatch(editIssue({
            id: issue?.id,
            title,
        }));

        setShowDisplayTitle(true);
        setShowEditTitle(false);
        setShowTitleActions(false);
        await setTitle(issue?.title);
    };

    return (
        <>
            <div
                className={`display-title cursor-text${showDisplayTitle ? '' : ' hidden'}`}
                onClick={toggleTitleToEdit}
            >
                {issue?.title}
            </div>
            <input
                id="title-input"
                type='text'
                className={`display-title${showEditTitle ? '' : ' hidden'}`}
                onClick={e => e.stopPropagation()}
                onChange={e => setTitle(e.target.value)}
                // onBlur={toggleTitleToDisplay}
                value={title}
                required
            />
            <div
                className={`title-actions flex-row${showTitleActions ? '' : ' hidden'}`}
            >
                <div
                    className="title-action-buttons cursor-pointer"
                    onClick={handleTitleEditSubmit}
                >
                    <i className="fa-solid fa-check" />
                </div>
                <div
                    className="title-action-buttons cursor-pointer"
                // onClick={handleTitleEditCancel}
                >
                    <i className="fa-solid fa-xmark" />
                </div>
            </div>
        </>
    )
};

export default DynamicTitle;
