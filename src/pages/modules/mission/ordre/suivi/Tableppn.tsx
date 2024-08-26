import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface PpnType {
  key: React.Key;
  product: string;
  price: number;
  region: string;
}

const columns: TableColumnsType<PpnType> = [
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Region',
    dataIndex: 'region',
  },
];

const data: PpnType[] = [
  {
    key: '1',
    product: 'Rice',
    price: 1500,
    region: 'Antananarivo',
  },
  {
    key: '2',
    product: 'Sugar',
    price: 2200,
    region: 'Toamasina',
  },
  {
    key: '3',
    product: 'Oil',
    price: 4500,
    region: 'Antsirabe',
  },
  {
    key: '4',
    product: 'Flour',
    price: 3000,
    region: 'Mahajanga',
  },
];

const Tableppn: React.FC = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
);

export default Tableppn;
