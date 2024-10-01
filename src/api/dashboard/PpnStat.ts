import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../axios/Theaxios";
const Ppnglobalprovincebydirecteur = async (idproduct:number , mois:number , annee:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/pricebyregionbyprovincebyproduct?product=${idproduct}&mois=${mois}&annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export function usePpnglobalprovincebydirecteur(idproduct:number , mois:number , annee:number) {
  return useQuery({
    queryKey: ['pricebyregionbyprovincebyproduct', idproduct , mois , annee],
    queryFn : ()=> Ppnglobalprovincebydirecteur(idproduct , mois , annee)
  })
}


const PpnAnnebydirecteur = async (idproduct:number , isthreeyears:boolean , annee:number , annee2:number) => {
   try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/Yearsglobalbyprovincebydirecteur?product=${idproduct}&choix=${isthreeyears}&annee=${annee}&anne2=${annee2}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}
export function usePpnAnnebydirecteur(idproduct: number, isthreeyears: boolean, annee: number, anne2: number) {
  return useQuery({
    queryKey: ['Yearsglobalbyprovincebydirecteur', idproduct, isthreeyears, annee, anne2],
    queryFn: () => PpnAnnebydirecteur(idproduct, isthreeyears, annee, anne2) 
  })
}


const RegionProvincebydirecteur = async (idproduct: number, mois: number, annee: number) => {
   try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/detailregionbydirecteur?product=${idproduct}&mois=${mois}&annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}
export function useRegionProvincebydirecteur(idproduct: number, mois: number, annee: number){
  return useQuery({
    queryKey: ["detailregionbydirecteur", idproduct, mois, annee],
    queryFn: () => RegionProvincebydirecteur(idproduct, mois, annee) 
  })
}

const DistrictByregion = async (idregion: number, idproduct: number, mois: number, annee: number) => {
   try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/districtdetailbyregion?idregion=${idregion}&product=${idproduct}&mois=${mois}&annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export function useDistrictByregion(idregion: number, idproduct: number, mois: number, annee: number){
  return useQuery({
    queryKey: ["districtdetailbyregion", idregion, idproduct, mois, annee],
    queryFn: () => DistrictByregion(idregion, idproduct, mois, annee) 
  })
}




const RegionProvince = async (idprovince: number, idproduct: number, mois: number, annee: number) => {
   try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/detailregionbyprovince?province=${idprovince}&product=${idproduct}&mois=${mois}&annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}
export function useRegionProvince(idprovince: number, idproduct: number, mois: number, annee: number){
  return useQuery({
    queryKey: ["detailregionbyprovince", idprovince, idproduct, mois, annee],
    queryFn: () => RegionProvince(idprovince, idproduct, mois, annee) 
  })
}

const PpnAnne = async (idprovince : number , idproduct:number , isthreeyears:boolean , annee:number , annee2:number) => {
   try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/Yearsglobalbyprovincebyproduct?province=${idprovince}&product=${idproduct}&choix=${isthreeyears}&annee=${annee}&anne2=${annee2}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}
export function usePpnAnne(idprovince: number, idproduct: number, isthreeyears: boolean, annee: number, anne2: number) {
  return useQuery({
    queryKey: ['Yearsglobalbyprovincebyproduct',idprovince, idproduct, isthreeyears, annee, anne2],
    queryFn: () => PpnAnne(idprovince, idproduct, isthreeyears, annee, anne2) 
  })
}


const Ppnglobalprovince = async (idprovince:number , idproduct:number , mois:number , annee:number) => {
  try {    
    const reponse = (await instanceAxios.get(`statistique_ppn/priceglobalbyprovincebyproduct?province=${idprovince}&product=${idproduct}&mois=${mois}&annee=${annee}`, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token-user')}`
      }
    }))
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export function usePpnglobalprovince(idprovince:number , idproduct:number , mois:number , annee:number) {
  return useQuery({
    queryKey: ['priceglobalbyprovincebyproduct', idprovince , idproduct , mois , annee],
    queryFn : ()=> Ppnglobalprovince(idprovince , idproduct , mois , annee)
  })
}