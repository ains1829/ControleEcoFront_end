import { Button, Modal, Space, Table, TableColumnsType, TableProps, theme } from "antd";
import {TableOutlined } from '@ant-design/icons';
import { useState } from "react";
import Tabledistrict from "./Tabledistrict";
interface DataType {
  key: string;
  nomregion: string;
  prix1: number;
  prix2: number;
  prix3: number;
}
function Provinceregion() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [open, setOpen] = useState(false);

const handleEdit = (key: string) => {
  console.log('Edit record with key:', key);
  setOpen(true);
  };
const data: DataType[] = [
  {
    key: '1',
    nomregion: 'Analamanga',
    prix1: 150,
    prix2: 200,
    prix3: 250,
  },
  {
    key: '2',
    nomregion: 'Atsinanana',
    prix1: 100,
    prix2: 130,
    prix3: 170,
  },
  {
    key: '3',
    nomregion: 'Boeny',
    prix1: 200,
    prix2: 250,
    prix3: 300,
  },
  {
    key: '4',
    nomregion: 'Menabe',
    prix1: 120,
    prix2: 160,
    prix3: 200,
  },
];

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Region Name',
      dataIndex: 'nomregion',
      key: 'nomregion',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className="font-sans">{text}</span>
    },
    {
      title: 'Prix Moyenne',
      dataIndex: 'prix1',
      key: 'prix1',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.prix1 - b.prix1,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
    {
      title: 'Prix Max',
      dataIndex: 'prix2',
      key: 'prix2',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent'},
      }),
      sorter: (a, b) => a.prix2 - b.prix2,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
    {
      title: 'Prix Min',
      dataIndex: 'prix3',
      key: 'prix3',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.prix3 - b.prix3,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
    {
      key: 'action',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" className="text-xs font-sans p-4 bg-red-500 text-white" icon={<TableOutlined />} onClick={() => handleEdit(record.key)} > Voir</Button>
        </Space>
      ),
    },
  ];
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div
        className="flex flex-col  font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
    > 
      <div className="flex justify-between mb-5 items-center">
        <span className="text-bold text-sm font-bold ">Detail par region</span>
        <span className="text-bold text-sm font-bold">Aout 2024</span>
      </div>
      <Table  columns={columns} dataSource={data} onChange={onChange} pagination={false} />
      <Modal
        title={<span className="text-sm font-bold" >Detail Analamanga.</span>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Tabledistrict/>
      </Modal>
    </div>
    
  )
}
export default Provinceregion;