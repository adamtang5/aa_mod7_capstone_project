import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackCard from "../BackCard";
import IssueKey from "./IssueKey";
import './SingleIssue.css';

const SingleIssue = () => {
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

        return () => document.removeEventListener('click', closeEditTitle);
    }, [showEditTitle]);

    const toggleTitleToEdit = e => {
        setShowDisplayTitle(false);
        setShowEditTitle(true);
        setShowTitleActions(true);
    };

    const toggleTitleToDisplay = e => {
        setShowDisplayTitle(true);
        setShowEditTitle(false);
        setShowTitleActions(false);
    };

    return (
        <div className="issue-page-container flex-row">
            <div className="issue-content scrollable">
                <nav className="flex-row">
                    <BackCard />
                    <IssueKey issue={issue} />
                </nav>
                <div className="issue-title">
                    {showDisplayTitle && (
                        <div
                            className="display-title cursor-text"
                            onClick={toggleTitleToEdit}
                        >
                            {issue?.title}
                        </div>
                    )}
                    {showEditTitle && (
                        <input
                            className="display-title"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    )}
                    {showTitleActions && (
                        <div
                            className="title-actions flex-row"
                        >
                            <div
                                className="title-action-buttons cursor-pointer"
                            >
                                <i className="fa-solid fa-check" />
                            </div>
                            <div
                                className="title-action-buttons cursor-pointer"
                                onClick={toggleTitleToDisplay}
                            >
                                <i className="fa-solid fa-xmark" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="issue-meta fixed">

            </div>
        </div>
    )
};

export default SingleIssue;
