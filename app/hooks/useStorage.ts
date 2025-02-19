import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export default function useStorage<T>() {
  const setStorageItem = async (key: string, value: T) => {
    let valueStr: string = typeof value !== 'string' ? JSON.stringify(value) : value;

    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(key, valueStr);
      } else { // mobile
        await SecureStore.setItemAsync(key, valueStr);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const getStorageItem = async (key: string): Promise<T | null> => {
    try {
      if (Platform.OS === 'web') {
        const result = await AsyncStorage.getItem(key);
        if (result) {
          return JSON.parse(result);
        } else {
          return null;
        }
      } else {
        const result = await SecureStore.getItemAsync(key);
        if (result) {
          return JSON.parse(result);
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  const removeStorageItem = async (key: string) => {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem
  }
}
