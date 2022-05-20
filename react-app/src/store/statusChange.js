import { newIssue } from './issue';

export const fetchStatusHistoryByIssue = (issueId) => async (dispatch) => {
    const res = await fetch(`/api/issues/${issueId}`);
    if (res.ok) {
        const issue = await res.json();
        dispatch(newIssue(issue));
        return issue;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const createStatusChange = (statusChange) => async (dispatch) => {
    const res = await fetch(`/api/status_changes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusChange),
    });

    if (res.ok) {
        const issue = await res.json();
        dispatch(newIssue(issue));
        return issue;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};
