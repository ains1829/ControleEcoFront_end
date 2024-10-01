import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { Jsonmission } from "../json/mission/Jsonmission";
import { Jsoncollecte } from "../json/mission/jsoncollecte";
import { SocieteForm } from "../../types/societe/SocieteForm";
const DetailCollecte = async (idcollecte: number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/detail_collecte?idcollecte=${idcollecte}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data.object;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

export function useDetailCollecte(idcollecte: number){
  return useQuery({
    queryKey: ["detail_collecte", idcollecte],
    queryFn:()=>DetailCollecte(idcollecte)
  })
}

const SocieteRef = async (idsociete: number) => {
  try {
    const reponse = (await instanceAxios.get(`data/ref_societe?idsociete=${idsociete}`))
      .data.object;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}
export function useSocieteRef(idsociete : number){
  return useQuery({
    queryKey: ["societeref", idsociete],
    queryFn:()=> SocieteRef(idsociete) 
  })
}

const CollecteFinished = async (idordermission : number, data: Jsoncollecte[]) => {
  try {
    const reponse = (await instanceAxios.post(`mission/collecte_missionFinished?id=${idordermission}`, data , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

export function useCollecteFinished() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({idordermission,data}: { idordermission: number , data : Jsoncollecte[]}) => CollecteFinished(idordermission , data),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["collectemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnqueteFinished = async (idorderdemission : number) => {
  try {
    const reponse = (await instanceAxios.post(`mission/enquete_missionFinished?idordermission=${idorderdemission}`, {} , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

export function useEnqueteFinished() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission}: { idordermission: number}) => EnqueteFinished(idordermission),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}
const EnvoyeRapport = async (idordermission: number, file: File) => {
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
    console.log(error);
  }
}
export function useEnvoyeRapport() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, rapport }: { idordermission: number, rapport: File }) => EnvoyeRapport(idordermission, rapport),
    onSettled: async (_, error,variables) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({queryKey:["autresuivibyordermission" , variables.idordermission]})
      }
    }
  })
}
const EnvoyePvinfraction = async (idorderdemission : number , file : File) => {
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
    console.log(error);
  }
}

export function useEnquetePvinfraction() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche }: { idordermission: number, fiche: File }) => EnvoyePvinfraction(idordermission, fiche),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}
const EnvoyePvaudition = async (idorderdemission : number , file : File) => {
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
    console.log(error);
  }
}
export function useEnquetePvaudition() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche }: { idordermission: number, fiche: File }) => EnvoyePvaudition(idordermission, fiche),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnvoyeConvocation = async (idorderdemission : number , file : File) => {
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
    console.log(error);
  }
}
export function useEnqueteConvocation() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche }: { idordermission: number, fiche: File }) => EnvoyeConvocation(idordermission, fiche),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}

const EnvoyeFicheTechnique = async (idorderdemission : number , file : File) => {
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
    console.log(error);
  }
}
export function useEnqueteFicheTechnique() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, fiche }: { idordermission: number, fiche: File }) => EnvoyeFicheTechnique(idordermission, fiche),
    onSettled: async (_, error , variables) => {
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({queryKey : ["enquetemissionbyequipe" , variables.idordermission]})
      }
    }
  })
}
const OrdermissionBasculed = async (idordermission: number) => {
  try {
    const reponse = (await instanceAxios.post(`mission/basculed_ordre_mission?idorderdemission=${idordermission}}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
      .data?.object;
    return reponse;
  } catch (error) {
    console.log(error)
  }
}
export function useOrdermissionBasculed() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission }: { idordermission: number }) => OrdermissionBasculed(idordermission),
    onSettled: async (_, error)=>{
      if (error) {
        console.log(error);
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

const OrdermissionValidate = async (idordermission:number , validate:boolean) => {
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
    console.log(error)
  }
}

export function useValidateOrdermission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission, validate }: { idordermission: number; validate: boolean }) =>  OrdermissionValidate(idordermission, validate),
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

const OrdermissionValidateDgdmt = async (idordermission:number, validate:boolean ) => {
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
    console.log(error)
  }
}

export function useValidateOrdermissionDgdmt() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ idordermission,validate }: { idordermission: number , validate:boolean}) =>  OrdermissionValidateDgdmt(idordermission,validate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        queryclient.invalidateQueries({ queryKey: ["order-missions"] });
      }
    }
  })
}

const OrdremissionSave = async (data: Jsonmission) => {
  try {
     const reponse = (await instanceAxios.post("mission/demandeordre", data , {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
     }));
    return reponse;
  } catch (error) {
    console.log(error)
  }
}

export function useSaveMission() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data: Jsonmission) => OrdremissionSave(data),
    onSettled : async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({ queryKey : ["order-missions-user"]})
      }
    }
  })
}

const SaveSociete = async (logo:File ,data: SocieteForm) => {
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
    console.log(error)
  }
}

export function useSaveSociete() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({logo , data} : {logo:File , data:SocieteForm}) => SaveSociete(logo,data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({queryKey:["societeglobalpagination" , 0 , '' , 0]})
      }
    }
  })
}