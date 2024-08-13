import React from 'react';
import {  Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: string;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: <span className="font-sans">Nom</span>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span className='font-sans'>{text}</span>,
  },
  {
    title: <span className='font-sans'>Matricule</span>,
    dataIndex: 'age',
    key: 'age',
    render:(text)=><span className='font-sans'> {text} </span>
  },
  {
    title: <span className='font-sans'>Email</span>,
    dataIndex: 'address',
    key: 'address',
    render: (text) => <span className='font-sans'>{text}</span>
  },
  {
    title: <span className="font-sans">Qualite</span>,
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = 'geekblue' ;
          if (tag === 'Chef equipe') {
            color = 'volcano';
          }
          return (
            <Tag className='font-sans' color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: "MIC0000",
    address: 'andyrakotonavalona0@gmail.com',
    tags: ['Chef equipe', 'Commissaire'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: "MIC0000",
    address: 'andyrakotonavalona0@gmail.com',
    tags: ['Controleur'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: "MIC0000",
    address: 'andyrakotonavalona0@gmail.com',
    tags: ['Controleur'],
  },
];

const TableComponent: React.FC = () => <Table columns={columns} dataSource={data} pagination={false} />;

export default TableComponent;