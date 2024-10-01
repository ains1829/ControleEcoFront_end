import { Breadcrumb } from "antd";
import Demande from "./components/Demande";
import Accountvalidate from "./components/Accountvalidate";

function Account() {
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Liste' }, { title: 'Compte' }]} />
      <div className="flex flex-col gap-y-2">
        <Demande />
        <Accountvalidate />
      </div>
    </>
  )
}
export default Account;