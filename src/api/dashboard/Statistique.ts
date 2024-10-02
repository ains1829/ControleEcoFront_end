import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
const statbyprogressiongbyregion = async (anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/missionprogressingbyregion?annee=${anne}`, {
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
export function useStatbyprogressiongbyregion(annee:number) {
  return useQuery({
    queryKey: ['missionprogressingbyregion' ,annee],
    queryFn: () => statbyprogressiongbyregion(annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const statbyregionbytypemission = async (typemission:number , anne:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/missionbyregionbytypemission?typemission=${typemission}&annee=${anne}`, {
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
export function useStatbyregionbytypemission(typemission:number , annee:number) {
  return useQuery({
    queryKey: ['missionbyregionbytypemission' , typemission , annee],
    queryFn: () => statbyregionbytypemission(typemission, annee),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const OMvalidationbyregion = async () => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/ombyregion`, {
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

export function useOMvalidationbyregion() {
  return useQuery({
    queryKey: ['ombyregion'],
    queryFn: OMvalidationbyregion,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const OMvalidation = async () => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/om_stat`, {
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
export function useOMvalidation() {
  return useQuery({
    queryKey: ['om_stat'],
    queryFn: OMvalidation,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Enqueteregionglobal = async (date: number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/enquetestatglobalbyregion?date=${date}`, {
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

export function useEnqueteregionglobal(date : number) {
  return useQuery({
    queryKey: ["enquetestatglobalbyregion", date],
    queryFn: () => Enqueteregionglobal(date),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Enqueteglobal = async (date: number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/enquetestatglobal?date=${date}`, {
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

export function useEnqueteglobal(date : number) {
  return useQuery({
    queryKey: ["enquetestatglobal", date],
    queryFn: () => Enqueteglobal(date),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const MissionTypeglobal = async (date: number) => {
  try {
    
    const reponse = (await instanceAxios.get(`statistique/missiontypeglobal?date=${date}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error)
  }
}
export function useTypeMissionglobal(date : number) {
  return useQuery({
    queryKey: ["missiontypeglobal" , date],
    queryFn: () => MissionTypeglobal(date),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Statmissionglobal = async (date : number) => {
  try {
    const reponse = (await instanceAxios.get(`statistique/missionstatglobal?date=${date}`, {
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

export function useStatMissionglobal(date : number) {
  return useQuery({
    queryKey: ["statmissionglobal" , date],
    queryFn: () => Statmissionglobal(date),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
