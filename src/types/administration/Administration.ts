export interface Administration{
  key: number;
  name: string;
  matricule: string;
  email: string;
  telephone: string;
  profil: string;
  idprofil: string;
  photo: string;
  addresse: string;
  region: string;
  genre: number;
  idregion: string;
  age: number;
  date_naissance: string;
}
export const TransformDataAdministration = (data: any[]): Administration[] => {
  return data.map(item => ({
    key: item.idadministration,
    name: item.nameadministration,
    matricule: item.matricule,
    email: item.email,
    telephone: item.telephone,
    profil: item.profil.description,
    idprofil:item.profil.idprofil,
    photo: item.photo,
    addresse: item.addresse,
    region: item.region.nameregion,
    genre: item.gender,
    idregion: item.region.idregion,
    age: item.age,
    date_naissance:item.birthday
  }))
}