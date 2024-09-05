export interface Administration{
  key: number;
  name: string;
  matricule: string;
  email: string;
  telephone: string;
  profil: string;
  photo: string;
  addresse: string;
  region: string;
}
export const TransformDataAdministration = (data: any[]): Administration[] => {
  return data.map(item => ({
    key: item.idadministration,
    name: item.nameadministration,
    matricule: item.matricule,
    email: item.email,
    telephone: item.telephone,
    profil: item.profil.description,
    photo: item.photo,
    addresse: item.addresse,
    region:item.region.nameregion
  }))
}