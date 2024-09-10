import { useQuery } from "@tanstack/react-query"
import { instanceAxios } from "../axios/Theaxios";
const getFeedback = async (idorderdemission:number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/feedback_content?idordermission=${idorderdemission} `, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    
  }
}
export function usegetFeedback(idorderdemission : number) {
  return useQuery({
    queryKey: ["feedback"], 
    queryFn:()=>getFeedback(idorderdemission)
  })
}

const getOrdermissionByUser = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionAllbydrdt", {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermissionByUser() {
  return useQuery({
    queryKey: ["order-missions-user"],
    queryFn: getOrdermissionByUser,
    // staleTime: Infinity,
    // gcTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })
}
const getOrdermission = async (page:number,filtre:number,text:string) => {
  try {
    const reponse = (await instanceAxios.get(`mission/OrderMissionAll?pagenumber=${page}&filter=${filtre}&text=${text}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermission(page:number , filter:number,text:string) {
  return useQuery({
    queryKey: ["order-missions" , page,filter,text],
    queryFn: ()=>getOrdermission(page,filter,text),
    // staleTime: Infinity,
    // gcTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })
}
export const getOrdermissionAttente = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionenAttente", {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermissionAttente() {
  return useQuery({
    queryKey: ["order-missions-Attente"],
    queryFn: getOrdermissionAttente,
    // staleTime: Infinity,
    // gcTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })
}

export const getSocieteByregion = async (page : number , search : string) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getSocietebyregionpagination?page=${page}&search=${search}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}

export function usegetSocietebyregion(page:number , search : string) {
  return useQuery({
    queryKey: ["societebyregion" , page , search],
    queryFn: () => getSocieteByregion(page , search),
    // staleTime: Infinity,
    // gcTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })
}


const getSocieteglobal = async (page : number , search : string, idregion :number) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getSocieteglobalpagination?page=${page}&search=${search}&idregion=${idregion}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    })).data?.object;
    return reponse;
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}

export function usegetSocieteglobal(idregion : number ,  page:number , search : string) {
  return useQuery({
    queryKey: ["societeglobalpagination" , page , search , idregion],
    queryFn: () => getSocieteglobal(page , search , idregion),
    // staleTime: Infinity,
    // gcTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: true,
  })
}
const getRegions = async () => {
  try {
    const respone = (await instanceAxios.get("data/regions"));
    return respone.data;
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
