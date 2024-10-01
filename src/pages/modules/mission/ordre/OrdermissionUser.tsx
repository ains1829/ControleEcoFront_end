import { useState } from "react";
import { usegetOrdermissionByUser } from "../../../../api/mission/Api";
import { Breadcrumb, Button, DatePicker, Empty, FloatButton, Input, message, Modal, Segmented, Select, theme } from "antd";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import Mission from "./Mission";
import TextArea from "antd/es/input/TextArea";
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Jsonmission } from "../../../../api/json/mission/Jsonmission";
import { usegetDistrictByregion, usegetEquipeByregion, usegetSocieteByregion } from "../../../../api/equipe/Apiequipe";
import { TransfData } from "../../../../types/mission/M_Equipe";
import { DistrictData } from "../../../../types/lieu/District";
import { TransFSociete } from "../../../../types/societe/Societe";
import { useSaveMission } from "../../../../api/mission/Apiordremission";
import Search, { SearchProps } from "antd/es/input/Search";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useOMvalidationbyregion } from "../../../../api/dashboard/Statistique";
export function OrdermissionUser() {
  const [selectedButton, selectedFetch] = useState('0');
  const [Typemission, setTypemission] = useState('1');
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const mission_all = usegetOrdermissionByUser(page,Number(selectedButton),search);
  const test_equipe = usegetEquipeByregion();
  const mutationSavemission = useSaveMission();
  const district_object = usegetDistrictByregion();
  const soicete_object = usegetSocieteByregion();
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { control, handleSubmit } = useForm<Jsonmission>()
  const [open, setOpen] = useState(false);
  const om_validation = useOMvalidationbyregion();
  if (mission_all.isPending) {
    return<>loading...</>
  }
  if (mission_all.isError) {
    return<>Error</>
  }
   if (om_validation.isPending) {
    return <>loading...</>
  }
  if (om_validation.isError) {
    return <>error...</>
  }
  let option_district: any[];
  let option_societe: any[];
  if (district_object.isSuccess) {
    option_district = DistrictData(district_object.data)?.map(item=>({
      value: item.iddistrict,
      label: <span className="font-sans">{item.namedistrict}</span>
    }))
  }
  if (soicete_object.isSuccess) {
      option_societe = TransFSociete(soicete_object.data)?.map(item=>({
      value: item.idsociete,
      label: <span className="font-sans">{item.namesociete}</span>
    }))
  }
  let equipe:any[]=[];
  if (test_equipe.isSuccess) {
    equipe = TransfData(test_equipe.data)
  }
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

  const contendata = TransformDataContent(mission_all?.data);
  const handleClick = (name: string) => {
    setPage(0)
    selectedFetch(name)
  }
  const options = equipe?.map(item => ({
    value: item.idequipe,
    label: <span className="font-sans">{item.nameequipe}</span>
  }));
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    if (value.trim().length === 0) {
      setSearch('')
    } else {
      setPage(0);
      setSearch(value);
    }
  };
    const handleNext = () => {
    if (mission_all?.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (mission_all?.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (mission_all?.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (mission_all?.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  const data_om = om_validation.data;
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
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <span className="text-xl font-bold" >Demande OM.</span>
            <span className="font-bold text-xs">({data_om.total} total)</span>
          </div>
          <div className="w-1/3">
            <Search placeholder="Rechercher dans les demandes" allowClear onSearch={onSearch} style={{ fontFamily:'font-sans'}} className="font-sans"/>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="w-1/4">
            <Segmented
              className="font-sans p-1"
              options={[
                { label: <span className="text-xs">All</span> , value: '0' },
                { label: <span className="text-xs">Valider</span> , value: '1' },
                { label: <span className="text-xs">En attente</span> , value: '2' },
                { label: <span className="text-xs">Supprimer</span> , value: '3' }
              ]}
              value={selectedButton}
              onChange={handleClick}
              block
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            />
          </div>
          <div className="w-3/4 grid grid-cols-3 gap-5">
            <div className="flex justify-between items-center border-b-2 border-gray-100">
              <span className="text-gray-400">valider</span> 
              <span className="font-bold text-2xl">{data_om.valider}</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-gray-100">
              <span className="text-gray-400">En attente </span> 
              <span className="font-bold text-2xl">{data_om.non_valider + data_om.attente_dg} </span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-gray-100">
              <span className="text-gray-400">Supprimer </span> 
              <span className="font-bold text-2xl">{data_om.supprimer} </span>
            </div>
          </div>
        </div>
         {
          contendata.mission.length === 0 ? <Empty /> :
          <>
            <div className="flex gap-4 p-5">
              <div className="flex-none w-1/4 text-xs font-bold">Demande</div>
              <div className="flex-none w-1/4 text-xs font-bold">Date</div>
              <div className="flex-none w-1/4 text-xs font-bold">Status</div>
              <div className="flex-none w-1/4 text-xs font-bold">Action</div>
            </div>
            {contendata.mission.map((item, index) => (
              <Mission key={index} data={item} />
            ))}
          </>
        }
          <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className={`${ClassNamePrevious} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handlePrevious}>
              <LeftOutlined />
              <span>
                Previous
              </span>
            </div>
            <div className={`${classNameNext} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handleNext}>
              <span>
                Next
              </span>
              <RightOutlined/>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold">Page {mission_all?.data.page + 1} de {mission_all?.data.nombrepage}</span>
          </div>
        </div>
      </div>
      <FloatButton type="primary" shape="circle" tooltip={<div className="font-sans">Nouveaux demande ?</div>} style={{fontSize:'20px'}}  onClick={() => setOpen(true)}/>
       <Modal
        title={
          <div className="w-5/6 font-sans flex flex-col gap-y-2 p-4">
            <span className="text-xl">Demande</span>
            <span className="text-xs font-simple text-gray-600 ">
              Veuillez compléter ce formulaire pour soumettre une demande d'ordre de mission.
              Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
            </span>
            </div>
        }
        centered
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
        <form id="myform" onSubmit={handleSubmit(HandleDemandeOrdermission)}>
          <div className="flex flex-col gap-y-5 divide-y">
            <div className="grid grid-cols-2 p-4 justify-between items-center">
                <div className="flex flex-col font-sans">
                  <label className="font-sans font-bold">Type de mission</label>
                  <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                </div>
                <Controller
                  control={control}
                  name="idtypeordermission"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className="font-sans"
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
            <div>
              <div className="items-center font-sans grid grid-cols-2 p-4">
                <div className="flex flex-col">
                  <label className="font-sans font-bold">Equipe</label>
                  <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                </div>
                  <Controller control={control} name="idequipe" render={({field}) =>
                  <Select {...field} className="font-sans"  placeholder={"Equipe"}
                      options={options}
                    />
                  }/>
              </div>
            </div>
            {
              Typemission === '1' ? <>
                <div key={1} className="grid grid-cols-2 items-center font-sans p-4">
                  <div className="flex flex-col">
                    <label className="font-sans font-bold">Societe</label>
                    <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Controller control={control} name="societe" render={({ field }) => 
                      <Select allowClear key={1} {...field} placeholder={"Societe"} options={option_societe}/>
                    } />
                    <div className="flex gap-2">
                      <Controller control={control} name="lieu_controle" render={({ field }) => 
                        <Input allowClear {...field} className="font-sans" placeholder="Indiquez le site exact (ex: bureau,entrepot)" required/>
                      } />
                    </div>
                  </div>
                </div>
              </> :
                <>
                  <div key={2} className="grid grid-cols-2 items-center font-sans p-4">
                    <div className="flex flex-col">
                      <label className="font-sans font-bold">District</label>
                      <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Controller control={control} name="district" render={({ field }) => 
                        <Select allowClear key={2} {...field} placeholder={"District"} options={option_district}/>
                      } />
                      <div className="flex gap-2">
                        <Controller control={control} name="lieu_controle" render={({ field }) => 
                          <Input {...field} className="font-sans" placeholder="Indiquez le lieu de la mission" required/>
                        } />
                      </div>
                    </div>
                  </div>
              </>
            }
            <div className="grid grid-cols-2 items-center p-4 gap-y-1">
              <div className="flex flex-col font-sans">
                <label className="font-sans font-bold">Date mission</label>
                <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
              </div>
              <Controller
                control={control}
                name="datedescente"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    className="font-sans"
                  
                    value={value ? dayjs(value, 'YYYY-MM-DD') : null}
                    onChange={(_, dateString) => onChange(dateString)}
                    format="YYYY-MM-DD"
                    required
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 p-4">
              <div className="font-sans flex flex-col">
                <label className="font-sans font-bold">Motif</label>
                <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
              </div>
              <Controller control={control} name="motifs" render={({ field }) => 
                <TextArea {...field} rows={2} className="font-sans" required placeholder="Motif du demande"/>
              } />
            </div>
            <div className="grid grid-cols-2 p-4">
              <div className="font-sans flex flex-col">
                <label className="font-sans font-bold">Context</label>
                <span className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
              </div>
              <Controller control={control} name="context" render={({ field }) => 
                <TextArea {...field} rows={4} className="font-sans" required placeholder="contexte du demande"/>
              } />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}
