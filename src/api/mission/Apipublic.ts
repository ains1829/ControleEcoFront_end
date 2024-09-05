import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
const Directeur = async (page : number) => {
  try {
    const reponse = (await instanceAxios.get(`data/list-directeur?page=${page}`));
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export function usegetDirecteur(page: number) {
  return useQuery({
    queryKey: ["list-directeur", page],
    queryFn:()=> Directeur(page)
  })
}

const Administrator = async () => {
  try {
    const reponse = (await instanceAxios.get("data/list-administrator"));
    return reponse.data;
  } catch (error) {
    console.log(error)
  }
}
export function usegetAdministrator() {
  return useQuery({
    queryKey: ["list-administrator"], 
    queryFn:Administrator 
  })
}
const Product = async () => {
  try {
    const reponse = (await instanceAxios.get("data/product"));
    return reponse.data;
  } catch (error) {
    console.log(error)
  }
}
export function usegetProduct() {
  return useQuery({
    queryKey: ["product"],
    queryFn : Product 
  })
}