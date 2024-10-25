import { Breadcrumb, Divider, Tag, theme } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAutresuivibyordermission } from "../../../../../api/equipe/Apiequipe";
import { TransFormDataAutresuivi } from "../../../../../types/mission/suivi/Autresuivi";
import {
  SyncOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import Feedback from "./Feedback";
import Uploadrapport from "./upload/Uploadrapport";
import { UserInstance } from "../../../../../types/administration/Userconnected";
import { formatOrderDate } from "../Mission";
function Autresuivi() {
  const navigate = useNavigate();
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { id } = useParams();
  const role = UserInstance().getRole;
  const autreSuivi = useAutresuivibyordermission(Number(id),navigate);
  if (autreSuivi.isPending) {
    return <>loading...</>
  }
  if (autreSuivi.isError) {
    return <>error...</>
  }
  const data_autre = TransFormDataAutresuivi(autreSuivi.data)
  console.log(data_autre)
  let url = "";
  if (role === 'DR' || role == 'DT') {
    url = "/suivimission_dr_dt"
  } else {
    url = "/suivimission";
  }
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: <Link to={`${url}`}>Suivi de mission</Link>  } , {title:'Descente'}]} />
        <div
          className="flex flex-col gap-y-2 font-sans"
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
      > 
       <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold"> Autre suivi</span>
              <div className="flex">
                <span className="bg-yellow-400 p-1 text-xs text-white rounded-full mr-4"># Autre suivi</span> 
                {
                  data_autre?.statu === 200 ? 
                  <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">
                    Terminer
                  </Tag> :
                  <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                    En cours
                  </Tag> 
                }
              </div>
            </div>
            <Divider dashed />
            <div className="flex flex-col gap-y-4">
              <div>
                <strong>OM : </strong>
                <a href="Https://Ordredemission.com" className="ml-1"> <span style={{color:'blue'}}>Ordredemission.com</span></a>
              </div>
              <div>
                <strong>District : </strong>
                <span>{ data_autre?.ordermission.nomdistrict }</span>
              </div>
              <div>
                <strong>Debut de la mission : </strong>
                <span>{ formatOrderDate(data_autre?.ordermission.debut)}</span>
              </div>
              <div>
                <strong>Fin de la mission : </strong>
                <span>
                  { data_autre?.ordermission.fin != null ? formatOrderDate(data_autre?.ordermission.fin) : 'en cours' }
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="mb-1">Contexte</strong>
                <span>{ data_autre?.ordermission.context }</span> 
              </div>
              <div>
                <strong>Rapport : </strong>
                {
                  data_autre.statu === 200 ? <a href="http://localhost" className="text-blue-500"> {data_autre.urlrapport}</a> :
                    (role === 'CH') ? <Uploadrapport idordermission={Number(id)}/> :
                      <span>en cours</span>
                }
              </div>
            </div>
            <Divider dashed />
            {
              role === 'CH' ? '' :
                <Feedback idordermission={data_autre.ordermission.idordermission} />
            }
          </div>
        </div>
        </div>
    </>
  )
}
export default Autresuivi;