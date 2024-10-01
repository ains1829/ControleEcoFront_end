import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useEnqueteregionglobal } from '../../../api/dashboard/Statistique';
import { Statregion, TransFormDataStat } from '../../../types/stat/Statregion';

const columns: TableColumnsType<Statregion> = [
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
];

const onChange: TableProps<Statregion>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function Tableregion({date} : {date : number}) {
  const data_region = useEnqueteregionglobal(date);
  if (data_region.isPending) {
    return <>loading....</>
  }
  if (data_region.isError) {
    return<>Error...</>
  }
  const data_stat_region = TransFormDataStat(data_region.data);
  return (
    <Table columns={columns} dataSource={data_stat_region} onChange={onChange} pagination={false} />
  )
}

export default Tableregion;