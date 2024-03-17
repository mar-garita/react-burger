import { TIngredient, TUser } from '../types/types.ts';


const url = 'https://norma.nomoreparties.space';

const checkResponse = <T>(response: Response): Promise<T> => {
    return response.ok ?
        response.json() :
        response.json().then(error => Promise.reject(error));
}

type TServerResponse<T> = {
    success: boolean,
} & T;

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[],
}>;

export const getIngredientsData = async () => {
    try {
        const response = await fetch(url + '/api/ingredients');
        return checkResponse<TIngredientsResponse>(response);
    } catch (error) {
        await Promise.reject(error)
    }
};

type TOrderCreationResponse = TServerResponse<{
    name: string,
    order: {
        createdAt: string,
        ingredients: TIngredient[],
        name: string,
        number: number,
        owner: {
            createdAt: string,
            email: string,
            name: string,
            updatedAt: string
        },
        price: number,
        status: string,
        updatedAt: string,
        _id: string,
    },
}>;

export const sendOrderCreationRequest = async (orderData: TIngredient[]) => {
    try {
        return await fetchWithRefresh<TOrderCreationResponse>(url + '/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken') || '',
            },
            body: JSON.stringify({'ingredients': orderData}),
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

// ------------------------ User ------------------------ //

type TUserResponse = TServerResponse<TUser>;

export const getUserRequest = async () => {
    try {
        return await fetchWithRefresh<TUserResponse>(url + '/api/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken') || '',
            },
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateUserRequest = async (values: {
    name: string,
    email: string,
    password: string,
}) => {
    try {
        return await fetchWithRefresh<TUserResponse>(url + '/api/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken') || '',
            },
            body: JSON.stringify(values),
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

// ------------------------ Auth ------------------------ //

type TAuthResponse = TServerResponse<{
    accessToken: string,
    refreshToken: string,
    user: TUser,
}>;

export const loginRequest = async (values: {
    email: string,
    password: string,
}) => {
    try {
        const response = await fetch(url + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        return checkResponse<TAuthResponse>(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const registerRequest = async (values: {
    name: string,
    email: string,
    password: string,
}) => {
    try {
        const response = await fetch(url + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return checkResponse<TAuthResponse>(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

type TMessageResponse = TServerResponse<{
    message: string,
}>;

export const passwordResetRequest = async (values: { email: string }) => {
    try {
        const response = await fetch(url +'/api/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return checkResponse<TMessageResponse>(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const passwordResetConfirm = async (values: {
    token: string,
    password: string,
}) => {
    try {
        const response = await fetch(url + '/api/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return checkResponse<TMessageResponse>(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const logoutRequest = async () => {
    const response = await fetch(url + '/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    return checkResponse<TMessageResponse>(response);
}

// ------------------------ Token ------------------------ //

type TRefreshToken = TServerResponse<{
    accessToken: string,
    refreshToken: string,
}>;

// Обновляет accessToken, срок жизни которого 20 мин
export const refreshToken = async () => {
    return await fetch(url + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        }).then(response => checkResponse<TRefreshToken>(response));
};

// Запрос с обновлением токена
export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse<T>(response);
    } catch (error) {
        if ((error as { message: string }).message === 'jwt expired') {
            const refreshData = await refreshToken();

            if (!refreshData.success) {
                Promise.reject(refreshData);
            }

            localStorage.setItem('accessToken', refreshData.accessToken);
            localStorage.setItem('refreshToken', refreshData.refreshToken);

            if (options.headers) {
                (options.headers as { [key: string]: string}).Authorization = refreshData.accessToken;
            }

            const response = await fetch(url, options);
            return await checkResponse<T>(response);
        } else {
            return Promise.reject(error);
        }
    }
}


export const api = {
    getUserRequest,
    updateUserRequest,
    loginRequest,
    registerRequest,
    passwordResetRequest,
    passwordResetConfirm,
    logoutRequest,
}
