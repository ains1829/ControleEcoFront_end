import { Progress, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {useStatbyregionbytypemission } from '../../../api/dashboard/Statistique';
import { Statregiontype, TransFormStatRegion } from '../../../types/stat/Statregiontype';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const columns: TableColumnsType<Statregiontype> = [
  {
    title:<span className='font-sans'>Region</span>,
    dataIndex: 'nameregion',
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Province</span>,
    dataIndex: 'nameprovince',
    filters: [
      {
        text: 'Antananarivo',
        value: 'Antananarivo',
      },
      {
        text: 'Fianarantsoa',
        value: 'Fianarantsoa',
      },
      {
        text: 'Mahajanga',
        value: 'Mahajanga',
      },
      {
        text: 'Toamasina',
        value: 'Toamasina',
      },
      {
        text: 'Toliara',
        value: 'Toliara',
      },
      {
        text: 'Antsiranana',
        value: 'Antsiranana',
      },
    ],
    onFilter: (value, record) => {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      const recordValue = record.nameprovince.toLowerCase();
      return recordValue.startsWith(filterValue);
    },
    filterSearch: true,
    width: '25%',
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Mission total</span>,
    dataIndex: 't_mission',
    sorter:(a,b) => a.t_mission - b.t_mission,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Mission en cours</span>,
    dataIndex: 'encours',
    sorter: (a, b) => a.encours - b.encours,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Mission achevée</span>,
    dataIndex: 'fini',
    sorter: (a, b) => a.fini - b.fini,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Progression</span>,
    key: 'progression',
    render:(_,record) => <Progress className='font-sans' type='line' percent={parseFloat(((record.fini * 100) / record.t_mission).toFixed(2))} />
  }
];


function Tableregionstat({ typemission, date }: { typemission: number, date: number }) {
  const navigate = useNavigate();
  const data_region = useStatbyregionbytypemission(typemission, date, navigate);
  const [pagination, setPagination] = useState({
    current: 1, // page actuelle
    pageSize: 7, // nombre d'éléments par page
  });
  const onChange: TableProps<Statregiontype>['onChange'] = (pagination:any) => {
    setPagination(pagination);
  };
  if (data_region.isPending) {
    return <>loading....</>
  }
  if (data_region.isError) {
    return<>Error...</>
  }
  const data_stat_region = TransFormStatRegion(data_region.data);
  return (
    <Table columns={columns} dataSource={data_stat_region} onChange={onChange} pagination={{
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: data_stat_region.length,
    }} />
  )
}

export default Tableregionstat;