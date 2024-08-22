import {Avatar, Button} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {
LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Profil() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token-user');
    navigate("/");
  }
  const role = localStorage.getItem("role");
  const items: MenuProps['items'] = [
    {
      label: <span className='font-sans'>andyRakotonavalona0@gmail.com</span>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <Button danger icon={<LogoutOutlined />} className='font-sans' onClick={handleLogout}>Deconnexion</Button>,
      key: '3',
    },
  ];
  return (
    <>
      <Dropdown  menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar style={{ backgroundColor: '#f56a00', marginLeft: '-50px' }}>{role}</Avatar>
          </Space>
        </a>
      </Dropdown>
    </>
  );
}

export default Profil;