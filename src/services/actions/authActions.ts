// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { api } from '../../utils/api.ts';


export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const SET_USER_REQUEST = 'GET_USER_REQUEST';
export const SET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const SET_USER_FAILED = 'GET_USER_FAILED';

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
})

export const fetchUserDetails = () => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST
        })
        const executeUserDetails = async () => {
            try {
                const result = await api.getUserRequest();
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: result.user,
                })
                dispatch(setAuthChecked(true));
            } catch (error) {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: { message: error.message, status: error.status },
                })
                dispatch(setAuthChecked(true));
            }
        }
        executeUserDetails();
    }
}

export const fetchUpdateUser = (values) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST
        })
        const executeUpdateUser = async () => {
            try {
                const result = await api.updateUserRequest(values);
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: result.user,
                })
            } catch (error) {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: error,
                })
            }
        }
        executeUpdateUser();
    }
}

export const fetchLogin = (values) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST
        })
        const executeLogin = async () => {
            try {
                const result = await api.loginRequest(values);
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: result.user,
                })
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                localStorage.removeItem('resetPassword');
            } catch (error) {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: error,
                })
            }
        }
        executeLogin();
    }
}

export const fetchRegister = (values) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST
        })
        const executeRegister = async () => {
            try {
                const result = await api.registerRequest(values);
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: result.user,
                })
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
            } catch (error) {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: error,
                })
            }
        }
        executeRegister();
    }
}

export const fetchLogout = () => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST
        })
        const executeRegister = async () => {
            try {
                const result = await api.logoutRequest();
                if (result.message === 'Successful logout') {
                    dispatch({
                        type: SET_USER_SUCCESS,
                        payload: null,
                    });
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            } catch (error) {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: error,
                })
            }
        }
        executeRegister();
    }
}
