import axios from 'axios';
import { GenericHTTPResponse } from '@definitions/api';

const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT_URL;

export const registerUser = async (firstName: string, lastName: string, email: string, password: string): Promise<{success: boolean, message: string}> => {
  try {
    const resp = await axios.post(`${API_ROOT}/auth/register`, {
      firstName,
      lastName,
      email,
      password
    });

    if (resp.status === 200) {
      return {
        success: true,
        message: "User registered successfully"
      }
    }

    return {
      success: false,
      message: "Invalid username or password"
    }

  } catch (error) {
    return {
      success: false,
      message: (error as Error).message
    }
  }

}

export const loginUser = async (email: string, password: string): Promise<GenericHTTPResponse<string>> => {
  try {
    const resp = await axios.post(`${API_ROOT}/auth/login`, {
      email,
      password
    })

    if (resp.status === 200) {
      return resp.data;
    }

    return {
      success: false,
      data: "",
      message: "Invalid username or password"
    }

  } catch (error) {
    return {
      success: false,
      data: "",
      message: (error as Error).message
    }
  }
}
