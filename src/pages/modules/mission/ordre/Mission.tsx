import { Button, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Space, message , Modal, Divider } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import {
  CheckCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import DetailMission from "./DetailMission";


function Mission() {
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
        <DetailMission />
      </Modal>
      <div className="flex bg-primary gap-4 p-5" style={{borderRadius:'15px'}}>
        <div className="flex-none w-50 font-bold">DESCENTE</div>
        <div className="flex flex-auto w-60 items-center">
          <div className="flex flex-col gap-y-2 flex-auto w-70">
            <span>RAKOTONAVALONA Andy <strong className="text-xs">(Direction Regional)</strong></span>
            <span className="text-sm"> <strong className="text-sm">Region :</strong> Analamanga</span>
            <span className="text-sm"> <strong className="text-sm">context : </strong> <span className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quod beatae hic cum iure madagascar</span>  </span>
          </div>
          <div className="flex-auto w-15">
            <strong className="text-xs">23 Juillet 2024</strong>
          </div>
          <div className="flex flex-auto w-40 gap-5">
            <Dropdown className="font-sans" menu={{ items }} trigger={['click']} >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Button className="font-sans text-xs" type="dashed" size={size}>Action</Button>
                </Space>
              </a>
            </Dropdown>
            <Button className="font-sans text-xs bg-secondary text-neutral-200" type="dashed" size={size} onClick={() => setOpen(true)}>Details</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Mission;