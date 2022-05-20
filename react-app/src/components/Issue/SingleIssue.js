import { useState } from "react";
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
    const [title, setTitle] = useState(issue?.title);

    return (
        <div className="issue-page-container flex-row">
            <div className="issue-content scrollable">
                <nav className="flex-row">
                    <BackCard />
                    <IssueKey issue={issue} />
                </nav>
                <div className="issue-title">
                    {showDisplayTitle && (
                        <div className="display-title">
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
                </div>
            </div>
            <div className="issue-meta fixed">

            </div>
        </div>
    )
};

export default SingleIssue;
