export interface Societedata{
  key: React.Key;
  namesociete: string;
  description: string;
  nif: string;
  stat: string;
  numerofiscal: string;
  telephone: string;
  responsable: string;
  district: string;
  addresse: string;
}
export const TransformdataSociete = (data: any[]) : Societedata [] => {
  return data.map(item => ({
    key: item.idsociete,
    namesociete: item.namesociete,
    description: item.description,
    nif: item.nif,
    stat: item.stat,
    numerofiscal: item.numerofiscal,
    telephone: item.telephone,
    responsable: item.responsable,
    district: item.district.nameville,
    addresse:item.addresse
  }))
}