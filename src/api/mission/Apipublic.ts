import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

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