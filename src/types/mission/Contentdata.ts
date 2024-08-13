import { Ordredemission, TransFormData } from "./Ordredemission";

export interface Contendata{
  hasnext: boolean;
  hasprevious: boolean;
  mission: Ordredemission[];
  nombrepage: number;
  page: number;
}
export const TransformDataContent = (data: any) :Contendata => {
  return {
    hasnext: data.hasnext,
    mission: TransFormData(data.data),
    hasprevious: data.hasprevious,
    page: data.page,
    nombrepage:data.nombrepage
  }
}