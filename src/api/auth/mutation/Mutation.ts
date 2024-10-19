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

const ValidateAccount = async (idaccount: number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/validateaccount_dsi?idaccount=${idaccount}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
      }
    })).data;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}
export function useValidateAccount() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({id , navigate} : {id:number , navigate:any}) => ValidateAccount(id,navigate),
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

const ValidateResultatCollecte = async (validate:boolean, idcollecte: number, navigate: any) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/validate_resultatcollecte?validate=${validate}&idcollecte=${idcollecte}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
      }
    })).data;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}
export function useValidateResultatCollecte(page:number) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({validate, id , navigate} : {validate:boolean, id:number , navigate:any}) => ValidateResultatCollecte(validate,id,navigate),
    onSettled: async(_,error)=> {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({ queryKey: ["gestion_collecte", page]})
      }
    }
  })
}