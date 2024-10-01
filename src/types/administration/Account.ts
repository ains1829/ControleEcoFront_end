export interface Account{
  key: number;
  name: string;
  matricule: string;
  email: string;
  profil: string;
  photo: string;
  date_validate: Date;
  date_demande: Date;
}
export const TransformDataAccount = (data: any[]): Account[] => {
  return data.map(item => ({
    key: item.idaccount,
    name: item.administration.nameadministration,
    matricule: item.administration.matricule,
    email: item.administration.email,
    profil: item.administration.profil.description,
    photo: item.administration.photo,
    date_validate: item.datevalidate,
    date_demande:item.datedemande
  }))
}