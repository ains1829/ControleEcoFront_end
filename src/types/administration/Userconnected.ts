import { useNavigate } from "react-router-dom";
import { usegetRole } from "../../api/mission/Api";

class Userconnected{
  private _role: any;
  private _name: any;
  private _profile: any;
  private _photo: any;
  constructor(role: any='') {
    this._role = role;
  }
  get getRole(): any{
    return this._role;
  }
  set role(new_role: any) {
    this._role = new_role;
  }
  get getName(): any{
    return this._name;
  }
  set name(name: any) {
    this._name = name;
  }
  get getProfile(): any{
    return this._profile
  }
  set profile(profile: any) {
    this._profile = profile;
  }
  get getPhoto(): any{
    return this._photo;
  }
  set photo(photo:any){
    this._photo = photo;
  }

}
export function UserInstance(): Userconnected {
  const navigate = useNavigate();
  const getrole = usegetRole(navigate);
  const user = new Userconnected();
  if (getrole.isSuccess && getrole.data) {
    user.role = getrole.data.object.role,
    user.name = getrole.data.object.user.nameadministration
    user.profile = getrole.data.object.user.profil.description
    user.photo = getrole.data.object.user.photo
  } else {
    user.role = 'no role'
    user.name = 'no name'
    user.profile = 'no profil'
    user.photo='no photo'
  }
  return user;
};