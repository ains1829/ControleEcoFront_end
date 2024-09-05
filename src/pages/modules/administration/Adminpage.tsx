import { Breadcrumb} from "antd";
import AdminRegional from "./components/AdminRegional";
import AdminSg from "./components/AdminSg";

function Adminpage() {
  
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Liste' }, { title: 'Administrateur' }]} />
      <div className="flex flex-col gap-y-2">
        <AdminSg/>
        <AdminRegional />
      </div>
    </>
  )
}
export default Adminpage;