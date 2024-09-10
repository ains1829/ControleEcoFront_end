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
  fin: Date;
  societe: number;
  nomsociete: string;
  addresse: string;
  district: number;
  nomdistrict: string;
  detailequipe: Equipe[];
  status: number;
  urlfile: string;
  numeroserie: string;
  
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
    dateordre: item.dateorder,
    fin: item.dateorderend,
    urlfile: item.fileordermission,
    numeroserie:item.numeroserie
  }))
}
export const TransFormDataOnData = (data : any) : Ordredemission => {
  return {
    idordermission: data.idordermission,
    typemission: data.idtypeordermission,
    context: data.motifs,
    region: data.region.nameregion,
    debut: data.datedescente,
    sender: data.sender.nameadministration,
    profil: data.sender.profil.description,
    societe: data.idsociete ?? 0,
    addresse: data.addressesociete ?? "",
    nomsociete: data.nomsociete ?? "",
    district: data.iddistrict ?? 0 ,
    nomdistrict: data.nomdistrict ?? "",
    detailequipe: TransFormDataEquipe(data.equipe.detailequipes),
    status: data.status_validation,
    dateordre: data.dateorder,
    fin: data.dateorderend,
    urlfile : data.fileordermission,
    numeroserie:data.numeroserie
  }
}