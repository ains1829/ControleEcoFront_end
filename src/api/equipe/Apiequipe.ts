import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios"
const getMyEquipe = async (navigate : any) => {
  try {
    const reponse = (await instanceAxios.get('statistique/detailequipe', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function usegetMyEquipe(navigate:any) {
  return useQuery({
    queryKey: ["detailequipe"],
    queryFn:()=> getMyEquipe(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const missionBytype = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get('statistique/stat_typemissionbyequipe', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useStatTypeMissionByEquipe(navigate:any) {
  return useQuery({
    queryKey: ["stattypemissionbyequipe"],
    queryFn:()=> missionBytype(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const StatMission = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get('statistique/missionstatbyequipe', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useStatMissionByEquipe(navigate:any) {
  return useQuery({
    queryKey: ["statmissionbyequipe"],
    queryFn:()=> StatMission(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const Autresuivibyordermission = async (idmission: number , navigate:any) => {
    try {
    const reponse = (await instanceAxios.get(`mission/autresuivibyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}
export function useAutresuivibyordermission(idmission : number , navigate:any) {
  return useQuery({
    queryKey: ["autresuivibyordermission", idmission],
    queryFn: () => Autresuivibyordermission(idmission,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }) 
}
const CollecteMissionByEquipe = async (idmission : number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/collectebyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    navigate("/");
  }
}

export function useCollecteMissionByEquipe (id : number , navigate:any) {
  return useQuery({
    queryKey: ["collectemissionbyequipe", id],
    queryFn: () => CollecteMissionByEquipe(id,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const EnqueteMissionByEquipe = async (idmission : number , navigate : any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/enqeuetebyordermission?idordermission=${idmission}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object;
  } catch (error) {
    navigate('/');
  }
}

export function useEnqueteMissionByEquipe (id : number , navigate:any) {
  return useQuery({
    queryKey: ["enquetemissionbyequipe", id],
    queryFn: () => EnqueteMissionByEquipe(id,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const OrdremissionByEquipe = async (page:number , filter:number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/suivi_mission?page=${page}&filter=${filter}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}
export function usegetOrdermissionByEquipe(page:number , filter:number , navigate : any) {
  return useQuery({
    queryKey: ["ordermissionbyequipe" , page , filter],
    queryFn: () => OrdremissionByEquipe(page, filter,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getEquipeByRegion = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/equipebyregion" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}
export function usegetEquipeByregion(navigate:any) {
  return useQuery({
    queryKey: ['equipebyregion'],
    queryFn:()=>getEquipeByRegion(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getDistrict = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/getdistrictbyregion", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}
export function usegetDistrictByregion(navigate:any) {
  return useQuery({
    queryKey: ['districtbyregion'],
    queryFn:()=> getDistrict(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getSociete = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/getSocietebyregion", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}
export function usegetSocieteByregion(navigate:any) {
  return useQuery({
    queryKey: ['Societebyregion'],
    queryFn: ()=>getSociete(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}