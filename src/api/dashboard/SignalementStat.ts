import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
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
  }
}
export function useGetSignalbyregion(annee: number, page: number) {
  return useQuery({
    queryKey: ['getSignalbyregion' ,annee,page],
    queryFn : ()=>getSignalbyregion(annee , page) 
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
  }
}
export function useRepartitionanomalybyregion(annee:number) {
  return useQuery({
    queryKey: ['repartitionanomalybyregion' ,annee],
    queryFn : ()=>Repartitionanomalybyregion(annee) 
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
  }
}
export function useEvolutionSignalmentbyregion(annee:number) {
  return useQuery({
    queryKey: ['signalementbymonthbyregion' ,annee],
    queryFn : ()=>evolutionSignalmentbyregion(annee) 
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
  }
}
export function useRepartitionanomaly(annee:number) {
  return useQuery({
    queryKey: ['repartitionanomalyglobal' ,annee],
    queryFn : ()=>Repartitionanomaly(annee) 
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
  }
}
export function useEvolutionSignalment(annee:number) {
  return useQuery({
    queryKey: ['signalementbymonthglobal' ,annee],
    queryFn : ()=>evolutionSignalment(annee) 
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
  }
}
export function useStatsignalementbyregion(annee:number) {
  return useQuery({
    queryKey: ['signalementbyregion' ,annee],
    queryFn : ()=>Statsignalementbyregion(annee) 
  })
}
