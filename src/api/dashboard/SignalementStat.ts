import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
const getSignalbyregion = async (annee: number, page: number) => {
  try {    
    const reponse = (await instanceAxios.get(`scomadminstration/getSignalbyregion?annee=${annee}&page=${page}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useGetSignalbyregion(annee: number, page: number) {
  return useQuery({
    queryKey: ['getSignalbyregion' ,annee,page],
    queryFn: () => getSignalbyregion(annee, page),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const Repartitionanomalybyregion = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/repartitionanomalybyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useRepartitionanomalybyregion(annee:number) {
  return useQuery({
    queryKey: ['repartitionanomalybyregion' ,annee],
    queryFn: () => Repartitionanomalybyregion(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const evolutionSignalmentbyregion = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbymonthbyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useEvolutionSignalmentbyregion(annee:number) {
  return useQuery({
    queryKey: ['signalementbymonthbyregion' ,annee],
    queryFn: () => evolutionSignalmentbyregion(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}


const Repartitionanomaly = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/repartitionanomalyglobal?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useRepartitionanomaly(annee:number) {
  return useQuery({
    queryKey: ['repartitionanomalyglobal' ,annee],
    queryFn: () => Repartitionanomaly(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const evolutionSignalment = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbymonthglobal?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useEvolutionSignalment(annee:number) {
  return useQuery({
    queryKey: ['signalementbymonthglobal' ,annee],
    queryFn: () => evolutionSignalment(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Statsignalementbyregion = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/signalementbyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useStatsignalementbyregion(annee:number) {
  return useQuery({
    queryKey: ['signalementbyregion' ,annee],
    queryFn: () => Statsignalementbyregion(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
