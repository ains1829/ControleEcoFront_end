import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
import { Formadministration } from "../../types/administration/Formadministration";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
const Missionnaire = async (page: number, search: string) => {
  try {
    const reponse = (await instanceAxios.get(`scomadminstration/getmissionnairebyregion?page=${page}&text=${search}` , {
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
export function usegetMissionnaire(page:number , search:string) {
  return useQuery({
    queryKey: ["getmissionnairebyregion" , page,search],
    queryFn: () => Missionnaire(page, search),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const UpdateAdmin = async (data: Formadministration) => {
  try {
    const formData = new FormData();
    formData.append("photo", data.photo);
    formData.append("idadministration", data.idadministration.toString());
    formData.append("nameadministration", data.name)
    formData.append("matricule", data.matricule) 
    formData.append("email", data.email);
    formData.append("telephone", data.telephone);
    formData.append("profil", data.idprofil);
    formData.append("addresse", data.addresse);
    formData.append("region", data.region.toString());
    formData.append("gender", data.genre);
    const reponse = (await instanceAxios.post('scomadminstration/updateperson' , formData , {
      headers: {
        "Content-Type" : 'multipart/form-data',
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
      }
    }));
    return reponse.data
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}
export function useUpdateAdmin(search:string , region:number , page:number , isregional:boolean) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Formadministration }) => UpdateAdmin(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        if (isregional === false) {
          queryclient.invalidateQueries({queryKey:["list-administrator"]});
        } else {
          queryclient.invalidateQueries({queryKey:["list-directeur", search, region ,  page]});
        }
      }
    }
  })
}

const newAdmin = async (data: Formadministration) => {
  try {
    const formData = new FormData();
    formData.append("photo", data.photo);
    formData.append("nameadministration", data.name)
    formData.append("matricule", data.matricule) 
    formData.append("email", data.email);
    formData.append("telephone", data.telephone);
    formData.append("profil", data.idprofil);
    formData.append("addresse", data.addresse);
    formData.append("region", data.region.toString());
    formData.append("gender", data.genre);
    const reponse = (await instanceAxios.post('scomadminstration/newperson' , formData , {
      headers: {
        "Content-Type" : 'multipart/form-data',
        "Authorization": `Bearer ${localStorage.getItem('token-user')}`,
      }
    }));
    return reponse.data
  } catch (error) {
    console.log(error);
    navigate('/');
  }
}

export function useNewAdmin() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Formadministration }) => newAdmin(data),
    onSettled: async (_, error,variable) => {
      if (error) {
        console.log(error)
      } else {
        if ((Number(variable.data.idprofil) === 1) || (Number(variable.data.idprofil) === 2) || (Number(variable.data.idprofil) === 3)) {
          queryclient.invalidateQueries({queryKey:["list-administrator"]});
        } else {
          queryclient.invalidateQueries({queryKey:["list-directeur", '', Number(variable.data.region) ,  0]});
        }
      }
    }
  })
}