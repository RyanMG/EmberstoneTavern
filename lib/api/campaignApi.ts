import axios from 'axios';
import { TCampaign } from '@definitions/campaign';
import { GenericHTTPResponse } from '@definitions/api';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/campaigns`;

export const fetchActiveUserCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/active`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch user campaigns: ${(error as Error).message}`)
  }
}

export const getActiveUserCompletedCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/completed`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch completed user campaigns: ${(error as Error).message}`)
  }
}

export const fetchCampaign = async (id: string): Promise<TCampaign> => {
  try {
   const { data } = await axios.get(`${API_ROOT}/${id}`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch campaign: ${(error as Error).message}`)
  }
}

export const createCampaign = async (campaign: TCampaign): Promise<TCampaign> => {
  try {
   const { data } = await axios.post(`${API_ROOT}`, campaign);

   return data;
  } catch (error) {
    throw new Error(`Failed to create campaign: ${(error as Error).message}`)
  }
}

export const removeUserFromCampaign = async (campaignId: string, userId: string): Promise<GenericHTTPResponse> => {
  try {
   const { data } = await axios.delete(`${API_ROOT}/${campaignId}/users/${userId}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to remove user from campaign: ${(error as Error).message}`)
  }
}

export const addUserToCampaign = async (campaignId: string, userId: string): Promise<GenericHTTPResponse> => {
  try {
   const { data } = await axios.put(`${API_ROOT}/${campaignId}/users/${userId}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to add user to campaign: ${(error as Error).message}`)
  }
}
