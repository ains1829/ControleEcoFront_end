import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  district: string;
  prixMoyenne: number;
  prixMax: number;
  prixMin: number;
}

const data: DataType[] = [
  {
    key: '1',
    district: 'Antananarivo',
    prixMoyenne: 120,
    prixMax: 150,
    prixMin: 90,
  },
  {
    key: '2',
    district: 'Toamasina',
    prixMoyenne: 100,
    prixMax: 130,
    prixMin: 80,
  },
  {
    key: '3',
    district: 'Fianarantsoa',
    prixMoyenne: 110,
    prixMax: 140,
    prixMin: 85,
  },
  {
    key: '4',
    district: 'Mahajanga',
    prixMoyenne: 115,
    prixMax: 145,
    prixMin: 95,
  },
];

const Tabledistrict: React.FC = () => {

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      filters: [
        { text: 'Antananarivo', value: 'Antananarivo' },
        { text: 'Toamasina', value: 'Toamasina' },
        { text: 'Fianarantsoa', value: 'Fianarantsoa' },
        { text: 'Mahajanga', value: 'Mahajanga' },
      ],
      onFilter: (value, record) => {
        const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        const recordValue = record.district.toLowerCase();
        return recordValue.startsWith(filterValue);
      },
       filterSearch: true,
        width: '25%',
        render: (text) =>
      <span className='font-sans'>{text}</span>
    },
    {
      title: 'Prix Moyenne',
      dataIndex: 'prixMoyenne',
      key: 'prixMoyenne',
      sorter: (a, b) => a.prixMoyenne - b.prixMoyenne, render: (text) =>
      <span className='font-sans'>{text} Ariary</span>
     
    },
    {
      title: 'Prix Max',
      dataIndex: 'prixMax',
      key: 'prixMax',
      sorter: (a, b) => a.prixMax - b.prixMax, render: (text) =>
      <span className='font-sans'>{text} Ariary</span>
    },
    {
      title: 'Prix Min',
      dataIndex: 'prixMin',
      key: 'prixMin',
      sorter: (a, b) => a.prixMin - b.prixMin, render: (text) =>
      <span className='font-sans'>{text} Ariary</span>
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} pagination={false} />
    </>
  );
};

export default Tabledistrict;
