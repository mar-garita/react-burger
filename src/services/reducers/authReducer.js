import {
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_AUTH_CHECKED
} from '../actions/authActions.js';


const initialState = {
    user: null,
    error: undefined,
    isLoading: false,
    isAuthChecked: false,
}

export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SET_USER_REQUEST): {
            return { ...state, isLoading: true }
        }
        case (SET_USER_SUCCESS): {
            return { ...state, user: action.payload, isLoading: false }
        }
        case (SET_USER_FAILED): {
            return { ...state, error: action.payload, isLoading: false }
        }
        case (SET_AUTH_CHECKED): {
            return { ...state, isAuthChecked: action.payload }
        }
        default: {
            return state;
        }
    }
}
