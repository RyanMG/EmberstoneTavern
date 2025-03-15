import { TCampaignGame, TNewCampaignGame } from "@definitions/campaign";
import axios from 'axios';

const API_ROOT = `${process.env.EXPO_PUBLIC_API_ROOT_URL}/api/campaigns`;
export async function reportGame(game: TNewCampaignGame): Promise<TCampaignGame> {
  try {
    const { data } = await axios.post<TCampaignGame>(`${API_ROOT}/${game.campaignId}/games`, game);
    return data;

   } catch (error) {
     throw new Error(`Failed to add game to campaign: ${(error as Error).message}`)
   }
}
