import { instanceAxios } from "../../axios/Theaxios";
import { Authuser } from "../../json/Authuser";

export const Authentification = async (data: Authuser) => {
  return await instanceAxios.post("auth/authentification", data);
}