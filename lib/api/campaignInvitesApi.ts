import axios from 'axios';

import { GenericHTTPResponse } from '@definitions/api';
import { TCampaignInvite } from '@definitions/campaign';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/campaigns/invites`;

export const inviteMemberByEmail = async (campaignId: string, email: string): Promise<GenericHTTPResponse<null>> => {
  try {
   const { data } = await axios.post(`${API_ROOT}/${campaignId}`, {
     email
   });

   return data;
  } catch (error) {
    throw new Error(`Failed to invite member: ${(error as Error).message}`)
  }
}

export const fetchInvites = async (): Promise<TCampaignInvite[]> => {
  try {
    const { data } = await axios.get<TCampaignInvite[]>(`${API_ROOT}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch invites: ${(error as Error).message}`)
  }
}

export const acceptCampaignInvite = async (inviteId: number): Promise<GenericHTTPResponse<string>> => {
  try {
    const { data } = await axios.put(`${API_ROOT}/${inviteId}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to accept invite: ${(error as Error).message}`)
  }
}

export const declineCampaignInvite = async (inviteId: number): Promise<GenericHTTPResponse<null>> => {
  try {
    const { data } = await axios.delete(`${API_ROOT}/${inviteId}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to decline invite: ${(error as Error).message}`)
  }
}
