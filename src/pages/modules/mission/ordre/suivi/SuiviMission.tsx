import { Avatar, Button, Tag, Tooltip } from "antd"
import {
  UserOutlined,
  AntDesignOutlined,
  CalendarOutlined,
  SyncOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Ordredemission } from "../../../../../types/mission/Ordredemission";
function SuiviMission({ data }: { data: Ordredemission }) {
  let url = `/enquete/${data.idordermission}`;
  let bg = 'bg-green-200'
  if (data.typemission === 2) {
    url = `/collecteeconomique/${data.idordermission}`
    bg='bg-blue-200'
  } else if (data.typemission === 3) {
    url = "/autresuivi"
    bg = 'bg-yellow-200'
  }
  return (
    <>
      <div className={`flex flex-col card ${bg} p-5 font-sans gap-y-3 rounded-2xl `}>
        <div className="flex justify-between header-card">
          <div className="avatar">
            <Avatar.Group  shape="circle">
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
            </Avatar.Group>
          </div>
          <div className="status">
            {
              data.fin !== null ?
              <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">
                Terminer
                </Tag> :
                <>
                <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                En cours
                </Tag> </>
            }
          </div>
        </div>
        <div className="title">
          <div className="font-bold mb-2">
            {
              data.typemission === 1 ? <>Descente chez {data.nomsociete}</> :
                data.typemission === 2 ? <>{data.nomdistrict}</> :
                  <>Autre Suivi</>
            }
          </div>
          <div className="type-mission">
            {
              data.typemission === 1 ? <span className="bg-green-400 p-1 text-xs text-white rounded-full"># Descente</span> :
                data.typemission === 2 ? <span className="bg-blue-400 p-1 text-xs text-white rounded-full"># Collecte</span> :
                  <span className="bg-yellow-400 p-1 text-xs text-white rounded-full"># Autre Suivi</span> 
            }
            
          </div>
        </div>
        <div className="flex items-center date text-gray-400 font-bold">
          <span><CalendarOutlined /></span>
          <span className="text-xs ml-1">Debut mission : { data.debut.toString() }</span>
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