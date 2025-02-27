import axios from 'axios';
import {
  TGrandAlliance,
  TFaction
} from '@definitions/sigmar';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/sigmar`;

export async function fetchGrandAlliances(): Promise<TGrandAlliance[]> {
  try {
    return axios.get<TGrandAlliance[]>(`${API_ROOT}/grand-alliances`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch grand alliances: ${(error as Error).message}`)
   }
}

export async function fetchFactionData(): Promise<TFaction[]> {
  try {
    return axios.get<TFaction[]>(`${API_ROOT}/factions`).then((res) => res.data);

  } catch (error) {
    throw new Error(`Failed to fetch faction data: ${(error as Error).message}`)
  }
}


export async function fetchFactionsByGrandAlliance(grandAllianceId: number): Promise<TFaction[]> {
  try {
    return axios.get<TFaction[]>(`${API_ROOT}/factions?grandAllianceId=${grandAllianceId}`).then((res) => res.data);

  } catch (error) {
    throw new Error(`Failed to fetch faction data: ${(error as Error).message}`)
  }
}