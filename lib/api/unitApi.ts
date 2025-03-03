import axios from 'axios';
import {
  TUnit,
  TPath,
  TUnitType
} from '@definitions/unit';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/units`;

export async function fetchUnitTypes(): Promise<TUnitType[]> {
  try {
    return axios.get<TUnitType[]>(`${API_ROOT}/unitTypes`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch unit type data: ${(error as Error).message}`)
   }
}

export async function fetchPaths(isHero: boolean, unitTypeId: number): Promise<TPath[]> {
  try {
    return axios.get<TPath[]>(`${API_ROOT}/paths?isHero=${isHero}&unitTypeId=${unitTypeId}`).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to fetch unit type paths: ${(error as Error).message}`)
   }
}

export async function saveNewRosterUnit(unit: TUnit) {
  try {
    return axios.post<TUnit>(`${API_ROOT}`, unit).then((res) => res.data);

   } catch (error) {
     throw new Error(`Failed to save new unit: ${(error as Error).message}`)
   }
}
