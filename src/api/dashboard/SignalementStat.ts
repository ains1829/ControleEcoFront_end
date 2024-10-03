import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

const getSignalbyregion = async (annee: number, page: number,navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`scomadminstration/getSignalbyregion?annee=${annee}&page=${page}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useGetSignalbyregion(annee: number, page: number,navigate:any) {
  return useQuery({
    queryKey: ['getSignalbyregion' ,annee,page],
    queryFn: () => getSignalbyregion(annee, page,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const Repartitionanomalybyregion = async (anne:number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/repartitionanomalybyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useRepartitionanomalybyregion(annee:number,navigate:any) {
  return useQuery({
    queryKey: ['repartitionanomalybyregion' ,annee],
    queryFn: () => Repartitionanomalybyregion(annee,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const evolutionSignalmentbyregion = async (anne:number,navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbymonthbyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useEvolutionSignalmentbyregion(annee:number,navigate:any) {
  return useQuery({
    queryKey: ['signalementbymonthbyregion' ,annee],
    queryFn: () => evolutionSignalmentbyregion(annee,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}


const Repartitionanomaly = async (anne:number,navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/repartitionanomalyglobal?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useRepartitionanomaly(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['repartitionanomalyglobal' ,annee],
    queryFn: () => Repartitionanomaly(annee,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const evolutionSignalment = async (anne:number,navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbymonthglobal?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useEvolutionSignalment(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['signalementbymonthglobal' ,annee],
    queryFn: () => evolutionSignalment(annee , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Statsignalementbyregion = async (anne:number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatsignalementbyregion(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['signalementbyregion' ,annee],
    queryFn: () => Statsignalementbyregion(annee,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
