import { apiConfig } from './api-config.js';


const getResponseData = (response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export const getIngredientsData = async () => {
    return fetch(`${apiConfig.baseUrl}/api/ingredients`)
        .then(response => getResponseData(response))
        .then(data => { return data })
}

export const sendOrderCreationRequest = async (orderData) => {
    return fetch(`${apiConfig.baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"ingredients": orderData}),
    })
        .then(response => getResponseData(response))
        .then(data => { return data })
}
