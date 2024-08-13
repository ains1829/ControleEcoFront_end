export interface Ordredemission{
  idordermission: number;
  typemission: number;
  sender: string;
  profil: string;
  region: string;
  context: string;
  debut: Date;
  societe: string;
}
export const TransFormData = (data : any[]) : Ordredemission[] => {
  return data.map(item => ({
    idordermission: item.idordermission,
    typemission: item.idtypeordermission,
    context: item.motifs,
    region: item.region.nameregion,
    debut: item.datedescente,
    sender: '',
    profil: '',
    societe:''
  }))
}