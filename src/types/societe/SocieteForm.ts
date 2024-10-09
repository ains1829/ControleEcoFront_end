export interface SocieteForm{
  namesociete: string;
  description: string;
  telephone: string;
  addresse: string;
  idregion: number;
  iddistrict: number;
  nif: string;
  stat: string;
  numerofiscal: string;
  responsable: string;
}
export interface SocieteForm_modify{
  idsociete: number;
  namesociete: string;
  description: string;
  telephone: string;
  addresse: string;
  idregion: number;
  iddistrict: number;
  nif: string;
  stat: string;
  numerofiscal: string;
  responsable: string;
}