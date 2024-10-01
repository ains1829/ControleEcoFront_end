import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Authuser } from "../../json/Authuser";
import { instanceAxios } from "../../axios/Theaxios";

const Authentification = async (data: Authuser) => {
  return await instanceAxios.post("auth/authentification", data);
}

export function useAuthentification() {
  return useMutation({
    mutationFn: (data: Authuser) => Authentification(data),
    onSuccess() {
    },
    onError(error) {
      console.log("network error : " + error);
    }
  })
}

const ValidateAccount = async (idaccount: number) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/validateaccount_dsi?idaccount=${idaccount}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
      }
    })).data;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}
export function useValidateAccount() {
  const queryclient = useQueryClient();
   return useMutation({
    mutationFn: ({id} : {id:number}) => ValidateAccount(id),
     onSettled: async(_,error)=> {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({ queryKey: ["account_validate", 0] })
        await queryclient.invalidateQueries({queryKey:["account_Novalidate",0]})
      }
    }
  })
}