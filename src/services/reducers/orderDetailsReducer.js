import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    RESET_ORDER_NUMBER,
} from '../actions/orderDetailsAction.js';


const initialState = {
    ingredients: [],
    isLoading: false,
    error: undefined,
    orderNumber: null,
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (POST_ORDER_REQUEST): {
            return { ...state, isLoading: true }
        }
        case (POST_ORDER_SUCCESS): {
            return { ...state, orderNumber: action.payload, isLoading: false }
        }
        case (POST_ORDER_FAILED): {
            return { ...state, error: action.payload, isLoading: false }
        }
        case (RESET_ORDER_NUMBER): {
            return { ...state, orderNumber: null }
        }
        default: {
            return state;
        }
    }
}
