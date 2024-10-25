import {Table, TableColumnsType, TableProps } from 'antd';
import { useStatsignalementbyregion } from '../../../../../api/dashboard/SignalementStat';
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
interface RegionData {
  key: string;
  regionName: string;
  totalReports: number;
}
const TransFormRegionData = (data: any[]): RegionData[] => {
  return data.map(item => ({
    key: item.idregion, 
    regionName: item.nameregion,
    totalReports: item.nb_signal
  }))
}

function Signalementbyregion({ date }: { date: number }) {
  const navigate = useNavigate();
  const signalement_byregion = useStatsignalementbyregion(date, navigate);
  const [pagination, setPagination] = useState({
    current: 1, // page actuelle
    pageSize: 10, // nombre d'éléments par page
  });
  if (signalement_byregion.isPending) {
    return <>loading...</>
  }
  if (signalement_byregion.isError) {
    return <>error...</>
  }
  const onChange: TableProps<RegionData>['onChange'] = (pagination:any) => {
    setPagination(pagination);
  };
  const columns: TableColumnsType<RegionData> = [
    {
      title: <span className='font-sans'>Region</span>,
      dataIndex: 'regionName',
      key: 'regionName',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>Nombre de signalements</span>,
      dataIndex: 'totalReports',
      key: 'totalReports',
      sorter:(a,b) => a.totalReports - b.totalReports,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
  ];
  const data = TransFormRegionData(signalement_byregion.data);
    return (
        <Table 
          dataSource={data} 
          onChange={onChange}
          columns={columns} pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          }} 
        />
    );
};

export default Signalementbyregion;
