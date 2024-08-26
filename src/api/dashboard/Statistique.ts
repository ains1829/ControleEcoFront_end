import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
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
  }
}
export function useOMvalidation() {
  return useQuery({
    queryKey: ['om_stat'],
    queryFn : OMvalidation
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
  }
}

export function useEnqueteregionglobal(date : number) {
  return useQuery({
    queryKey: ["enquetestatglobalbyregion", date],
    queryFn : () => Enqueteregionglobal(date)
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
  }
}
export function useEnqueteglobal(date : number) {
  return useQuery({
    queryKey: ["enquetestatglobal", date],
    queryFn : () => Enqueteglobal(date)
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
    queryFn :  () => MissionTypeglobal(date)
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
  }
}
export function useStatMissionglobal(date : number) {
  return useQuery({
    queryKey: ["statmissionglobal" , date],
    queryFn :  () => Statmissionglobal(date)
  })
}
