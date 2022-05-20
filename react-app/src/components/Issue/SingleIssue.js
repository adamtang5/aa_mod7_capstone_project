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

    const toggleTitleToDisplay = e => {
        setShowDisplayTitle(true);
        setShowEditTitle(false);
        setShowTitleActions(false);
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
            </div>
            <div className="issue-meta fixed">

            </div>
        </div>
    )
};

export default SingleIssue;
