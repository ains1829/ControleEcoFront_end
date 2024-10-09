export interface Societedata{
  key: number;
  namesociete: string;
  description: string;
  nif: string;
  stat: string;
  numerofiscal: string;
  telephone: string;
  responsable: string;
  idregion: number;
  district: string;
  iddistrict: number;
  addresse: string;
  logo: string;
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
    idregion:item.region.idregion,
    iddistrict:item.district.iddistrict,
    district: item.district.nameville,
    addresse: item.addresse,
    logo:item.url_logo
  }))
}