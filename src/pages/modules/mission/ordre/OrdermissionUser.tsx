import { useState } from "react";
import { usegetOrdermissionByUser } from "../../../../api/mission/Api";
import { Avatar, Breadcrumb, Button, DatePicker, DatePickerProps, Divider, Empty, FloatButton, Modal, Select, Space, theme, Tooltip } from "antd";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import Mission from "./Mission";
import TextArea from "antd/es/input/TextArea";
import {
  UserOutlined,
  AntDesignOutlined
} from '@ant-design/icons';
export function OrdermissionUser() {
  const [selectedButton, selectedFetch] = useState('0');
  let mission_all;
  if (selectedButton === '0') {
    mission_all = usegetOrdermissionByUser();
  } 
  const [open, setOpen] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (mission_all?.isPending) {
    return<>loading...</>
  }
  if (mission_all?.isError) {
    return<>Error</>
  }
  const contendata = TransformDataContent(mission_all?.data);
  const handleClick = (name: string) => {
    selectedFetch(name)
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
      <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: 'Ordre de mission' }]} />
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Space>
          <div className="flex gap-x-5 mb-3">
            <Button className={`font-sans ${selectedButton === '0' ? 'bg-secondary text-white' : ''}`} type="dashed" onClick={()=>handleClick('0')}>All</Button>
          </div>
        </Space>
        {
          contendata.mission.length === 0 && <Empty />
        }
        {contendata.mission.map((item, index) => (
          <Mission key={index} data={item} />
        ))}
        {contendata.mission.map((item, index) => (
          <Mission key={index} data={item} />
        ))}
      </div>
      <FloatButton type="primary" shape="circle" tooltip={<div className="font-sans bg-secondary">Nouveaux demande ?</div>} style={{fontSize:'20px'}}  onClick={() => setOpen(true)}/>
       <Modal
        title={<div className="flex flex-col gap-y-3 font-sans">
          <span className="text-secondary text-2xl">Nouveaux Demande</span>
          <span className="text-sm text-gray-400 ">
            Veuillez compléter ce formulaire pour soumettre une demande d'ordre de mission.
            Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
          </span>
        </div>}
        style={{ top: 20 }}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Divider />
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-3">
            <div className="flex flex-col w-1/2 gap-y-1">
              <label className="font-sans">Type de mission</label>
              <Select size="large" className="font-sans" style={{ flex: '1' }} placeholder={"Type de mission"}
                options={[
                  { value: 'jack', label: <span className="font-sans">Jack</span>  },
                  { value: 'lucy', label: <span className="font-sans">Lucy</span> },
                  { value: 'Yiminghe', label: <span className="font-sans">Ains</span> },
                ]}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-y-1">
              <label className="font-sans">Equipe</label>
              <Select size="large" className="font-sans" style={{ flex: '1' }} placeholder={"Equipe"}
                options={[
                  { value: 'jack', label: <span className="font-sans">Equipe A</span>  },
                  { value: 'lucy', label: <span className="font-sans">Equipe B</span> },
                  { value: 'Yiminghe', label: <span className="font-sans">EquipeC</span> },
                ]}
              />
            </div>
          </div>
          <div className="flex  gap-3">
            <div className="flex flex-col w-1/2 gap-y-1">
              <label className="font-sans">Societe</label>
              <Select size="large"  placeholder={"Societe"} />
            </div>
            <div className="flex flex-col w-1/2 gap-y-1">
              <label className="font-sans">Date mission</label>
              <DatePicker className="font-sans" size="large" onChange={onChange} />
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-sans">Context</label>
            <TextArea rows={4} className="font-sans" />
          </div>
          <div className="flex mt-3 items-center">
            <label className="font-sans">Missionnaire : </label>
              <Avatar.Group style={{marginLeft:'15px'}} shape="square">
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
        </div>
      </Modal>
    </>
  )
}
