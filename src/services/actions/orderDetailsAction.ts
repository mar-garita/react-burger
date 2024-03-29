// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { sendOrderCreationRequest } from '../../utils/api.ts';
import { resetConstructor } from './burgerConstructorActions.ts';


export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';


export const resetOrderNumber = () => {
    return { type: RESET_ORDER_NUMBER, payload: {} }
}

export const dispatchOrderCreationRequest = (data) => {
    return (dispatch) => {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        const executeOrderCreationRequest = async () => {
            try {
                const result = await sendOrderCreationRequest(data);
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    payload: result.order.number
                });
                dispatch(resetConstructor());
            } catch (error) {
                dispatch({
                    type: POST_ORDER_FAILED,
                    payload: error
                });
            }
        }
        executeOrderCreationRequest();
    }
}
