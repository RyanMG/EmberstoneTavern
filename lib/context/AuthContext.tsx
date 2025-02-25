import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useStorage from '@hooks/useStorage';
import { useNotification } from '@context/NotificationContext';
import { useRouter } from 'expo-router';
import {
  TPerson
} from '@definitions/person'
import { fetchActiveUser } from '@api/personApi'
import { registerUser, loginUser } from '@api/authApi'
import axios from 'axios';

const TOKEN_KEY = 'auth_token';

const AuthContext = createContext<{
  authState: {
    token: string | null;
    authenticated: boolean | null;
    activeUser: TPerson | null;
  };
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => Promise<void>;
  loading: boolean;
}>({
  authState: {
    token: null,
    authenticated: null,
    activeUser: null
  },
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    return {
      success: false,
      message: 'Registration not implemented'
    }
  },
  login: async (email: string, password: string) => {
    return {
      success: false,
      message: 'Login not implemented'
    }
  },
  logout: async () => {},
  loading: true
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { showNotification } = useNotification();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    activeUser: TPerson | null;
  }>({
    token: null,
    authenticated: null,
    activeUser: null
  });

  axios.interceptors.response.use(response => {
    return response;
  }, (error) => {
    if (401 === error.response.status) {
      logout();
      showNotification('Session expired. Please log in again.');
      router.push('/(auth)/login');
    } else {
      return Promise.reject(error);
    }
  });

  /**
   * Register a user
   */
  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<{success: boolean, message: string}> => {
    const resp = await registerUser(firstName, lastName, email, password);

    if (resp.success) {
      login(email, password);
    }

    return resp;
  }

  /**
   * Set the auth token in state and for axios use
   */
  const setSession = async (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const activeUser = await fetchActiveUser(token);

    if ('error' in activeUser) {
      return;
    }

    setAuthState({
      token: token,
      authenticated: true,
      activeUser: activeUser
    })
  }

  /**
   * Log the user in by setting their auth token
   */
  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    const response = await loginUser(email, password);

    if (response.success && response.data) {
      await setSession(response.data);
      await setStorageItem(TOKEN_KEY, response.data);

      return {
        success: true,
        message: "User logged in successfully"
      };
    }

    return {
      success: false,
      message: response.message
    };
  }
  /**
   * Log the user out by removing their auth token
   */
  const logout = async () => {
    await removeStorageItem(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
      activeUser: null
    })
  }

  /**
  /**
   * Initial
   */
  useEffect(() => {
    (async () => {
      const token = await getStorageItem(TOKEN_KEY) as string | null;

      if (token) {
        await setSession(token);
      }

      setLoading(false);
    })()
  }, [])

  return (
    <AuthContext.Provider value={{
      authState,
      register,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
