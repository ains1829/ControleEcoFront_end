import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { Jsonmission } from "../json/mission/Jsonmission";
import { token } from "../token/Token";

const OrdremissionSave = async (data: Jsonmission) => {
  try {
     const reponse = (await instanceAxios.post("mission/demandeordre", data , {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
     }));
    return reponse;
  } catch (error) {
    console.log(error)
  }
}
export function useSaveMission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data: Jsonmission) => OrdremissionSave(data),
    onSettled : async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({ queryKey : ["order-missions-user"]})
      }
    }
  })
}