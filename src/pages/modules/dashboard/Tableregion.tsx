import { Progress, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useEnqueteregionglobal } from '../../../api/dashboard/Statistique';
import { Statregion, TransFormDataStat } from '../../../types/stat/Statregion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const columns: TableColumnsType<Statregion> = [
  {
    title: <span className='font-sans'>Region</span>,
    dataIndex: 'nameregion',
    key:'nameregion',
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
    width: '15%',
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Enquete total</span>,
    dataIndex: 't_enquete',
    sorter:(a,b) => a.t_enquete - b.t_enquete ,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Enquete en cours</span>,
    dataIndex: 'encours',
    sorter: (a, b) => a.encours - b.encours,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Enquete achevée</span>,
    dataIndex: 'fini',
    sorter: (a, b) => a.fini - b.fini,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>En regle</span>,
    dataIndex: 'clean',
    sorter: (a, b) => a.clean - b.clean,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Infraction</span>,
    dataIndex: 'infraction',
    sorter: (a, b) => a.infraction - b.infraction,
    render: (text) =>
      <span className='font-sans'>{text}</span>
  },
  {
    title: <span className='font-sans'>Progression</span>,
    key:'progression',
    render:(_,record) =><Progress type='line'  percent={parseFloat(((record.fini * 100) / record.t_enquete).toFixed(2))} className='font-sans'/>
  },
];


function Tableregion({ date }: { date: number }) {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1, // page actuelle
    pageSize: 10, // nombre d'éléments par page
  });
  const data_region = useEnqueteregionglobal(date,navigate);
  const onChange: TableProps<Statregion>['onChange'] = (pagination:any) => {
    setPagination(pagination);
  };
  if (data_region.isPending) {
    return <>loading....</>
  }
  if (data_region.isError) {
    return<>Error...</>
  }
  const data_stat_region = TransFormDataStat(data_region.data);
  return (
    <Table columns={columns} dataSource={data_stat_region} onChange={onChange} pagination={{
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: data_stat_region.length,
    }}
  />
  )
}

export default Tableregion;