import { apiConfig } from './api-config.js';


const request = (endpoint, options) => {
    const url = `${apiConfig.baseUrl}${endpoint}`;
    return fetch(url, options).then(getResponseData);
}

const getResponseData = (response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export const getIngredientsData = async () => {
    return request('/api/ingredients');
}

export const sendOrderCreationRequest = async (orderData) => {
    return request('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'ingredients': orderData}),
    });
}
