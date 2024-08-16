export interface District{
  iddistrict: number;
  namedistrict: string;
}
export const DistrictData = (data: any[]): District[] => {
  return data.map(item => ({
    iddistrict: item.iddistrict,
    namedistrict:item.nameville
  }))
}