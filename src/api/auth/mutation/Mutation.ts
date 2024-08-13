import { useMutation } from "@tanstack/react-query";
import { Authuser } from "../../json/Authuser";
import { Authentification } from "../query/Apiauth";

export function useAuthentification() {
  return useMutation({
    mutationFn: (data: Authuser) => Authentification(data),
    onSuccess() {
      
    },
    onError(error) {
      console.log("network error : " + error);
    }
  })
}