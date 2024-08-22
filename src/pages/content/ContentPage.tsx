import React, { useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
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
    item_menu.push(getItem('Dashboard', 'sub1', <DesktopOutlined />, [
      getItem(<Link to="/dashboardsg">Ordre</Link>, '1'),
      getItem(<Link to="#">PPN</Link>,'2')
    ]))
    item_menu.push(
      getItem('Mission', 'sub2', <UserOutlined />, [
      getItem( <Link to='/ordredemission'>Ordre de mission</Link>, '3'),
    ])
    )
  }
  if (role === "DR") {
    item_menu.push(
      getItem('Mission', 'sub1', <UserOutlined />, [
      getItem( <Link to="/ordredemissiondr">Ordre de mission</Link>, '3')
    ]))
  }
  if (role === "CH") {
    item_menu.push(
      getItem('Mission', 'sub1', <UserOutlined />, [
      getItem(<Link to='/suivimission'>Suivi de mission</Link>, '4')
    ]))
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