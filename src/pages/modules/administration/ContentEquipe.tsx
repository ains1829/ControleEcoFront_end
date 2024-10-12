import { useState } from "react";
import Equipe from "./components/Equipe";
import {
UsergroupAddOutlined
} from '@ant-design/icons';
import { Button, Input, message, Modal, Select } from "antd";
import { usegetEquipeByregion } from "../../../api/equipe/Apiequipe";
import { TransfData } from "../../../types/mission/M_Equipe";
import { UseAdministrationNoequipe, useSaveNewEquipe } from "../../../api/equipe/ApiDr_dt";
import { TransformDataAdministration } from "../../../types/administration/Administration";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EquipeForm } from "../../../types/mission/EquipeForm";
import { useNavigate } from "react-router-dom";
function ContentEquipe() {
  const navigate = useNavigate();
  const equipe = usegetEquipeByregion(navigate);
  const personneAdmnin = UseAdministrationNoequipe(navigate);
  const newEquipe = useSaveNewEquipe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit , reset } = useForm<EquipeForm>();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (equipe.isPending) {
    return <>loading...</>
  }
  if (equipe.isError) {
    return <>error...</>
  }
  const options: any[] = [];
  if (personneAdmnin.isSuccess) {
    let data_admin = TransformDataAdministration(personneAdmnin.data);
    data_admin.forEach(item => {
      options.push({ label: <span className="font-sans">{item.name}</span>  , value : item.key})
    })
  }
  const data = TransfData(equipe.data);
  const HandleSubmitEquipe: SubmitHandler<EquipeForm> = async (data: EquipeForm) => {
    if (data.idadministration !== undefined && data.membres.length >= 2) {
      const reponse = await newEquipe.mutateAsync({data , navigate});
      console.log(reponse);
      if (reponse.status === 200) {
        setIsModalOpen(false);
        message.open({
          type :'success',
          content : 'Nouveau Equipe'
        })
        reset()
      } else {
        setIsModalOpen(false);
        message.open({
          type :'error',
          content : reponse.object
        })
      }
    } else {
      alert('Completez les informations');
      reset();
    }
  }
  return (
    <>
      <div className="font-sans flex justify-between">
        <span className="text-xl font-bold mb-2" >Misionnaires.</span>
        <Button icon={<UsergroupAddOutlined />} className="font-sans text-xs" type="dashed" onClick={showModal}>Nouveau equipe</Button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {
          data.map((item) => (   
            <Equipe key={item.idequipe}  data={item}/>
          ))
        }
      </div>
      <Modal centered className="font-sans" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={(_, { }) => (
          <>
            <Button className="font-sans text-xs" type="dashed" onClick={handleCancel}>Cancel</Button>
            <Button loading={newEquipe.isPending} htmlType="submit" type="dashed" form="equipe_form" className="font-sans text-xs bg-secondary text-white"> Valider </Button>
          </>
        )} >
        <div>
          <form id="equipe_form" className="flex flex-col gap-y-1" onSubmit={handleSubmit(HandleSubmitEquipe)}>
            <div className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <span className="font-bold font-sans">Nouveau Equipe.</span>
            </div>
            <div className="flex flex-col gap-y-2 p-2">
              <label className="text-xs font-bold">Nom d'equipe</label>
              <Controller control={control} name="nameequipe" render={({field}) =>  <Input {...field} required className="text-xs font-sans" placeholder="nom equipe" size="large"/>} />
            </div>
            <div className="flex flex-col gap-y-2 p-2">
              <label className="text-xs font-bold">Chef d'equipe</label>
              <Controller control={control} name="idadministration" render={({field}) =>
                <Select {...field} className="font-sans" options={options} placeholder="Chef" />} />
            </div>
            <div className="flex flex-col gap-y-2 p-2">
              <label className="text-xs font-bold">Membre d'equipe</label>
              <Controller control={control} name="membres" render={({field}) => <Select {...field} className="font-sans" mode="multiple" style={{ width: '100%' }} placeholder="Membre equipe" options={options}  />} />
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default ContentEquipe;