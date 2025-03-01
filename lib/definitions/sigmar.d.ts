export type TGrandAlliance = {
  id: number;
  name: string;
}

export type TFaction = {
  id: number;
  name: string;
  grandAlliance: TGrandAlliance;
}
