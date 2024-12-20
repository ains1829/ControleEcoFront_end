import { Button, Popconfirm, PopconfirmProps, message , Modal, Tag } from "antd";
import { useState } from "react";
import {
  CheckCircleOutlined,
  QuestionCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import DetailMission from "./DetailMission";
import { Ordredemission } from "../../../../types/mission/Ordredemission";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useValidateOrdermission, useValidateOrdermissionDgdmt } from "../../../../api/mission/Apiordremission";
import { UserInstance } from "../../../../types/administration/Userconnected";
import { useNavigate } from "react-router-dom";
export function formatOrderDate(dateString: Date): string {
  return dayjs(dateString).format('DD MMMM YYYY');
}
function Mission({ data }: { data: Ordredemission }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const validation = useValidateOrdermission();
  const validation_dg = useValidateOrdermissionDgdmt();
  const role = UserInstance().getRole;
  dayjs.locale('fr')
  let type_mission;
  if (data.typemission === 1) {
    type_mission = "# Descentre";
  } else if (data.typemission === 2) {
    type_mission = "# Collecte";
  } else {
    type_mission = "# Autresuivi";
  }
  const confirms_ordermission = async (id: number, validate: boolean) => {
    try {
      if (role === "SG") {
        const reponse = await validation.mutateAsync({ idordermission: id, validate , navigate});
        if (reponse.status === 200) {
          if (validate == true) {
            message.success('Demande OK');
          } else {
            message.success('Om supprimer')
          }
        } else {
          message.error(reponse.object);
        }
      } else {
        const reponse = await validation_dg.mutateAsync({ idordermission: id,validate , navigate });
        if (reponse.status === 200) {
          if (validate == true) {
            message.success('Demande OK');
          } else {
            message.success('Om supprimer')
          }
        } else {
          message.error(reponse.object);
        }
      }
    } catch (error) {
      message.error('Mutation failed');
    }
    finally {
      setOpen(false);
    }
  };
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };
  const truncateText = (text: string) => {
    let maxlength = 35;
    return text.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
  };
  return (
    <>
      <Modal
        title={
          <div className="flex flex-col gap-y-2 font-sans text-secondary">
            <span className="text-xl"><QuestionCircleOutlined /></span>
            <span>Demande d'ordre de mission.</span>
          </div>
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer
      >
        <DetailMission data={data} />
      </Modal>
      <div className="flex border-b-2 border-dotted border-gray-100 gap-4 p-3 items-center">
        <div className="flex-none w-1/4">
          {
            data.typemission === 1 ?
              (
                <>
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    <div className="flex flex-col ml-2 gap-y-1">
                      <div>
                        <span className="font-bold text-white bg-green-400 p-1  text-xs rounded-full ">{type_mission}</span>
                      </div>
                      <span className="text-xs"> <span className="text-sm"> </span> <span className="text-gray-600">{ truncateText(data.context) }</span>  </span>
                    </div>
                  </div>
                </> 
              ) : data.typemission === 2 ? (
                <>
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                    <div className="flex flex-col ml-2 gap-y-1">
                      <div>
                        <span className="font-bold text-white bg-blue-400  p-1  text-xs rounded-full ">{type_mission}</span> 
                      </div>
                      <span className="text-xs"> <span className="text-sm"></span> <span className="text-gray-600">{ truncateText(data.context) }</span>  </span>
                    </div>
                  </div>
                </>
              ) :
              <>
                <div className="flex">  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                    <div className="flex flex-col ml-2 gap-y-1">
                      <div>
                        <span className="font-bold text-white bg-yellow-400 p-1  text-xs rounded-full ">{type_mission}</span>
                      </div>
                      <span className="text-xs"> <span className="text-sm"></span> <span className="text-gray-600">{ truncateText(data.context) }</span>  </span>
                    </div>
                </div>
            </>
          }
        </div>
        <div className="flex-none w-1/4">
          <span className="text-xs">{ formatOrderDate(data.dateordre)}</span>
        </div>
        <div className="flex-none w-1/4">
          {
            data.status === 100 ? <Tag color="success" className="font-sans p-1"> Approuvé</Tag> :
              data.status === 500 ? <Tag color="error" className="font-sans p-1">Rejeté</Tag> : 
              (data.status === 0 && role === 'SG') ? <Tag color="error" className="font-sans p-1">Validation requise</Tag> : 
                (data.status === 10 && role === 'SG') ? <Tag color="warning" className="font-sans p-1">Validation DG requise</Tag> :
                  (data.status === 10 && role === 'DG') ?
                    <Tag color="yellow" className="font-sans p-1">Validation requise</Tag> :
                      <Tag color="warning" className="font-sans p-1">En attente</Tag>
          }
        </div>
        <div className="flex flex-none w-1/4 gap-5 items-center">
          {
            ((data.status === 0 && role === 'SG') || (data.status === 10 && role === 'DG')) ? <>
                <Popconfirm title={<span className="font-sans text-xs"> Approuvé L'OM</span>} description={<span className="font-sans text-xs"> Êtes-vous sûr de vouloir  Approuvé cette demande d'OM ?</span>}
                  onConfirm={()=>confirms_ordermission(data.idordermission , true)}
                  onCancel={cancel}
                  okText={<span className="font-sans text-xs">Oui</span>}
                  cancelText={<span className="font-sans text-xs">Non</span>}
                  icon={<CheckCircleOutlined style={{color:"green"}} /> }
                >
                  <Button className="font-sans text-xs" type="dashed" icon={<CheckCircleOutlined />}> Approuvé</Button>
                </Popconfirm>
              <Popconfirm
                title={<span className="font-sans text-xs">Rejeté L'OM</span>} description={<span className="font-sans text-xs"> Êtes-vous sûr de vouloir de Rejeté cette demande d'OM ?</span>}
                onConfirm={()=>confirms_ordermission(data.idordermission , false)}
                onCancel={cancel}
                okText={<span className="font-sans text-xs">Oui</span>}
                cancelText={<span className="font-sans text-xs">Non</span>}
              >
                <Button  type="dashed" className="font-sans text-xs"  icon={<CloseCircleOutlined />} danger>Rejeté</Button>
              </Popconfirm>
            </>
              :
              ''
          }
          <Button className="font-sans text-xs" type="dashed"onClick={() => setOpen(true)}>Detail</Button>
        </div>
      </div>
    </>
  )
}
export default Mission;