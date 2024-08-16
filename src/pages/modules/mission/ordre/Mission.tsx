import { Button, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Space, message , Modal, Divider } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import {
  CheckCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import DetailMission from "./DetailMission";
import { Ordredemission } from "../../../../types/mission/Ordredemission";
function Mission({ data }: { data: Ordredemission }) {
  const role = localStorage.getItem('role')
  let type_mission;
  if (data.typemission === 1) {
    type_mission = "DESCENTE";
  } else if (data.typemission === 2) {
    type_mission = "COLLECTE";
  } else {
    type_mission = "AUTRESUIVI";
  }
const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
  message.success('Click on Yes');
  setOpen(false)
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

const items: MenuProps['items'] = [
  {
    label:
      <Popconfirm title={<span className="font-sans">Valider L'OM</span>} description={<span className="font-sans"> Êtes-vous sûr de vouloir valider L'OM ?</span>}
        onConfirm={confirm}
        onCancel={cancel}
        okText={<span className="font-sans">Oui</span>}
        cancelText={<span className="font-sans">Non</span>}
        icon={<CheckCircleOutlined style={{color:"green"}} /> }
      >
      <span className="font-sans">Valider</span>
      </Popconfirm>,
    key: '0',
  },
  {
    label: <span className="font-sans">Mettre en Attente</span>,
    key: '1',
  },
   {
    label: <span className="font-sans">Basculer</span>,
    key: '2',
  },
];

  const [size] = useState<SizeType>('large');
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        title={<div className="font-sans text-secondary"> <QuestionCircleOutlined /> Demande OM <Divider className="font-sans" dashed style={{borderColor:'var(--blue'}} ><span className="text-xs">Details OM</span></Divider> </div>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={(_, {}) => (
          <>
            <Space>
              <Popconfirm title={<span className="font-sans">Mettre en Attente</span>} description={<span className="font-sans"> Êtes-vous sûr de vouloir mettre en attente L'OM ?</span>}
                onConfirm={confirm}
                onCancel={cancel}
                okText={<span className="font-sans">Oui</span>}
                cancelText={<span className="font-sans">Non</span>}
                >
              <Button className="font-sans text-xs" type="dashed">En Attente</Button>
              </Popconfirm>
              <Popconfirm title={<span className="font-sans">Basculer L'OM</span>} description={<span className="font-sans"> Êtes-vous sûr de vouloir basculer L'OM ?</span>}
                onConfirm={confirm}
                onCancel={cancel}
                okText={<span className="font-sans">Oui</span>}
                cancelText={<span className="font-sans">Non</span>}
                >
              <Button className="font-sans text-xs" type="dashed">Basculer</Button>
              </Popconfirm>
              <Popconfirm title={<span className="font-sans">Valider L'OM</span>} description={<span className="font-sans"> Êtes-vous sûr de vouloir valider L'OM ?</span>}
                onConfirm={confirm}
                onCancel={cancel}
                okText={<span className="font-sans">Oui</span>}
                cancelText={<span className="font-sans">Non</span>}
                icon={<CheckCircleOutlined style={{color:"green"}}  /> }
                >
                <Button className="bg-secondary text-white font-sans  text-xs" type="dashed">Valider</Button>
              </Popconfirm>
            </Space>
          </>
        )}
      >
      <DetailMission data={data} />
      </Modal>
      <div className="flex bg-primary gap-4 p-5" style={{ borderRadius: '15px' }}>
        <div className="flex-none w-5">
          {
            data.typemission === 1 ?
              (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </> 
              ) : data.typemission === 2 ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>                  
                </>
              ) :
              <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                  </svg>
              </>
          }
        </div>
        <div className="flex flex-auto items-center">
          <div className="flex flex-col w-1/2 gap-y-2 ">
            <strong className="font-bold text-blue-950">{ type_mission }</strong>
            <span> Demander par : {data.sender} <strong className="text-xs">({data.profil})</strong></span>
            <span className="text-sm"> <span className="text-sm">Region :</span> { data.region }</span>
            <span className="text-sm"> <span className="text-sm">context : </span> <span className="text-gray-600">{ data.context }</span>  </span>
          </div>
          <div className="flex-none w-1/4">
            <strong>{ data.dateordre.toString() }</strong>
          </div>
          <div className="flex flex-none gap-5 items-center">
            {
              data.status === 100 ? <><div className="flex justify-center items-center bg-green-400 p-2 rounded-md text-white"><span className="font-bold" style={{ fontSize: '10px' }}>VALIDER</span> </div></> : (data.status === 10 && role === 'SG') ?
                (
                  <>
                  <Dropdown className="font-sans" menu={{ items }} trigger={['click']} >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Button className="font-sans text-xs" type="dashed" size={size}>Action</Button>
                      </Space>
                    </a>
                  </Dropdown>
                </>
                ) :
                <><div className="flex justify-center items-center bg-amber-400 p-2 rounded-md text-white"><span className="font-bold" style={{ fontSize: '10px' }}>En attente</span> </div></>
            }
            <Button className="font-sans text-xs bg-secondary text-neutral-200" type="dashed" size={size} onClick={() => setOpen(true)}>Details</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Mission;