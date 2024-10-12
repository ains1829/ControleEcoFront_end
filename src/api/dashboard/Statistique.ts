import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";

const StatMissionByMonthType = async (annee: number, navigate: any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/statmission_month_type?annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatMissionByMonthType(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['statmission_month_type',annee],
    queryFn: () => StatMissionByMonthType(annee , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const StatMissionByMonth = async (annee: number, navigate: any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/statmission_month?annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatMissionByMonth(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['statmission_month',annee],
    queryFn: () => StatMissionByMonth(annee , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const statbyprogressiongbyregion = async (anne:number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/missionprogressingbyregion?annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatbyprogressiongbyregion(annee:number , navigate:any) {
  return useQuery({
    queryKey: ['missionprogressingbyregion' ,annee],
    queryFn: () => statbyprogressiongbyregion(annee , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const statbyregionbytypemission = async (typemission:number , anne:number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/missionbyregionbytypemission?typemission=${typemission}&annee=${anne}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatbyregionbytypemission(typemission:number , annee:number , navigate:any) {
  return useQuery({
    queryKey: ['missionbyregionbytypemission' , typemission , annee],
    queryFn: () => statbyregionbytypemission(typemission, annee,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const OMvalidationbyregion = async (navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/ombyregion`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useOMvalidationbyregion(navigate:any) {
  return useQuery({
    queryKey: ['ombyregion'],
    queryFn: ()=>OMvalidationbyregion(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const OMvalidation = async (navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/om_stat`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useOMvalidation(navigate:any) {
  return useQuery({
    queryKey: ['om_stat'],
    queryFn: ()=>OMvalidation(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Enqueteregionglobal = async (date: number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/enquetestatglobalbyregion?date=${date}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useEnqueteregionglobal(date : number , navigate:any) {
  return useQuery({
    queryKey: ["enquetestatglobalbyregion", date],
    queryFn: () => Enqueteregionglobal(date,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Enqueteglobal = async (date: number , navigate:any) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique/enquetestatglobal?date=${date}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useEnqueteglobal(date : number , navigate:any) {
  return useQuery({
    queryKey: ["enquetestatglobal", date],
    queryFn: () => Enqueteglobal(date , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const MissionTypeglobal = async (date: number , navigate:any) => {
  try {
    
    const reponse = (await instanceAxios.get(`statistique/missiontypeglobal?date=${date}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate("/");
  }
}
export function useTypeMissionglobal(date : number , navigate:any) {
  return useQuery({
    queryKey: ["missiontypeglobal" , date],
    queryFn: () => MissionTypeglobal(date , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Statmissionglobal = async (date : number ,navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`statistique/missionstatglobal?date=${date}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useStatMissionglobal(date : number , navigate:any) {
  return useQuery({
    queryKey: ["statmissionglobal" , date],
    queryFn: () => Statmissionglobal(date , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
