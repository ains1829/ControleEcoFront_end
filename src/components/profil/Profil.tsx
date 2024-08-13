import {Avatar} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

function Profil() {
  const role = localStorage.getItem("role")
  const items: MenuProps['items'] = [
    {
      label: "andyRakotonavalona0@gmail.com",
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Deconnexion',
      key: '3',
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
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