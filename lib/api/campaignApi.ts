import axios from 'axios';
import { TCampaign, TCampaignSetting } from '@definitions/campaign';
import { GenericHTTPResponse } from '@definitions/api';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/campaigns`;
const CAMPAIGN_CACHE: Record<string, TCampaignSetting[] | TCampaign | TCampaign[]> = {};

export const fetchActiveUserCampaigns = async (): Promise<TCampaign[]> => {
  if (CAMPAIGN_CACHE['active']) {
    return CAMPAIGN_CACHE['active'] as TCampaign[];
  }

  try {
   const { data } = await axios.get<TCampaign[]>(`${API_ROOT}/active`);

   CAMPAIGN_CACHE['active'] = data;
   return data;

  } catch (error) {
    throw new Error(`Failed to fetch user campaigns: ${(error as Error).message}`)
  }
}

export const getActiveUserCompletedCampaigns = async (): Promise<TCampaign[]> => {
  if (CAMPAIGN_CACHE['completed']) {
    return CAMPAIGN_CACHE['completed'] as TCampaign[];
  }
  try {
   const { data } = await axios.get<TCampaign[]>(`${API_ROOT}/completed`);

   CAMPAIGN_CACHE['completed'] = data;
   return data;

  } catch (error) {
    throw new Error(`Failed to fetch completed user campaigns: ${(error as Error).message}`)
  }
}

export const fetchCampaign = async (id: TCampaign['id']): Promise<TCampaign> => {
  try {
    if (CAMPAIGN_CACHE[id]) {
      return CAMPAIGN_CACHE[id] as TCampaign;
    }

   const { data } = await axios.get<TCampaign>(`${API_ROOT}/${id}`);

   CAMPAIGN_CACHE[id] = data;
   return data;

  } catch (error) {
    throw new Error(`Failed to fetch campaign: ${(error as Error).message}`)
  }
}

export const createCampaign = async (campaign: TCampaign): Promise<TCampaign> => {
  try {
   const { data } = await axios.post<TCampaign>(`${API_ROOT}`, campaign);

   CAMPAIGN_CACHE[data.id] = data;
   return data;

  } catch (error) {
    throw new Error(`Failed to create campaign: ${(error as Error).message}`)
  }
}

export const removeUserFromCampaign = async (campaignId: string, userId: string): Promise<GenericHTTPResponse<null>> => {
  try {
   const { data } = await axios.delete(`${API_ROOT}/${campaignId}/users/${userId}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to remove user from campaign: ${(error as Error).message}`)
  }
}

export const addUserToCampaign = async (campaignId: string, userId: string): Promise<GenericHTTPResponse<string>> => {
  try {
   const { data } = await axios.put(`${API_ROOT}/${campaignId}/users/${userId}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to add user to campaign: ${(error as Error).message}`)
  }
}

export const joinCampaign = async (campaignCode: string): Promise<GenericHTTPResponse<null>> => {
  try {
   const { data } = await axios.put(`${API_ROOT}/join/${campaignCode}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to join campaign: ${(error as Error).message}`)
  }
}

export const fetchCampaignSettings = async (): Promise<TCampaignSetting[]> => {
  try {
    if (CAMPAIGN_CACHE['settings']) {
      return CAMPAIGN_CACHE['settings'];
    }

    const { data } = await axios.get<TCampaignSetting[]>(`${API_ROOT}/settings`);

    CAMPAIGN_CACHE['settings'] = data;
    return data;

  } catch (error) {
    throw new Error(`Failed to fetch campaign settings: ${(error as Error).message}`)
  }
}
