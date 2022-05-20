import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editIssue } from "../../store/issue";
import BackCard from "../BackCard";
import IssueKey from "./IssueKey";
import './SingleIssue.css';

const SingleIssue = () => {
    const dispatch = useDispatch();
    const { issueId } = useParams();
    const issue = useSelector(state => state.issues[+issueId]);
    const [showDisplayTitle, setShowDisplayTitle] = useState(true);
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showTitleActions, setShowTitleActions] = useState(false);
    const [title, setTitle] = useState(issue?.title);

    const [showDisplayBody, setShowDisplayBody] = useState(true);
    const [showEditBody, setShowEditBody] = useState(false);
    const [showBodyActions, setShowBodyActions] = useState(false);
    const [body, setBody] = useState(issue?.body);

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

    // useEffect(() => {
    //     if (!showEditBody) return;

    //     const closeEditBody = () => {
    //         setShowEditBody(false);
    //         setShowBodyActions(false);
    //         setShowDisplayBody(true);
    //     };

    //     document.addEventListener('click', closeEditBody);
    //     document.getElementById('body-input').focus();

    //     return () => {
    //         document.removeEventListener('click', closeEditBody);
    //         setBody(issue?.body);
    //     };
    // }, [showEditBody]);

    const toggleTitleToEdit = e => {
        setTitle(issue?.title);
        setShowDisplayTitle(false);
        setShowEditTitle(true);
        setShowTitleActions(true);
    };

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

    const handleBodyEditSubmit = async (e) => {
        e.stopPropagation();
        // e.preventDefault();

        await dispatch(editIssue({
            id: issue?.id,
            body,
        }));

        setShowDisplayBody(true);
        setShowEditBody(false);
        setShowBodyActions(false);
        await setBody(issue?.body);
    };

    return (
        <div className="issue-page-container flex-row">
            <div className="issue-content scrollable">
                <nav className="flex-row">
                    <BackCard />
                    <IssueKey issue={issue} />
                </nav>
                <div className="issue-title">
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
                </div>
                <div className="issue-body">
                    <h3 className="issue-body-header">Description</h3>
                    <div
                        className={`display-body cursor-text${showDisplayBody ? '' : ' hidden'}`}
                        onClick={toggleBodyToEdit}
                    >
                        {issue?.body}
                    </div>
                    <textarea
                        id="body-input"
                        className={`display-body${showEditBody ? '' : ' hidden'}`}
                        onClick={e => e.stopPropagation()}
                        onChange={e => setBody(e.target.value)}
                        value={body}
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
                </div>
            </div>
            <div className="issue-meta fixed">

            </div>
        </div>
    )
};

export default SingleIssue;
