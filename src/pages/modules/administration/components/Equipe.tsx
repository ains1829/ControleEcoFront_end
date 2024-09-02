import { Avatar, Divider, Dropdown, MenuProps, Tooltip } from "antd";
import {
  UserOutlined,
  AntDesignOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
function Equipe() {
  const handleClick = () => {
    alert('modifier')
  }
  const items: MenuProps['items'] = [
  {
    key: '1',
      label: (
      <div className="flex  font-sans mb-1" onClick={handleClick}>
        <EditOutlined />
        <span className="text-xs ml-2">Modifier</span>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex  font-sans">
        <DeleteOutlined />
        <span className="text-xs ml-2">Supprimer</span>
      </div>
    ),
  }
];

  return (
    <>
      <div className="flex flex-col p-3 shadow-lg rounded-lg">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" size={"large"} />
            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
              <MoreOutlined className="cursor-pointer"/>
            </Dropdown>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="font-bold">RAKOTONAVALONA Andy</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-y-5">
          <div className="flex w-full justify-between items-center">
            <span className="font-bold text-center">Equipe A</span>
            <span className="text-xs text-gray-500">en mission</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center text-blue-500">
              <span className="font-bold text-xl">5</span>
              <span className="text-xs">Total mission</span>
            </div>
            <div className="flex flex-col items-center text-green-500">
              <span className="font-bold text-xl">2</span>
              <span className="text-xs">Mission fini</span>
            </div>
            <div className="flex flex-col items-center text-yellow-500">
              <span className="font-bold text-xl">0</span>
              <span className="text-xs">Mission en cours</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Avatar.Group shape="circle">
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
    </>
  )
}
export default Equipe;