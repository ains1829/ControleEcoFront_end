import {Avatar , Dropdown} from 'antd'
import type { MenuProps } from 'antd';
import {
LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserInstance } from '../../types/administration/Userconnected';

function Profil() {
  const navigate = useNavigate();
  const role = UserInstance();
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token-user');
    navigate("/");
  }
  const items: MenuProps['items'] = [
    {
      label: <div className='font-sans  flex items-center gap-2' onClick={handleLogout}>
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
          <Avatar src={role.getPhoto} />
          <div className='flex flex-col text-xs font-sans gap-y-1'>
            <span className='font-bold'>
              {role.getName}
            </span>
            <span className='text-gray-500'>{role.getProfile }</span>
          </div>
        </div>
      </Dropdown>
    </>
  );
}

export default Profil;