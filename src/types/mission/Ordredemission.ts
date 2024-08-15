import { Equipe, TransFormDataEquipe } from "./Equipe";

export interface Ordredemission{
  idordermission: number;
  typemission: number;
  sender: string;
  profil: string;
  region: string;
  context: string;
  debut: Date;
  dateordre: Date;
  societe: number;
  nomsociete: string;
  addresse: string;
  district: number;
  nomdistrict: string;
  detailequipe: Equipe[];
  status: number;
}
export const TransFormData = (data : any[]) : Ordredemission[] => {
  return data.map(item => ({
    idordermission: item.idordermission,
    typemission: item.idtypeordermission,
    context: item.motifs,
    region: item.region.nameregion,
    debut: item.datedescente,
    sender: item.sender.nameadministration,
    profil: item.sender.profil.description,
    societe: item.idsociete ?? 0,
    addresse: item.addressesociete ?? "",
    nomsociete: item.nomsociete ?? "",
    district: item.iddistrict ?? 0 ,
    nomdistrict: item.nomdistrict ?? "",
    detailequipe: TransFormDataEquipe(item.equipe.detailequipes),
    status: item.status_validation,
    dateordre:item.dateorder
  }))
}