import { useQuery } from "@tanstack/react-query"
import { instanceAxios } from "../axios/Theaxios";
const getFeedback = async (idorderdemission:number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/feedback_content?idordermission=${idorderdemission} `, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    
    navigate('/');
  }
}
export function usegetFeedback(idorderdemission : number , navigate:any) {
  return useQuery({
    queryKey: ["feedback"], 
    queryFn: () => getFeedback(idorderdemission,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const getOrdermissionByUser = async (page:number,filtre:number,text:string,navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/OrderMissionAllbydrdt?pagenumber=${page}&filter=${filtre}&text=${text}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    navigate('/');
  }
}
export function usegetOrdermissionByUser(page:number , filter:number,text:string,navigate:any) {
  return useQuery({
    queryKey: ["order-missions-user", page,filter,text],
    queryFn: ()=>getOrdermissionByUser(page,filter,text,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getOrdermission = async (page:number,filtre:number,text:string ,navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/OrderMissionAll?pagenumber=${page}&filter=${filtre}&text=${text}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    navigate('/');
  }
}
export function usegetOrdermission(page:number , filter:number,text:string,navigate:any) {
  return useQuery({
    queryKey: ["order-missions" , page,filter,text],
    queryFn: ()=>getOrdermission(page,filter,text,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
export const getOrdermissionAttente = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionenAttente", {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    navigate('/');
  }
}
export function usegetOrdermissionAttente(navigate:any) {
  return useQuery({
    queryKey: ["order-missions-Attente"],
    queryFn: ()=>getOrdermissionAttente(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

export const getSocieteByregion = async (page : number , search : string,navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getSocietebyregionpagination?page=${page}&search=${search}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function usegetSocietebyregion(page:number , search : string , navigate:any) {
  return useQuery({
    queryKey: ["societebyregion" , page , search],
    queryFn: () => getSocieteByregion(page , search , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}


const getSocieteglobal = async (page : number , search : string, idregion :number , filtresocieteom:boolean , date_begin:string , date_end : string , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getSocieteglobalpagination?page=${page}&search=${search}&idregion=${idregion}&filter=${filtresocieteom}&date_begin=${date_begin}&date_end=${date_end}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function usegetSocieteglobal(idregion : number ,  page:number , search : string , filtresocieteom:boolean , date_begin:string , date_end : string , navigate:any) {
  return useQuery({
    queryKey: ["societeglobalpagination" , page , search , idregion , filtresocieteom , date_begin , date_end ],
    queryFn: () => getSocieteglobal(page , search , idregion , filtresocieteom , date_begin , date_end , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const getProfil = async () => {
  try {
    const respone = (await instanceAxios.get("data/profil"));
    return respone.data;
  } catch (error) {
    console.log(error);
  }
}
export function usegetProfils() {
  return useQuery({
    queryKey: ["profil"],
    queryFn: getProfil,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getRegions = async () => {
  try {
    const respone = (await instanceAxios.get("data/regions"));
    return respone.data;
  } catch (error) {
    console.log(error);
  }
}
export function usegetRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const getDistrict = async (idregion : number) => {
  try {
    const respone = (await instanceAxios.get(`data/district?idregion=${idregion}`));
    return respone.data;
  } catch (error) {
    console.log(error);
  }
}

export function usegetDistrict(idregion : number) {
  return useQuery({
    queryKey: ["district" , idregion],
    queryFn:()=> getDistrict(idregion),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getRole = async (navigate:any) => {
  try {
    const respone = (await instanceAxios.get(`scomadminstration/getrole`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return respone.data;
  } catch (error) {
    navigate("/");
  }
}
export function usegetRole(navigate:any) {
  return useQuery({
    queryKey: ["getrole",localStorage.getItem('token-user')],
    queryFn: ()=>getRole(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getAdministrationValidate = async (page:number , navigate:any) => {
  try {
    const respone = (await instanceAxios.get(`scomadminstration/account_validate?page=${page}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return respone.data.object;
  } catch (error) {
    navigate('/');
  }
}
export function usegetAdministrationValidate(page:number , navigate:any) {
  return useQuery({
    queryKey: ["account_validate",page],
    queryFn:()=> getAdministrationValidate(page,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getAdministrationNoValidate = async (page:number  , navigate:any) => {
  try {
    const respone = (await instanceAxios.get(`scomadminstration/account_Novalidate?page=${page}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return respone.data.object;
  } catch (error) {
    navigate('/');
  }
}
export function usegetAdministrationNoValidate(page:number , navigate:any) {
  return useQuery({
    queryKey: ["account_Novalidate",page],
    queryFn:()=> getAdministrationNoValidate(page,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
