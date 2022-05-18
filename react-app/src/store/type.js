// constants
const LOAD_TYPES = 'type/LOAD_TYPES';

const loadTypes = (types) => ({
    type: LOAD_TYPES,
    types,
});

export const fetchTypes = () => async (dispatch) => {
    const res = await fetch(`/api/types/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadTypes(data));
    }
};

// State shape:
// state.types --> {
//   [id]: {
//     id, type, description,
//   },
//   [id]: {
//     id, type, description,
//   },
// }

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TYPES: {
            const newState = { ...state };
            action.types.forEach(type => {
                newState[type.id] = type;
            });
            return newState;
        }
        default:
            return state;
    }
}
