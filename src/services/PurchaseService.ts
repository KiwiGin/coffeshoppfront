import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/purchase';

interface ProductTrend {
    name: string;
    cantidad_vendida: number;
}

export const getProductTrend = async (): Promise<ProductTrend[]> => {
    try {
        const response = await axios.get<ProductTrend[]>(REST_API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto tendencia:', error);
        throw error;
    }
};