import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editIssue } from "../../store/issue";
import BackCard from "../BackCard";
import DynamicBody from "./DynamicBody";
import DynamicTitle from "./DynamicTitle";
import IssueKey from "./IssueKey";
import './SingleIssue.css';

const SingleIssue = () => {
    const dispatch = useDispatch();
    const { issueId } = useParams();
    const issue = useSelector(state => state.issues[+issueId]);

    return (
        <div className="issue-page-container flex-row">
            <div className="issue-content scrollable">
                <nav className="flex-row">
                    <BackCard />
                    <IssueKey issue={issue} />
                </nav>
                <div className="issue-title">
                    <DynamicTitle issue={issue} />
                </div>
                <div className="issue-body">
                    <h3 className="issue-body-header">Description</h3>
                    <DynamicBody issue={issue} />
                </div>
            </div>
            <div className="issue-meta fixed">
                <h3 className="issue-status-header">Status</h3>

            </div>
        </div>
    )
};

export default SingleIssue;
