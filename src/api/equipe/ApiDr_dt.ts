import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { EquipeForm } from "../../types/mission/EquipeForm";
const DesactivateEquipe = async (idequipe: number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/supprime_equipe?idequipe=${idequipe}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
  return reponse.data;
  } catch (error) {
    navigate('/');
  }
} 
export function UseDesactivateEquipe(){
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({id , navigate}:{id:number , navigate:any}) => DesactivateEquipe(id ,navigate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryclient.invalidateQueries({queryKey:["equipebyregion"]})
      }
    }
  })
}
const NewEquipe = async (data : EquipeForm , navigate:any) => {
  try {
    const reponse = (await instanceAxios.post("scomadminstration/createEquipe" , data , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
  return reponse.data;
  } catch (error) {
    navigate('/');
  }
}
export function useSaveNewEquipe() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({data,navigate}: {data:EquipeForm , navigate:any}) => NewEquipe(data,navigate),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryclient.invalidateQueries({queryKey:["equipebyregion"]})
      }
    }
  })
}

const AdministrationNoEquipe = async (navigate:any) => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/administration_no_H_equipe" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}

export function UseAdministrationNoequipe(navigate:any) {
  return useQuery({
    queryKey: ["administration_no_H_equipe"],
    queryFn: ()=>AdministrationNoEquipe(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const OrdremissionByDrDt = async (page:number , annee:number , filter:number,navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/suivi_mission_sender?page=${page}&annee=${annee}&filter=${filter}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}
export function usegetOrdremissionByDrDt(page:number , annee:number , filter:number,navigate:any) {
  return useQuery({
    queryKey: ["suivi_mission_sender" , page , annee,filter],
    queryFn: () => OrdremissionByDrDt(page, annee, filter,navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const CalendarByDrDt = async (annee:number , navigate:any) => {
  try {
    const reponse = (await instanceAxios.get(`mission/calendar?annee=${annee}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    navigate('/');
  }
}

export function usegetCalendar(annee:number , navigate:any) {
  return useQuery({
    queryKey: ["calendar" , annee],
    queryFn: () => CalendarByDrDt(annee , navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
