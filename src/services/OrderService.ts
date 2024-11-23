import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/orden';

export interface OrderDto {
    id?: number;
    productName?: string;
    quantity: number;
    date: Date;
  }

  export const registerOrder = async (order: OrderDto): Promise<OrderDto> => {
    try {
      const response = await axios.post<OrderDto>(REST_API_BASE_URL, order);
      return response.data;
    } catch (error) {
      console.error('Error al registrar la orden:', error);
      throw error;
    }
  };
