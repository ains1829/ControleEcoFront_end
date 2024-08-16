export interface Societe{
  idsociete: number;
  namesociete: string;
}
export const TransFSociete = (data: any[]): Societe[] => {
  return data.map(item => ({
    idsociete: item.idsociete,
    namesociete:item.namesociete
  }))
}