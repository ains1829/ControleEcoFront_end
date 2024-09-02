import { useState } from "react";
import Equipe from "./components/Equipe";
import {
PlusCircleOutlined
} from '@ant-design/icons';
import { Divider, Input, Modal, Select } from "antd";
function ContentEquipe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
  return (
    <>
      <div className="font-sans flex justify-between">
        <span className="text-xl font-bold mb-2" >Equipe.</span>
        <div className="bg-blue-500 text-white items-center flex p-1 rounded-2xl text-xs font-bold cursor-pointer" onClick={showModal}>
          <PlusCircleOutlined style={{fontSize:'16px'}}/>
          <span className="ml-1"> Nouveau equipe</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <Equipe />
        <Equipe />
        <Equipe />
        <Equipe />
      </div>
      <Modal className="font-sans" title={<span className="font-bold font-sans">Nouveau Equipe.</span>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Divider />
        <div>
          <form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Nom equipe</label>
              <Input className="text-xs font-sans" placeholder="nom equipe" size="large"></Input>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Chef d'equipe</label>
              <Input className="text-xs font-sans" placeholder="nom equipe" size="large"></Input>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold">Membre d'equipe</label>
              <Select
                className="font-sans"
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={handleChange}
                options={[{label : 'Rakotonavalona' , value:'1'} , {label : 'Robihery' , value :'2'}]}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default ContentEquipe;