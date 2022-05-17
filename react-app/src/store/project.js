import { setUser } from "./session";

// constants
const LOAD_PROJECTS = 'project/LOAD_PROJECTS';
const NEW_PROJECT = 'project/NEW_PROJECT';
const REMOVE_PROJECT = 'project/REMOVE_PROJECT';

const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects,
});

// for create and edit
const newProject = (project) => ({
    type: NEW_PROJECT,
    project,
});

const removeProject = (id) => ({
    type: REMOVE_PROJECT,
    id,
});

export const fetchProjects = () => async (dispatch) => {
    const res = await fetch(`/api/projects/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProjects(data));
    }
};

export const createProject = (project) => async (dispatch) => {
    const res = await fetch(`/api/projects/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(newProject(data));
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

export const editProject = (project) => async (dispatch) => {
    const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });

    if (res.ok) {
        const project = await res.json();
        dispatch(newProject(project));
        return project;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
        dispatch(removeProject(projectId));
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
// state.projects --> {
//   [id]: {
//     id, name, key,
//     users: [id, ...],
//     issues: [id, ...],
//   },
//   [id]: {
//     id, name, key,
//     users: [id, ...],
//     issues: [id, ...],
//   },
// }


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PROJECTS: {
            const newState = { ...state };
            action.projects.forEach(project => {
                newState[project.id] = project;
            });
            return newState;
        }
        case NEW_PROJECT: {
            const newState = {
                ...state,
                [action.project.id]: action.project,
            };
            return newState;
        }
        case REMOVE_PROJECT: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}
