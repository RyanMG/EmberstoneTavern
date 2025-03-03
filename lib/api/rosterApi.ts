import axios from 'axios';
import {
  TRoster,
  TRegiment
} from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';

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

export async function createCampaignRoster(campaignId: string, roster: TRoster): Promise<GenericHTTPResponse<TRoster>> {
  try {
    return axios.post<GenericHTTPResponse<TRoster>>(`${API_ROOT}/campaign/${campaignId}`, roster).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to create campaign roster: ${(error as Error).message}`)
   }
}

export async function deleteRoster(rosterId: string): Promise<GenericHTTPResponse<null>> {
  try {
    return axios.delete<GenericHTTPResponse<null>>(`${API_ROOT}/${rosterId}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to delete campaign roster: ${(error as Error).message}`)
   }
}

export async function getAllCampaignRosters(campaignId: string): Promise<TRoster[]> {
  try {
    return axios.get<TRoster[]>(`${API_ROOT}/campaign/${campaignId}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch user's campaign roster: ${(error as Error).message}`)
   }
}

export async function createNewRegiment(regiment: TRegiment): Promise<TRegiment> {
  try {
    return axios.post<TRegiment>(`${API_ROOT}/regiments`, regiment).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to create new regiment: ${(error as Error).message}`)
   }
}
