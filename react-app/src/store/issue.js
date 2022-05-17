import { setUser } from './session';

// constants
const LOAD_ISSUES = 'issue/LOAD_ISSUES';
const NEW_ISSUE = 'issue/NEW_ISSUE';
const REMOVE_ISSUE = 'issue/REMOVE_ISSUE';

const loadIssues = (issues) => ({
    type: LOAD_ISSUES,
    issues,
});

// for create and edit
const newIssue = (issue) => ({
    type: NEW_ISSUE,
    issue,
});

const removeIssue = (id) => ({
    type: REMOVE_ISSUE,
    id,
});

export const fetchIssues = () => async (dispatch) => {
    const res = await fetch(`/api/issues/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadIssues(data));
    }
};

export const createIssue = (issue) => async (dispatch) => {
    const res = await fetch(`/api/issues/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(newIssue(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const editIssue = (issue) => async (dispatch) => {
    const res = await fetch(`/api/issues/${issue.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue),
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

export const deleteIssue = (issueId) => async (dispatch) => {
    const res = await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
        dispatch(removeIssue(issueId));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

// State shape:
// state.issues --> {
//   [id]: {
//     id, submitter_id, assignee_id, project_id, project_idx, title, body, type_id, created_at, updated_at,
//     submitter: {id, ...},
//     assignee: {id, ...},
//     issues: [id, ...],
//   },
//   [id]: {
//     id, submitter_id, assignee_id, project_id, project_idx, title, body, type_id, created_at, updated_at,
//     submitter: {id, ...},
//     assignee: {id, ...},
//     issues: [id, ...],
//   },
// }


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ISSUES: {
            const newState = { ...state };
            action.issues.forEach(issue => {
                newState[issue.id] = issue;
            });
            return newState;
        }
        case NEW_ISSUE: {
            const newState = {
                ...state,
                [action.issue.id]: action.issue,
            };
            return newState;
        }
        case REMOVE_ISSUE: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}
