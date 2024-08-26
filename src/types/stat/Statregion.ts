export interface Statregion{
  nameregion: string;
  nameprovince:string;
  key:number;
  t_enquete:number;
  encours:number;
  fini:number;
  clean:number;
  infraction:number;
}
export const TransFormDataStat = (data: any[]): Statregion[] => {
  return data.map(item => ({
    nameregion: item.nameregion,
    nameprovince: item.nameprovince,
    key: item.region,
    t_enquete: item.t_enquete,
    encours: item.encours,
    fini: item.fini,
    clean: item.clean,
    infraction:item.infraction
  }))
}