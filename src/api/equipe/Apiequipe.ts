import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
const getMyEquipe = async () => {
  try {
    const reponse = (await instanceAxios.get('statistique/detailequipe', {
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
export function usegetMyEquipe() {
  return useQuery({
    queryKey: ["detailequipe"],
    queryFn: getMyEquipe,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
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
    navigate('/');
  }
}
export function useStatTypeMissionByEquipe() {
  return useQuery({
    queryKey: ["stattypemissionbyequipe"],
    queryFn: missionBytype,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    navigate('/');
  }
}

export function useStatMissionByEquipe() {
  return useQuery({
    queryKey: ["statmissionbyequipe"],
    queryFn: StatMission,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}
export function useAutresuivibyordermission(idmission : number) {
  return useQuery({
    queryKey: ["autresuivibyordermission", idmission],
    queryFn: () => Autresuivibyordermission(idmission),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}

export function useCollecteMissionByEquipe (id : number) {
  return useQuery({
    queryKey: ["collectemissionbyequipe", id],
    queryFn: () => CollecteMissionByEquipe(id),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}

export function useEnqueteMissionByEquipe (id : number) {
  return useQuery({
    queryKey: ["enquetemissionbyequipe", id],
    queryFn: () => EnqueteMissionByEquipe(id),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const OrdremissionByEquipe = async (page:number , filter:number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/suivi_mission?page=${page}&filter=${filter}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function usegetOrdermissionByEquipe(page:number , filter:number) {
  return useQuery({
    queryKey: ["ordermissionbyequipe" , page , filter],
    queryFn: () => OrdremissionByEquipe(page, filter),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}
export function usegetEquipeByregion() {
  return useQuery({
    queryKey: ['equipebyregion'],
    queryFn: getEquipeByRegion,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}
export function usegetDistrictByregion() {
  return useQuery({
    queryKey: ['districtbyregion'],
    queryFn: getDistrict,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
    console.log(error);
    navigate('/');
  }
}
export function usegetSocieteByregion() {
  return useQuery({
    queryKey: ['Societebyregion'],
    queryFn: getSociete,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}