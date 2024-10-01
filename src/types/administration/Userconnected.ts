import { usegetRole } from "../../api/mission/Api";

class Userconnected{
  private _role: any;
  constructor(role: any='') {
    this._role = role;
  }
  get getRole(): any{
    return this._role;
  }
  set role(new_role: any) {
    this._role = new_role;
  }
}
export function UserInstance(): Userconnected {
  const getrole = usegetRole();
  const user = new Userconnected();
  if (getrole.isSuccess && getrole.data) {
    user.role = getrole.data.object
  } else {
    user.role='no role'
  }
  return user;
};