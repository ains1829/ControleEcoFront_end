import {Avatar} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

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

function Profil() {
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar  style={{ backgroundColor: '#f56a00' , marginLeft:'-50px'}}>SG</Avatar>
          </Space>
        </a>
      </Dropdown>
    </>
  );
}

export default Profil;