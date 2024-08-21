import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"
import { token } from "../token/Token"

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