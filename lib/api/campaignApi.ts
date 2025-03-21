import axios from 'axios';
import {
  TCampaign,
  TCampaignSetting
 } from '@definitions/campaign';
import Campaign from '@classes/Campaign';
import { GenericHTTPResponse } from '@definitions/api';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/campaigns`;

export const fetchActiveUserCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get<TCampaign[]>(`${API_ROOT}/active`);
   return data;

  } catch (error) {
    throw new Error(`Failed to fetch user campaigns: ${(error as Error).message}`)
  }
}

export const getActiveUserCompletedCampaigns = async (): Promise<TCampaign[]> => {
  try {
   const { data } = await axios.get<TCampaign[]>(`${API_ROOT}/completed`);

   return data;

  } catch (error) {
    throw new Error(`Failed to fetch completed user campaigns: ${(error as Error).message}`)
  }
}

export const fetchCampaign = async (id: TCampaign['id']): Promise<Campaign> => {
  try {
    const { data }: { data: TCampaign } = await axios.get<TCampaign>(`${API_ROOT}/${id}`);
    return new Campaign(data);

  } catch (error) {
    throw new Error(`Failed to fetch campaign: ${(error as Error).message}`)
  }
}

export const createCampaign = async (campaign: TCampaign): Promise<Campaign['id']> => {
  try {
   const { data } = await axios.post<TCampaign>(`${API_ROOT}`, campaign);
   return data.id;

  } catch (error) {
    throw new Error(`Failed to create campaign: ${(error as Error).message}`)
  }
}

export const updateCampaign = async (campaign: TCampaign): Promise<Campaign> => {
  try {
   const { data } = await axios.put<TCampaign>(`${API_ROOT}/${campaign.id}`, campaign);
   return new Campaign(data);

  } catch (error) {
    throw new Error(`Failed to update campaign: ${(error as Error).message}`)
  }
}

export const deleteCampaign = async (campaignId: string): Promise<GenericHTTPResponse<null>> => {
  try {
   const { data } = await axios.delete(`${API_ROOT}/${campaignId}`);

   return data;
  } catch (error) {
    throw new Error(`Failed to delete campaign: ${(error as Error).message}`)
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
    const { data } = await axios.get<TCampaignSetting[]>(`${API_ROOT}/settings`);
    return data;

  } catch (error) {
    throw new Error(`Failed to fetch campaign settings: ${(error as Error).message}`)
  }
}
