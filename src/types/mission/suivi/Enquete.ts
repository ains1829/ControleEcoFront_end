import { Ordredemission, TransFormDataOnData } from "../Ordredemission";

export interface Enquete {
  idenquete: number;
  ordermission: Ordredemission;
  namesociete: string;
  statu: number;
  url_fichetechnique: string;
  datefichetechnique: Date;
  url_convocation: string;
  dateconvocation: Date;
  urlpvaudition: string;
  datepvaudition: Date;
  url_pvinfraction: string;
  dateinfraction: Date;
}
export const TransformdataEnquete = (data: any): Enquete => {
  return {
    idenquete: data.idenquete ,
    ordermission: TransFormDataOnData(data.ordermission),
    namesociete: data.societe.namesociete,
    statu: data.statu,
    url_fichetechnique: data.url_fichetechnique,
    url_convocation: data.url_convocation,
    urlpvaudition : data.urlpvaudition,
    url_pvinfraction: data.url_pvinfraction,
    datefichetechnique: data.datefichetechnique,
    dateconvocation: data.dateconvocation,
    dateinfraction: data.dateinfraction,
    datepvaudition : data.datepvaudition
  }
}