import { Avatar, Button, Divider, message, Popconfirm, Tooltip } from "antd";
import {
  UserOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { M_Equipe } from "../../../../types/mission/M_Equipe";
import { UseDesactivateEquipe } from "../../../../api/equipe/ApiDr_dt";
function Equipe({ data }: { data: M_Equipe }) {
  const desactivate = UseDesactivateEquipe();
  const confirm =  async () => {
    const reponse = await desactivate.mutateAsync(data.idequipe);
    if (reponse.status === 500) {
      message.open({
        type: 'error', 
        content:reponse.object
      })
    } else {
      message.open({
        type: "success", 
        content:"Supprimer"
      })
    }
  };
  return (
    <>
      <div className="flex flex-col p-3 shadow-lg rounded-lg">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" size={"large"} />
            <div className="flex  items-center cursor-pointer font-sans text-red-500">
               <Popconfirm
                  title={<span className="font-sans text-xs">Suppression</span>}
                  description={<span className="font-sans text-xs">Êtes-vous sûr de vouloir supprimer l'équipe ?</span>}
                  onConfirm={confirm}
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button type="dashed" className="font-sans text-xs" danger icon={<DeleteOutlined />} >Supprimer</Button>
                </Popconfirm>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="font-bold">{data.chefequipe }</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-y-5">
          <div className="flex w-full justify-between items-center">
            <span className="font-bold text-center">{data.nameequipe }</span>
            <span className="text-xs text-gray-500">en mission</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center text-blue-500">
              <span className="font-bold text-xl">{data.mission_total }</span>
              <span className="text-xs">Total mission</span>
            </div>
            <div className="flex flex-col items-center text-green-500">
              <span className="font-bold text-xl">{data.mission_fini }</span>
              <span className="text-xs">Mission fini</span>
            </div>
            <div className="flex flex-col items-center text-yellow-500">
              <span className="font-bold text-xl">{data.mission_encours }</span>
              <span className="text-xs">Mission en cours</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Avatar.Group shape="circle">
              {
                data.membres.map((item) => (
                  <Tooltip key={item.matricule} title={<span className="font-sans text-xs">{ item.matricule}</span>} placement="top">
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  </Tooltip>
                ))
              }
          </Avatar.Group>
        </div>
      </div>
    </>
  )
}
export default Equipe;