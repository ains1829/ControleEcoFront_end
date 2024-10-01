import { Equipe, TransFormDataEquipe } from "./Equipe";

export interface M_Equipe{
  idequipe: number;
  nameequipe: string;
  chefequipe: string;
  photo_chef: string;
  mission_total: number;
  mission_fini: number;
  mission_encours: number;
  membres: Equipe[];
}
export const TransfData = (data: any[]): M_Equipe[] => {
  return data.map(item => ({
    idequipe: item.idequipe,
    nameequipe: item.nameequipe,
    membres: TransFormDataEquipe(item.detailequipes),
    chefequipe: item.chefequipe.nameadministration,
    photo_chef:item.chefequipe.photo,
    mission_total: item.nombre_mission,
    mission_fini: item.mission_fini,
    mission_encours : item.mission_encours
  }))
}