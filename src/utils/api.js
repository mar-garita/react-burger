import { apiConfig } from './api-config.js';


const request = (endpoint, options) => {
    const url = `${apiConfig.baseUrl}${endpoint}`;
    return fetch(url, options).then(getResponseData);
}

const getResponseData = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;

        return Promise.reject({ status: response.status, message: errorMessage });
    }
    return response.json();
}


export const getIngredientsData = async () => {
    return request('/api/ingredients');
}

export const sendOrderCreationRequest = async (orderData) => {
    try {
        return await request('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({'ingredients': orderData}),
        });
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            const accessToken = refreshData.accessToken;
            return await request('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify({'ingredients': orderData}),
            });
        } else {
            return Promise.reject(error);
        }
    }
}

// ------------------------ AUTH ------------------------ //

export const loginRequest = async (values) => {
    return request('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
}

export const registerRequest = async (values) => {
    return request('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export const passwordResetRequest = async (email) => {
    return request('/api/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
    });
}

export const passwordResetConfirm = async (values) => {
    return request('/api/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}

export const logoutRequest = async () => {
    return request('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
}

export const getUserRequest = async () => {
    try {
        return await request('/api/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken'),
            }
        });
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = await refreshToken();
            const accessToken = refreshData.accessToken;
            return await request('/api/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                }
            });
        } else {
            return Promise.reject(error);
        }
    }
}

export const updateUserRequest = async (values) => {
    try {
        return await request('/api/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(values),
    });
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            const accessToken = refreshData.accessToken;
            return await request('/api/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                }
            });
        } else {
            return Promise.reject(error);
        }
    }
}

// Обновляет accessToken, срок жизни которого 20 мин
export const refreshToken = async () => {
    try {
        const refreshData = await request('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        });

        if (!refreshData.success) {
            throw refreshData;
        }

        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);

        return refreshData;

    } catch (error) {
        return Promise.reject(error);
    }
};


export const api = {
    getUserRequest,
    updateUserRequest,
    loginRequest,
    registerRequest,
    passwordResetRequest,
    passwordResetConfirm,
    logoutRequest,
}
