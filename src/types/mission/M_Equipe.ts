import { Equipe, TransFormDataEquipe } from "./Equipe";

export interface M_Equipe{
  idequipe: number;
  nameequipe: string;
  membres: Equipe[];
}
export const TransfData = (data: any[]): M_Equipe[] => {
  return data.map(item => ({
    idequipe: item.idequipe,
    nameequipe: item.nameequipe,
    membres:TransFormDataEquipe(item.detailequipes)
  }))
}