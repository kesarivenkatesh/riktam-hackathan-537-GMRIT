import isEmpty from '../validations/is_empty';

import { SET_CURRENT_USER, SET_KARMA_POINTS } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    karmaPoints: 0
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        case SET_KARMA_POINTS:
            return {
                ...state,
                karmaPoints: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;