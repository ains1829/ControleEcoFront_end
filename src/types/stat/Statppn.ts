export interface Statppn{
  nameregion: string;
  key: number;
  p_moyenne: number;
  p_max: number;
  p_min: number;
}
export const TransFormPpnRegion = (data: any[]): Statppn[] => {
  return data.map(item => ({
    nameregion: item.nameregion,
    key: item.region,
    p_moyenne: item.p_moyenne,
    p_max: item.p_max,
    p_min:item.p_min
  }))
}