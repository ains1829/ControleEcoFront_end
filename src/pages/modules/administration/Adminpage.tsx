import {FloatButton, Modal} from "antd";
import AdminRegional from "./components/AdminRegional";
import AdminSg from "./components/AdminSg";
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import NewAdmin from "./components/NewAdmin";
import { useState } from "react";
function Adminpage() {
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 mt-3">
        <AdminSg/>
        <AdminRegional />
      </div>
      <FloatButton icon={<PlusCircleOutlined />} type="default" shape="circle" tooltip={<div className="font-sans text-xs">Nouveaux </div>} style={{ fontSize: '20px' }} onClick={handleOk}  />
      <Modal title={<span className="font-bold font-sans">Nouveau membres.</span>} onOk={handleOk} onCancel={handleCancel} open={open} footer={(_  , {})=>(
          <></>
        )}>
        <NewAdmin closed_modal={handleCancel} />
      </Modal>
    </>
  )
}
export default Adminpage;