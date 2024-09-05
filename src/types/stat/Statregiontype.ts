export interface Statregiontype{
  nameregion: string;
  nameprovince:string;
  key:number;
  t_mission:number;
  encours:number;
  fini:number;
}
export const TransFormStatRegion = (data: any[]): Statregiontype[] => {
  return data.map(item => ({
    nameregion: item.namregion,
    nameprovince: item.nameprovince,
    key: item.region,
    t_mission: item.t_mission,
    encours: item.nissionencours,
    fini: item.missionfini
  }))
}