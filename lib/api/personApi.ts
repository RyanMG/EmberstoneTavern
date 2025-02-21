import axios from 'axios';
import {
  TPerson
} from '@/lib/definitions/person'

const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT_URL;

/**
 * Fetch data for the active user
 */
export const fetchActiveUser = async (token: string): Promise<TPerson | { error: string }> => {
  try {
    const response = await axios.get(`${API_ROOT}/api/person`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    }

    return { error: 'Failed to fetch active user' };

  } catch (error) {
    return { error: `Failed to fetch active user: ${(error as Error).message}` };
  }
}
