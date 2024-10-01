import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { EquipeForm } from "../../types/mission/EquipeForm";

const DesactivateEquipe = async (idequipe: number) => {
   try {
    const reponse = (await instanceAxios.get(`scomadminstration/supprime_equipe?idequipe=${idequipe}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
   return reponse.data;
  } catch (error) {
    console.log(error)
  }
} 
export function UseDesactivateEquipe(){
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => DesactivateEquipe(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({queryKey:["equipebyregion"]})
      }
    }
  })
}
const NewEquipe = async (data : EquipeForm) => {
 try {
    const reponse = (await instanceAxios.post("scomadminstration/createEquipe" , data , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
   return reponse.data;
  } catch (error) {
    console.log(error)
  }
}
export function useSaveNewEquipe() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data: EquipeForm) => NewEquipe(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryclient.invalidateQueries({queryKey:["equipebyregion"]})
      }
    }
  })
}

const AdministrationNoEquipe = async () => {
  try {
    const reponse = (await instanceAxios.get("scomadminstration/administration_no_H_equipe" , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}

export function UseAdministrationNoequipe() {
  return useQuery({
    queryKey: ["administration_no_H_equipe"],
    queryFn : AdministrationNoEquipe ,
  })
}

const OrdremissionByDrDt = async (page:number , annee:number , filter:number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/suivi_mission_sender?page=${page}&annee=${annee}&filter=${filter}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}
export function usegetOrdremissionByDrDt(page:number , annee:number , filter:number) {
  return useQuery({
    queryKey: ["suivi_mission_sender" , page , annee,filter],
    queryFn : ()=> OrdremissionByDrDt(page , annee , filter) ,
  })
}

const CalendarByDrDt = async (annee:number) => {
  try {
    const reponse = (await instanceAxios.get(`mission/calendar?annee=${annee}` , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`
      }
    }));
    return reponse.data?.object
  } catch (error) {
    console.log(error)
  }
}

export function usegetCalendar(annee:number) {
  return useQuery({
    queryKey: ["calendar" , annee],
    queryFn : ()=> CalendarByDrDt(annee) ,
  })
}
