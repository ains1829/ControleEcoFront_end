import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"
import { token } from "../token/Token"

const CollecteMissionByEquipe = async (idmission : number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/collectebyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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