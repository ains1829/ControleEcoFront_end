import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { Jsonmission } from "../json/mission/Jsonmission";
import { Jsoncollecte } from "../json/mission/jsoncollecte";
import { SocieteForm } from "../../types/societe/SocieteForm";

const DetailCollecte = async (idcollecte: number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/detail_collecte?idcollecte=${idcollecte}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data.object;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}

export function useDetailCollecte(idcollecte: number,navigate:any){
  return useQuery({
    queryKey: ["detail_collecte", idcollecte],
    queryFn: () => DetailCollecte(idcollecte,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const SocieteRef = async (idsociete: number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`data/ref_societe?idsociete=${idsociete}`))
      .data.object;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}
export function useSocieteRef(idsociete : number , navigate:any){
  return useQuery({
    queryKey: ["societeref", idsociete],
    queryFn: () => SocieteRef(idsociete , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const CollecteFinished = async (idordermission : number, data: Jsoncollecte[] , navigate:any) => {
  try {
    const reponse = (await instanceAxios.post(`mission/collecte_missionFinished?id=${idordermission}`, data , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}

export function useCollecteFinished() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({idordermission,data,navigate}: { idordermission: number , data : Jsoncollecte[] , navigate:any}) => CollecteFinished(idordermission , data , navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["collectemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnqueteFinished = async (idorderdemission : number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.post(`mission/enquete_missionFinished?idordermission=${idorderdemission}`, {} , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}

export function useEnqueteFinished() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission , navigate}: { idordermission: number , navigate:any}) => EnqueteFinished(idordermission , navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnvoyeRapport = async (idordermission: number, file: File , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append('idordermission', idordermission.toString());
    formData.append('rapport', file);
    console.log(file)
    const reponse = (await instanceAxios.post('mission/autresuivi_finished', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}
export function useEnvoyeRapport() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, rapport , navigate }: { idordermission: number, rapport: File , navigate:any }) => EnvoyeRapport(idordermission, rapport , navigate),
    onSettled: async (_, error,variables) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({queryKey:["autresuivibyordermission" , variables.idordermission]})
      }
    }
  })
}
const EnvoyePvinfraction = async (idorderdemission : number , file : File , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append('idordermission', idorderdemission.toString());
    formData.append('file_fiche', file);
    console.log(file)
    const reponse = (await instanceAxios.post('mission/pvinfraction', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}

export function useEnquetePvinfraction() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche , navigate}: { idordermission: number, fiche: File , navigate:any }) => EnvoyePvinfraction(idordermission, fiche , navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}
const EnvoyePvaudition = async (idorderdemission : number , file : File , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append('idordermission', idorderdemission.toString());
    formData.append('file_fiche', file);
    console.log(file)
    const reponse = (await instanceAxios.post('mission/pvaudition', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}
export function useEnquetePvaudition() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche , navigate}: { idordermission: number, fiche: File , navigate:any }) => EnvoyePvaudition(idordermission, fiche , navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnvoyeConvocation = async (idorderdemission : number , file : File , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append('idordermission', idorderdemission.toString());
    formData.append('file_fiche', file);
    console.log(file)
    const reponse = (await instanceAxios.post('mission/convocation', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}
export function useEnqueteConvocation() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche , navigate }: { idordermission: number, fiche: File , navigate:any }) => EnvoyeConvocation(idordermission, fiche , navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnvoyeFicheTechnique = async (idorderdemission : number , file : File , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append('idordermission', idorderdemission.toString());
    formData.append('file_fiche', file);
    console.log(file)
    const reponse = (await instanceAxios.post('mission/fichetechnique', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/')
  }
}
export function useEnqueteFicheTechnique() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche , navigate}: { idordermission: number, fiche: File , navigate:any }) => EnvoyeFicheTechnique(idordermission, fiche,navigate),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}
const OrdermissionBasculed = async (idordermission: number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.post(`mission/basculed_ordre_mission?idorderdemission=${idordermission}}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data?.object;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}
export function useOrdermissionBasculed() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission , navigate}: { idordermission: number , navigate:any }) => OrdermissionBasculed(idordermission , navigate),
    onSettled: async (_, error)=>{
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

const OrdermissionValidate = async (idordermission:number , validate:boolean , navigate:any) => {
  try {
    let booleans_validate = 1;
    if (validate == false) {
      booleans_validate = 0;
    }
    const reponse = (await instanceAxios.get(`mission/validation_ordre_mission?idorderdemission=${idordermission}&&confirmation=${booleans_validate}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function useValidateOrdermission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, validate , navigate }: { idordermission: number; validate: boolean , navigate:any }) =>  OrdermissionValidate(idordermission, validate , navigate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
        queryclient.invalidateQueries({queryKey:["om_stat"]})
      }
    }
  })
}

const OrdermissionValidateDgdmt = async (idordermission:number, validate:boolean , navigate:any) => {
  try {
    let booleans_validate = 1;
    if (validate == false) {
      booleans_validate = 0;
    }
    const reponse = (await instanceAxios.get(`mission/validation_demande_dt?idorderdemission=${idordermission}&&confirmation=${booleans_validate}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data?.object;
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function useValidateOrdermissionDgdmt() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission,validate,navigate }: { idordermission: number , validate:boolean , navigate:any}) =>  OrdermissionValidateDgdmt(idordermission,validate , navigate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

const OrdremissionSave = async (data: Jsonmission , navigate:any) => {
  try {
    const reponse = (await instanceAxios.post("mission/demandeordre", data , {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function useSaveMission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({data , navigate}: {data:Jsonmission , navigate:any}) => OrdremissionSave(data , navigate),
    onSettled : async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({ queryKey : ["order-missions-user"]})
      }
    }
  })
}

const SaveSociete = async (logo:File ,data: SocieteForm , navigate:any) => {
  try {
    const formData = new FormData();
    formData.append("photo", logo);
    formData.append("data", new Blob([JSON.stringify(data)], { type:'application/json'}));
    const reponse = (await instanceAxios.post("scomadminstration/newSociete", formData , {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
        }
    }));
    return reponse;
  } catch (error) {
    navigate('/');
  }
}

export function useSaveSociete() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({logo , data , navigate} : {logo:File , data:SocieteForm , navigate:any}) => SaveSociete(logo,data , navigate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({queryKey:["societeglobalpagination" , 0 , '' , 0]})
      }
    }
  })
}