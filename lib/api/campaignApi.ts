import axios from 'axios';
import { TCampaign } from '@definitions/campaign';

const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT_URL;

export const fetchActiveUserCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/api/campaigns/active`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch user campaigns: ${(error as Error).message}`)
  }
}

export const fetchCampaign = async (id: string): Promise<TCampaign> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/api/campaigns/${id}`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch campaign: ${(error as Error).message}`)
  }
}
