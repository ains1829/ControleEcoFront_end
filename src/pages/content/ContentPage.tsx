import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Profil from '../../components/profil/Profil';
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function ContentPage() {
  const role = localStorage.getItem('role')
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  let item_menu = Array()
  if (role === "SG") {
    item_menu.push(getItem('Option 1', '1', <PieChartOutlined />))
    item_menu.push(getItem('Option 2', '2', <DesktopOutlined />))
    item_menu.push(
      getItem('User', 'sub1', <UserOutlined />, [
      getItem( <a href=''>salut</a>, '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ])
    )
  }
  const items: MenuItem[] = item_menu
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer},
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"></div>
        <Menu  className='font-sans'  theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className='flex justify-end' style={{ padding: 0, background: colorBgContainer }} > <Profil /> </Header>
        <Content  style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default ContentPage;