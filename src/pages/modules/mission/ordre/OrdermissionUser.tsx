import { useState } from "react";
import { usegetOrdermissionByUser } from "../../../../api/mission/Api";
import { Avatar, Breadcrumb, Button, DatePicker, Divider, Empty, FloatButton, message, Modal, Select, Space, theme, Tooltip } from "antd";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import Mission from "./Mission";
import TextArea from "antd/es/input/TextArea";
import {
  UserOutlined,
  AntDesignOutlined
} from '@ant-design/icons';import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Jsonmission } from "../../../../api/json/mission/Jsonmission";
import { usegetDistrictByregion, usegetEquipeByregion, usegetSocieteByregion } from "../../../../api/equipe/Apiequipe";
import { TransfData } from "../../../../types/mission/M_Equipe";
import { DistrictData } from "../../../../types/lieu/District";
import { TransFSociete } from "../../../../types/societe/Societe";
import { useSaveMission } from "../../../../api/mission/Apiordremission";
export function OrdermissionUser() {
  const [selectedButton, selectedFetch] = useState('0');
  const [Typemission, setTypemission] = useState('1');
    const [messageApi, contextHolder] = message.useMessage();
  const test_equipe = usegetEquipeByregion();
  const mutationSavemission = useSaveMission();
  let district_object = usegetDistrictByregion();
  let soicete_object = usegetSocieteByregion();
  let option_district: any[];
  let option_societe: any[];
  if (district_object !== null && !district_object.isPending && !district_object.isError) {
    let district = DistrictData(district_object.data);
    option_district = district?.map(item=>({
      value: item.iddistrict,
      label: <span className="font-sans">{item.namedistrict}</span>
    }))
    console.log(option_district)
  }
  if (soicete_object !== null && !soicete_object.isPending && !soicete_object.isError) {
    let societe = TransFSociete(soicete_object.data);
    console.log(societe)
      option_societe = societe?.map(item=>({
      value: item.idsociete,
      label: <span className="font-sans">{item.namesociete}</span>
    }))
  }
  let equipe;
  if (!test_equipe.isPending && !test_equipe.isError) {
    equipe = TransfData(test_equipe.data)
  }
  let mission_all;
  if (selectedButton === '0') {
    mission_all = usegetOrdermissionByUser();
  }
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<Jsonmission>()
  const HandleDemandeOrdermission: SubmitHandler<Jsonmission> = async (data) => {
    const reponse_saving = await mutationSavemission.mutateAsync(data);
    if (reponse_saving?.data?.status === 200) {
      messageApi.open({
        type: 'success',
        content: "Demande envoyer",
      });
      setOpen(false)
    } else {
      messageApi.open({
        type: 'error',
        content: reponse_saving?.data?.data,
      });
    }
  }
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
  const options = equipe?.map(item => ({
    value: item.idequipe,
    label: <span className="font-sans">{item.nameequipe}</span>
  }));
  return (
    <>
      {contextHolder}
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
        footer={(_, { }) => (
          <>
            <Button loading={mutationSavemission.isPending} form="myform" htmlType="submit" type="dashed" className="bg-secondary font-sans text-white text-xs">Envoyer</Button>
          </>
        )}
      >
        <Divider />
        <form id="myform" onSubmit={handleSubmit(HandleDemandeOrdermission)}>
          <div className="flex flex-col gap-y-5">
            <div className="flex gap-3">
              <div className="flex flex-col w-1/2 gap-y-1">
                <label className="font-sans">Type de mission</label>
              <Controller
                control={control}
                name="idtypeordermission"
                render={({ field: { onChange, value } }) => (
                  <Select
                    size="large"
                    className="font-sans"
                    style={{ flex: '1' }}
                    placeholder="Type de mission"
                    options={[
                      { value: '1', label: <span className="font-sans">Descente</span> },
                      { value: '2', label: <span className="font-sans">Collecte Economique</span> },
                      { value: '3', label: <span className="font-sans">Autre suivi</span> },
                    ]}
                    onChange={(value) => {
                      onChange(value);
                      setTypemission(""+value);
                    }}
                    value={value}
                  />
                )}
              />
              </div>
              <div className="flex flex-col w-1/2 gap-y-1">
                <label className="font-sans">Equipe</label>
                  <Controller control={control} name="idequipe" render={({field}) =>
                  <Select {...field} size="large" className="font-sans" style={{ flex: '1' }} placeholder={"Equipe"}
                      options={options}
                    />
                  }/>
              </div>
            </div>
            <div className="flex  gap-3">
              <div className="flex flex-col w-1/2 gap-y-1">
                
                {
                  Typemission === '1' ? <>
                    <label className="font-sans">Societe</label>
                    <Controller control={control} name="societe" render={({ field }) => 
                      <Select {...field} size="large" placeholder={"Societe"} options={option_societe}/>
                    } />
                  </> :
                  <>
                    <label className="font-sans">District</label>
                    <Controller control={control} name="district" render={({ field }) => 
                      <Select {...field} size="large" placeholder={"District"} options={option_district}/>
                    } />
                  </>
                }
                
              </div>
              <div className="flex flex-col w-1/2 gap-y-1">
              <label className="font-sans">Date mission</label>
              <Controller
                control={control}
                name="datedescente"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    className="font-sans"
                    size="large"
                    value={value ? dayjs(value, 'YYYY-MM-DD') : null}
                    onChange={(_, dateString) => onChange(dateString)}
                    format="YYYY-MM-DD"
                  />
                )}
              />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="font-sans">Context</label>
              <Controller control={control} name="motifs" render={({ field }) => 
                <TextArea {...field} rows={4} className="font-sans" />
              } />
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
        </form>
      </Modal>
    </>
  )
}
