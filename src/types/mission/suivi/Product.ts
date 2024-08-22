export interface Product {
  idproduct: number;
  nameproduct: string;
  unite: string;
}
export const TransformDataProduct =  (data: any[]): Product[] => {
  return data.map(item => ({
    idproduct: item.idproduct,
    nameproduct: item.nameproduct,
    unite: item.typeproduct.unite.nameunite
  }))
}