import { Avatar, Button, Tag, Tooltip } from "antd"
import {
  CalendarOutlined,
  SyncOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Ordredemission } from "../../../../../types/mission/Ordredemission";
import { formatOrderDate } from "../Mission";
function SuiviMission({ data }: { data: Ordredemission }) {
  let url = `/enquete/${data.idordermission}`;
  let bg = 'bg-white'
  if (data.typemission === 2) {
    url = `/collecteeconomique/${data.idordermission}`
  } else if (data.typemission === 3) {
    url = `/autresuivi/${data.idordermission}`
  }
  return (
    <>
      <div className={`flex flex-col card ${bg} p-5 font-sans gap-y-3 shadow-md rounded-md`}>
        <div className="flex justify-between header-card">
          <div className="avatar">
            <Avatar.Group shape="circle"> 
              {
                data.detailequipe.map((item) => (
                  <Tooltip key={item.matricule} title={<span className="font-sans text-xs">{ item.matricule}</span>} placement="top">
                    <Avatar src={item.photo} size={'large'}/>
                  </Tooltip>
                ))
              }
            </Avatar.Group>
          </div>
          <div className="status">
            {
              data.fin !== null ?
              <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">
                Mission terminé 
              </Tag> :
              <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                Mission en cours
              </Tag>
            }
          </div>
        </div>
        <div className="title">
          <div className="flex flex-col gap-y-1 mb-2">
            <span className="font-bold">
              {
                data.typemission === 1 ? <>Descente chez {data.nomsociete}</> :
                  data.typemission === 2 ? <>{data.nomdistrict}</> :
                    <>Autre Suivi</>
              }
            </span>
          </div>
          <div className="type-mission">
            {
              data.typemission === 1 ? <span className="bg-green-400 p-1 text-xs text-white rounded-full"># Descente</span> :
                data.typemission === 2 ? <span className="bg-blue-400 p-1 text-xs text-white rounded-full"># Collecte</span> :
                  <span className="bg-yellow-400 p-1 text-xs text-white rounded-full"># Autre Suivi</span> 
            }
            
          </div>
        </div>
        <div className="flex items-center text-gray-400">
          <span className="text-xs text-gray-600">Ref : {data.numeroserie }</span>
        </div>
        <div className="footer flex flex-end">
          <Link to={`${url}`}>
            <Button type="dashed" className="font-sans text-xs">
              Voir <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default SuiviMission