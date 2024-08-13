import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"
import { token } from "../token/Token";
// import { TransFormData } from "../../types/mission/Ordredemission";

export const getOrdermission = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionAll", {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermission() {
  return useQuery({
    queryKey: ["order-missions"],
    queryFn: getOrdermission
  })
}