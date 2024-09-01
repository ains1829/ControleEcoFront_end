import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

const OrdremissionByDrDt = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/suivi_mission_sender" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetOrdremissionByDrDt() {
  return useQuery({
    queryKey: ["suivi_mission_sender"],
    queryFn : OrdremissionByDrDt ,
  })
}
