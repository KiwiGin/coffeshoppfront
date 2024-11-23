import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/sale';

export const getDailySales = async (): Promise<number> => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}`);
        return response.data; // El backend devuelve un `double`
    } catch (error) {
        console.error('Error al obtener las ventas diarias:', error);
        throw error;
    }
};

/**
 * Registra una venta.
 * @returns {Promise<void>} Confirmación de que la venta fue registrada.
 */
export const registerSale = async (): Promise<void> => {
    try {
        await axios.post(`${REST_API_BASE_URL}`);
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        throw error;
    }
};