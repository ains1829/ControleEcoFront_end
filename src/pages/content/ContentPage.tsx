import React, { useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  ScheduleOutlined,CalendarOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Profil from '../../components/profil/Profil';
import Mic from '/mic.png';
import { UserInstance } from '../../types/administration/Userconnected';
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function ContentPage() {
  const role = UserInstance().getRole;
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
  if (role === "SG" || role === "DG") {
    item_menu.push(getItem('Dashboard', 'sub1', <DesktopOutlined />, [
      getItem(<Link to="/dashboardsg">Ordre</Link>, '1'),
      getItem(<Link to="/ppnglobal">PPN</Link>, '2'),
      getItem(<Link to="/signalement">Signalement</Link>, '6')
    ]))
    item_menu.push(getItem(<Link to='/ordredemission'>Ordre de mission</Link>, '3', <UserOutlined />))
    item_menu.push(getItem(<Link to="/societeglobal">Societe</Link>, '4', <ScheduleOutlined />))
  }
  if (role === "DSI") {
    item_menu.push(getItem('Dashboard', 'sub1', <DesktopOutlined />, [
      getItem(<Link to="/dashboardsg">Ordre</Link>, '1'),
      getItem(<Link to="/ppnglobal">PPN</Link>, '5'),
      getItem(<Link to="/signalement">Signalement</Link>, '6')
    ]))
    item_menu.push(getItem(<Link to="/societeglobal">Societe</Link>, '2', <ScheduleOutlined />))
    item_menu.push(getItem(<Link to="/administration">Administration</Link> , '3' , <ScheduleOutlined />))
    item_menu.push(getItem(<Link to="/account">Account</Link> , '4' , <ScheduleOutlined />))
  }
  if (role === "DR" || role === "DT") {
    item_menu.push(getItem('Dashboard', 'sub2', <DesktopOutlined />, [
      getItem(<Link to="/ppnregion">PPN</Link>, '6'),
      getItem(<Link to="/signalementregion">Signalement</Link>, '7')
    ]))
    item_menu.push(
      getItem('Mission', 'sub1', <UserOutlined />, [
        getItem(<Link to="/ordredemissiondr">Ordre de mission</Link>, '1'),
        getItem(<Link to="/suivimission_dr_dt" >Suivi Mission </Link> ,'2')
    ]))
    item_menu.push(getItem(<Link to="/missionnaire">Membres</Link> , '5' , <CalendarOutlined />))
    item_menu.push(getItem(<Link to="/calendar">Calendrier</Link> , '4' , <CalendarOutlined />))
    item_menu.push(getItem(<Link to="/societe">Societe</Link>, '3', <ScheduleOutlined />))
  }
  if (role === "CH") {
    item_menu.push(
      getItem('Mission', 'sub1', <UserOutlined />, [
      getItem(<Link to='/suivimission'>Suivi de mission</Link>, '1')
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
        <div className="demo-logo-vertical"><img src={Mic} width={150} /></div>
        <Menu  className='font-sans mt-5 text-sm'  theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className='flex justify-end' style={{ padding: 0, background: colorBgContainer }} >
          <Profil />
        </Header>
        <Content  style={{ margin: '0 16px' }} className='text-wrap'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default ContentPage;