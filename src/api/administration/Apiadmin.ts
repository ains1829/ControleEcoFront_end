import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

const Missionnaire = async (page: number, search: string) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getmissionnairebyregion?page=${page}&text=${search}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error);
  }
}
export function usegetMissionnaire(page:number , search:string) {
  return useQuery({
    queryKey: ["getmissionnairebyregion" , page,search],
    queryFn:()=>Missionnaire(page,search)
  })
}