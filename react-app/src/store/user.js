import { setUser } from "./session";

// constants
const LOAD_USERS = 'user/LOAD_USERS';
const NEW_USER = 'user/NEW_USER';

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users,
});

// for create and edit
const newUser = (user) => ({
    type: NEW_USER,
    user,
});

export const fetchUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadUsers(data));
    }
};

export const editUser = (user) => async (dispatch) => {
    const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(newUser(user));
        dispatch(setUser(user));
        return user;
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
// state.users --> {
//   [id]: {
//     id, email, display_name, avatar_url, created_at, updated_at,
//     projects: [id, ...],
//     issues: [],
//   },
//   [id]: {
//     id, email, display_name, avatar_url, created_at, updated_at,
//     projects: [id, ...],
//     issues: [],
//   },
// }


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = { ...state };
            action.users.forEach(user => {
                newState[user.id] = user;
            });
            return newState;
        }
        case NEW_USER: {
            const newState = {
                ...state,
                [action.user.id]: action.user,
            };
            return newState;
        }
        default:
            return state;
    }
}
