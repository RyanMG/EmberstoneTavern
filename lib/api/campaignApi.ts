import axios from 'axios';
import { TCampaign } from '@definitions/campaign';

const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT_URL;

export const fetchUserCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/api/campaign`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch user campaigns: ${(error as Error).message}`)
  }
}