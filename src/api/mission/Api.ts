import { useQuery } from "@tanstack/react-query"
import { instanceAxios } from "../axios/Theaxios"
import { token } from "../token/Token";
export const getOrdermissionByUser = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionAllbydrdt", {
      headers: {
        "Authorization" : `Bearer ${token}`
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
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
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
    queryFn: getOrdermission,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
export const getOrdermissionValider = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionValider", {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })).data?.object;
    console.log(reponse);
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermissionValider() {
  return useQuery({
    queryKey: ["order-missions-valider"],
    queryFn: getOrdermissionValider,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
export const getOrdermissionNonValider = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionNonValider", {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })).data?.object;
    return reponse
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}
export function usegetOrdermissionNonValider() {
  return useQuery({
    queryKey: ["order-missions-nonvalider"],
    queryFn: getOrdermissionNonValider,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
export const getOrdermissionAttente = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/OrderMissionenAttente", {
      headers: {
        "Authorization" : `Bearer ${token}`
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
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}