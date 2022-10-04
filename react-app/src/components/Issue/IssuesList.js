import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IssueRow from './IssueRow';
import { fetchTypes } from '../../store/type';
import { fetchStatuses } from '../../store/status';
import '../ListPage.css';
import './IssuesList.css';

const IssuesList = ({ pageTitle, mode }) => {
    const dispatch = useDispatch();
    let allIssues = useSelector(state => Object.values(state.issues));

    useEffect(() => {
        dispatch(fetchTypes());
        dispatch(fetchStatuses());
    }, [dispatch]);

    if (mode === "project") {
        allIssues = allIssues?.filter(issue => issue?.current_status?.status_id !== 7);
    }

    return (
        <div className="page-container">
            <header className="page-header flex-row">
                <h1 className="page-title">{pageTitle}</h1>
            </header>
            <div className="issue-count flex-row">
                {allIssues?.length} requests
            </div>
            <table className="issues-list striped-table">
                <thead id="table-head">
                    <tr className="head-row">
                        <th className="header-cell">Key</th>
                        <th className="header-cell">Summary</th>
                        <th className="header-cell">Reporter</th>
                        <th className="header-cell">Assignee</th>
                        <th className="header-cell">Status</th>
                        <th className="header-cell">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {allIssues?.map((issue, idx) => (
                        <IssueRow
                            key={issue?.id}
                            issue={issue}
                            idx={idx}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default IssuesList;
