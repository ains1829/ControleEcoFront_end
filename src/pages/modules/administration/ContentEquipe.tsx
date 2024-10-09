import { useState } from "react";
import Equipe from "./components/Equipe";
import {
PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Divider, Input, message, Modal, Select } from "antd";
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
        <Button icon={<PlusCircleOutlined />} className="font-sans text-xs" type="dashed" onClick={showModal}>Nouveau equipe</Button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {
          data.map((item) => (   
            <Equipe key={item.idequipe}  data={item}/>
          ))
        }
      </div>
      <Modal centered className="font-sans" title={<span className="font-bold font-sans">Nouveau Equipe.</span>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={(_, { }) => (
          <>
            <Button loading={newEquipe.isPending} htmlType="submit" type="dashed" form="equipe_form" className="font-sans text-xs" size="large"> Valider </Button>
          </>
        )} >
        <Divider />
        <div>
          <form id="equipe_form" className="flex flex-col gap-y-3" onSubmit={handleSubmit(HandleSubmitEquipe)}>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Nom equipe</label>
              <Controller control={control} name="nameequipe" render={({field}) =>  <Input {...field} required className="text-xs font-sans" placeholder="nom equipe" size="large"/>} />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Chef d'equipe</label>
              <Controller control={control} name="idadministration" render={({field}) =>
                <Select {...field} className="font-sans" allowClear options={options} placeholder="Chef" />} />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Membre d'equipe</label>
              <Controller control={control} name="membres" render={({field}) => <Select {...field} className="font-sans" mode="multiple" allowClear style={{ width: '100%' }} placeholder="Membre equipe" options={options}  />} />
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default ContentEquipe;