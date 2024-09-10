import { Ordredemission, TransFormDataOnData } from "../Ordredemission";

export interface Autresuivi {
  idautresuivi: number;
  ordermission:Ordredemission;
  urlrapport:string;
  statu:number;
}
export const TransFormDataAutresuivi = (data: any): Autresuivi => {
  return {
    ordermission: TransFormDataOnData(data.ordermission),
    idautresuivi: data.idautresuivi,
    urlrapport: data.urlrapport,
    statu:data.statu
  }
}