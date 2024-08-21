import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { Jsonmission } from "../json/mission/Jsonmission";
import { token } from "../token/Token";

const OrdermissionBasculed = async (idordermission: number) => {
  try {
    const reponse = (await instanceAxios.post(`mission/basculed_ordre_mission?idorderdemission=${idordermission}}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }))
      .data?.object;
    return reponse;
  } catch (error) {
    console.log(error)
  }
}
export function useOrdermissionBasculed() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission }: { idordermission: number }) => OrdermissionBasculed(idordermission),
    onSettled: async (_, error)=>{
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

const OrdermissionValidate = async (idordermission:number , validate:boolean) => {
  try {
    let booleans_validate = 1;
    if (validate == false) {
      booleans_validate = 0;
    }
    const reponse = (await instanceAxios.get(`mission/validation_ordre_mission?idorderdemission=${idordermission}&&confirmation=${booleans_validate}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }))
      .data?.object;
    return reponse;
  } catch (error) {
    console.log(error)
  }
}
export function useValidateOrdermission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, validate }: { idordermission: number; validate: boolean }) =>  OrdermissionValidate(idordermission, validate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

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