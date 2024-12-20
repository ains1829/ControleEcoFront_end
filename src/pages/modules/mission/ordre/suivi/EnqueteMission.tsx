import { Breadcrumb, Button, Divider, Drawer, message, Space, Steps, Tag, theme } from "antd";
import {
  SyncOutlined,
  ArrowRightOutlined,
  CalendarOutlined,CheckCircleOutlined,FileDoneOutlined
} from '@ant-design/icons';
import { useState } from "react";
import UploadComponent from "./upload/UploadComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEnqueteMissionByEquipe } from "../../../../../api/equipe/Apiequipe";
import { TransformdataEnquete } from "../../../../../types/mission/suivi/Enquete";
import UploadConvocation from "./upload/UploadConvocation";
import Uploadaudition from "./upload/Uploadaudition";
import Uploadinfraction from "./upload/Uploadinfraction";
import { useEnqueteFinished } from "../../../../../api/mission/Apiordremission";
import Feedback from "./Feedback";
import { UserInstance } from "../../../../../types/administration/Userconnected";
import { formatOrderDate } from "../Mission";
function EnqueteMission() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();
  const { id } = useParams();
  const enquete = useEnqueteMissionByEquipe(Number(id) , navigate);
  const enquete_finish = useEnqueteFinished();
  const [open, setOpen] = useState(false);
  const role = UserInstance().getRole;
  let url = "";
  if (role === 'DR' || role == 'DT') {
    url = "/suivimission_dr_dt"
  } else {
    url = "/suivimission";
  }
  let enquete_object = null;
  if (enquete.isPending) {
    return <>Loadingg...</>
  }
  if (enquete.isError) {
    return <>Error...</>
  }
  else {
    enquete_object = TransformdataEnquete(enquete.data);
  }
  const onClose = () => {
    setOpen(false);
  };
  const ClotureMission = async (idordermission: number) => {
    const mission_finish = await enquete_finish.mutateAsync({ idordermission,navigate });
    if (mission_finish.status === 200) {
      message.success("Enqute cloturer");
    } else {
      message.error(mission_finish.object);
    }
    setOpen(false);
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
              <span className="text-xl font-bold"> { enquete_object.namesociete.toUpperCase() }</span>
              <div className="flex">
                <span className="bg-green-400 p-1 text-xs text-white rounded-full mr-4"># Descente</span> 
                {
                  enquete_object.statu === 210  || enquete_object.statu === 515 ?  <Tag icon={<CheckCircleOutlined />}  color="success" className="font-sans">Terminer</Tag> :
                    <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing"> En cours </Tag>
                }
              </div>
            </div>
            <Divider dashed />
            <div className="flex flex-col gap-y-4">
              <div>
                <strong>OM : </strong>
                <a href="Https://Ordredemission.com" className="ml-1"> <span style={{ color: 'blue' }}>{ enquete_object.ordermission.urlfile }</span></a>
              </div>
              <div>
                <strong>Resultat : </strong>
                <span className="ml-1">
                  {
                    enquete_object.statu === 210 ? <Tag color="success" className="font-sans">Société en règle</Tag> :
                      enquete_object.statu === 515 ? <Tag color="error" className="font-sans">Société en infraction</Tag> :
                        <>en cours</>
                  }
                </span>
              </div>
              <div>
                <strong>Debut de la mission : </strong>
                <span>{ formatOrderDate(enquete_object.ordermission.debut)}</span>
              </div>
              <div>
                <strong>fin de la mission : </strong>
                <span>{ enquete_object.ordermission.fin != null ? formatOrderDate(enquete_object.ordermission.fin) : 'en cours' }</span>
              </div>
              <div className="flex flex-col">
                <strong className="mb-1">Context</strong>
                <span>{enquete_object.ordermission.context}</span> 
              </div>
            </div>
          </div>
          <Divider dashed/>
          <div className="mb-5"><strong>Etape du mission</strong></div>
            <Steps
              direction="vertical"
              current={
                enquete_object.statu === 10 ? 0 : 
                  enquete_object.statu === 20 ? 1 :
                    enquete_object.statu === 30 ? 2 :
                      (enquete_object.statu === 200 || enquete_object.statu === 210) ? 3 : 4
              }
              className="font-sans"
              items={[
                {
                  title: <span className="text-sm">Fiche Technique</span>,
                  description :  enquete_object.statu === 10 ? 'en cours' :  <span className="text-xs">Terminer le :  { formatOrderDate(enquete_object.datefichetechnique)}</span>,
                },
                {
                  title: <span className="text-sm">Convocation</span>,
                  description:  enquete_object.statu < 20 ? 'en attente'  : enquete_object.statu === 20 ? 'en cours' :  <span className="text-xs">Terminer le :  { formatOrderDate(enquete_object.dateconvocation)}</span>
                },
                {
                  title: <span className="text-sm">PV Audition</span>,
                  description : enquete_object.statu < 30 ? 'en attente'  : enquete_object.statu === 30 ? 'en cours' :  <span className="text-xs">Terminer le :  { formatOrderDate(enquete_object.datepvaudition)}</span>,
                },
                {
                  title: <span className="text-sm">PV Infraction</span>,
                  description : enquete_object.statu < 200 ? 'en attente'  : enquete_object.statu === 200 ? 'en cours' : enquete_object.statu === 210 ? ' Clean ' : <span className="text-xs">Terminer le :  { formatOrderDate(enquete_object.dateinfraction)}</span>,
                },
              ]}
          />
          <Space>
            <Button className="font-sans" type="dashed" onClick={()=>setOpen(true)}>
              Consulter <ArrowRightOutlined />
            </Button>
          </Space>
          <Divider dashed />
          {
            role === 'CH' ? '' :
              <Feedback idordermission={enquete_object.ordermission.idordermission}/>
          }
        </div>
      <Drawer
        placement="right"
        size={"large"}
        onClose={onClose}
        open={open}
        className="font-sans"
        closable={false}
        width={600}
        extra={ enquete_object.statu === 200 || enquete_object.statu === 500 ? 
          <Space>
            <Button loading={enquete_finish.isPending} type="dashed" onClick={()=>ClotureMission(enquete_object.ordermission.idordermission)}>
              CLOTURER
            </Button>
          </Space>
          :
          ''
        }
        >
          <div className="mb-8">
            <span className="font-bold mb-5">Les rapports des missions effectuées lors de la descente</span>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-blue-500">Etape 1 : </span>
              <span>Fiche technique </span>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span><CalendarOutlined /></span>
                  <span>Date : </span>
                </div>
                <div>
                  {enquete_object.statu === 10 ? 'en cours' : '  ' + formatOrderDate(enquete_object.datefichetechnique)}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span><FileDoneOutlined /></span>
                  <span>Fichier : </span>
                </div>
                <div>
                  {
                    enquete_object.statu === 10 ? 'en cours' : <a href="https://chatgpt.com" className="ml-2" style={{ color: 'blue' }}>{ enquete_object.url_fichetechnique }</a>
                  } 
                </div>
              </div>
              {
                (role === 'CH' && enquete_object.ordermission.fin === null)   ?
                  <UploadComponent idordermission={enquete_object.ordermission.idordermission} />
                :''
              }
            </div>
          </div>
          <Divider dashed />
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-blue-500">Etape 2 : </span>
              <span>Convocation</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span><CalendarOutlined /> </span>
                  <span>Date : </span>
                </div>
                <div>
                  {enquete_object.statu < 20 ? 'en attente' : enquete_object.statu === 20 ? 'en cours' : formatOrderDate(enquete_object.dateconvocation)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <span><FileDoneOutlined /></span>
                <span>Fichier : </span>
              </div>
              <div>
                {enquete_object.statu < 20 ? 'en attente' : enquete_object.statu === 20 ? 'en cours' : <a className="ml-2" style={{color:'blue'}}>{ enquete_object.url_convocation.toString()}</a>}
              </div>
            </div>
            {
              (role === 'CH' && enquete_object.ordermission.fin === null)  ?
              <UploadConvocation idordermission={enquete_object.ordermission.idordermission}/>
              :''
            }
          </div>
          <Divider dashed />
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-blue-500">Etape 3 : </span>
              <span>Pv audition</span>
            </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span><CalendarOutlined /> </span>
                  <span>Date : </span>
                </div>
                <div>
                  {enquete_object.statu < 30 ? 'en attente' : enquete_object.statu === 30 ? 'en cours' : formatOrderDate(enquete_object.datepvaudition)}
                </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <span><FileDoneOutlined /></span>
                <span>Fichier : </span>
              </div>
              <div>
                {enquete_object.statu < 30 ? 'en attente'  : enquete_object.statu === 30 ? 'en cours' : <a className="ml-2" style={{color:'blue'}}>{ enquete_object.urlpvaudition.toString()}</a>}
              </div>
            </div>
              {
                (role === 'CH' && enquete_object.ordermission.fin === null)  ?
                  <Uploadaudition idordermission={enquete_object.ordermission.idordermission} />
                :''
              }
          </div>
          <Divider dashed />
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-blue-500">Etape 4 : </span>
              <span>Pv infraction</span>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <span><CalendarOutlined /> </span>
                <span>Date : </span>
              </div>
              <div> {enquete_object.statu < 200 ? 'en attente' : enquete_object.statu === 200 ? ' en cours' : enquete_object.statu === 210 ? ' Clean ' : formatOrderDate(enquete_object.dateinfraction)}</div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <span><FileDoneOutlined /></span>
                <span>Fichier : </span>
              </div>
              <div>
                {enquete_object.statu < 200 ? 'en attente' : enquete_object.statu === 200 ? 'en cours' : enquete_object.statu === 210 ? ' Clean ' :  <a className="ml-2" style={{ color: 'blue' }}>{enquete_object.url_pvinfraction.toString()}</a>}
              </div>
            </div>
              {
                (role === 'CH' && enquete_object.ordermission.fin === null)  ?
                  <Uploadinfraction idordermission={enquete_object.ordermission.idordermission}/> :''
              }
          </div>
      </Drawer>
      </div>
    </>
  )
}
export default EnqueteMission;