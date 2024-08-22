import { Ordredemission, TransFormDataOnData } from "../Ordredemission";

export interface Collecte {
  idcollecte: number;
  ordermission: Ordredemission;
  statu: number;
  datecollecte: Date;
}
export const TransformdataCollecte = (data: any): Collecte => {
  return {
    idcollecte: data.idcollecte,
    ordermission: TransFormDataOnData(data.ordermission),
    statu: data.statu,
    datecollecte : data.datecollecte
  }
}