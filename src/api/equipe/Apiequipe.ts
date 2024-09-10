import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"

const missionBytype = async () => {
   try {
    const reponse = (await instanceAxios.get('statistique/stat_typemissionbyequipe', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
  }
}
export function useStatTypeMissionByEquipe() {
  return useQuery({
    queryKey: ["stattypemissionbyequipe"],
    queryFn : missionBytype 
  })
}

const StatMission = async () => {
  try {
    const reponse = (await instanceAxios.get('statistique/missionstatbyequipe', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    console.log(error);
  }
}
export function useStatMissionByEquipe() {
  return useQuery({
    queryKey: ["statmissionbyequipe"],
    queryFn : StatMission 
  })
}

const Autresuivibyordermission = async (idmission: number) => {
    try {
    const reponse = (await instanceAxios.get(`mission/autresuivibyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    console.log(error)
  }
}
export function useAutresuivibyordermission(idmission : number) {
  return useQuery({
    queryKey: ["autresuivibyordermission", idmission],
    queryFn:() => Autresuivibyordermission(idmission)
 }) 
}
const CollecteMissionByEquipe = async (idmission : number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/collectebyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    console.log(error)
  }
}

export function useCollecteMissionByEquipe (id : number) {
  return useQuery({
    queryKey: ["collectemissionbyequipe", id],
    queryFn : () => CollecteMissionByEquipe(id) 
  })
}

const EnqueteMissionByEquipe = async (idmission : number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/enqeuetebyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    console.log(error)
  }
}

export function useEnqueteMissionByEquipe (id : number) {
  return useQuery({
    queryKey: ["enquetemissionbyequipe", id],
    queryFn : () => EnqueteMissionByEquipe(id) 
  })
}

const OrdremissionByEquipe = async () => {
  try {
    const reponse = (await instanceAxios.get("mission/suivi_mission" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetOrdermissionByEquipe() {
  return useQuery({
    queryKey: ["ordermissionbyequipe"],
    queryFn : OrdremissionByEquipe ,
  })
}
const getEquipeByRegion = async () => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/equipebyregion" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetEquipeByregion() {
  return useQuery({
    queryKey: ['equipebyregion'],
    queryFn:getEquipeByRegion
  })
}
const getDistrict = async () => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/getdistrictbyregion", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetDistrictByregion() {
  return useQuery({
    queryKey: ['districtbyregion'],
    queryFn:getDistrict
  })
}
const getSociete = async () => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/getSocietebyregion", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetSocieteByregion() {
  return useQuery({
    queryKey: ['Societebyregion'],
    queryFn:getSociete
  })
}