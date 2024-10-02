import {Avatar, Button} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {
LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserInstance } from '../../types/administration/Userconnected';

function Profil() {
  const navigate = useNavigate();
  const role = UserInstance().getRole;
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token-user');
    navigate("/");
  }
  const items: MenuProps['items'] = [
    {
      label: <div className='font-sans text-red-500 flex items-center gap-3' onClick={handleLogout}>
        <LogoutOutlined />
        <span>
          Deconnexion
        </span>
            </div>,
      key: '1',
    },
  ];
  return (
    <>
      <Dropdown  menu={{ items }} trigger={['click']} arrow placement='bottomLeft'>
        <div className='flex items-center gap-2 cursor-pointer p-2'>
          <Avatar style={{ backgroundColor: '#f56a00' }}>{role}</Avatar>
          <div className='flex flex-col text-xs font-sans gap-y-1'>
            <span className='font-bold'>
              ANDY RAKOTONAVALONA
            </span>
            <span className='text-gray-500'>Direction Systeme Informatique</span>
          </div>
        </div>
      </Dropdown>
    </>
  );
}

export default Profil;