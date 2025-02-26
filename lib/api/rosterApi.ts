import axios from 'axios';
import {
  TRoster
} from '@definitions/roster';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/rosters`;

export async function getAllUserRosters(): Promise<TRoster[]> {
  try {
    return axios.get<TRoster[]>(`${API_ROOT}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch user's campaign roster: ${(error as Error).message}`)
   }
}

export async function getRosterById(id: string): Promise<TRoster> {
  try {
    return axios.get<TRoster>(`${API_ROOT}/${id}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch user's campaign roster: ${(error as Error).message}`)
   }
}

export async function getCampaignRoster(campaignId: string): Promise<TRoster> {
  try {
    return axios.get<TRoster>(`${API_ROOT}/campaign/${campaignId}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch user's campaign roster: ${(error as Error).message}`)
   }
}
