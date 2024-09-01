import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

const Missionnaire = async () => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/getmissionnairebyregion" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error);
  }
}
export function usegetMissionnaire() {
  return useQuery({
    queryKey: ["getmissionnairebyregion"],
    queryFn:Missionnaire
  })
}