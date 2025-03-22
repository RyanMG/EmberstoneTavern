import { TCampaignGame, TNewCampaignGame } from "@definitions/campaign";
import { GenericHTTPResponse } from "@definitions/api";
import Person from "@classes/Person";
import Campaign from "@classes/Campaign";

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

export async function fetchCampaignGames(campaignId: string): Promise<TCampaignGame[]> {
  try {
    const { data } = await axios.get<GenericHTTPResponse<TCampaignGame[]>>(`${API_ROOT}/${campaignId}/games`);
    if (data.success) {
      return data.data.map((game: TCampaignGame) => {
        game.campaign = new Campaign(game.campaign);
        game.winner = new Person(game.winner);
        game.opponent = new Person(game.opponent);
        return game;
      });
    }

    throw new Error(`Failed to fetch campaign games.`);
  } catch (error) {
    throw new Error(`Failed to fetch campaign games: ${(error as Error).message}`);
  }
}

export async function fetchGame(campaignId: string, gameId: string): Promise<TCampaignGame> {
  try {
    const { data } = await axios.get<GenericHTTPResponse<TCampaignGame>>(`${API_ROOT}/${campaignId}/games/${gameId}`);
    if (data.success) {
      const game = data.data;
      game.campaign = new Campaign(game.campaign);
      game.winner = new Person(game.winner);
      game.opponent = new Person(game.opponent);
      return game;
    }

    throw new Error(`Failed to fetch game.`);
  } catch (error) {
    throw new Error(`Failed to fetch game: ${(error as Error).message}`);
  }
}
