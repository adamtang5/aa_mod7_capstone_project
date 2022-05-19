// constants
const LOAD_STATUSES = 'type/LOAD_STATUSES';

const loadStatuses = (statuses) => ({
    type: LOAD_STATUSES,
    statuses,
});

export const fetchStatuses = () => async (dispatch) => {
    const res = await fetch(`/api/statuses`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadStatuses(data));
    }
};

// State shape:
// state.statuses --> {
//   [id]: {
//     id, status, description,
//     next: [
//       {id, status, description},
//       {id, status, description},
//     ],
//   },
//   [id]: {
//     id, status, description,
//     next: [
//       {id, status, description},
//       {id, status, description},
//     ],
//   },
// }

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STATUSES: {
            const newState = { ...state };
            action.statuses.forEach(status => {
                newState[status.id] = status;
            });
            return newState;
        }
        default:
            return state;
    }
}
