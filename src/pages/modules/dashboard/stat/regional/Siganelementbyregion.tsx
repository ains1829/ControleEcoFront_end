import { Button, Table, TableColumnsType } from 'antd';
import { useStatsignalementbyregion } from '../../../../../api/dashboard/SignalementStat';
import { Link } from 'react-router-dom';
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
  const signalement_byregion = useStatsignalementbyregion(date);
  if (signalement_byregion.isPending) {
    return <>loading...</>
  }
  if (signalement_byregion.isError) {
    return <>error...</>
  }

const columns: TableColumnsType<RegionData> = [
    {
      title: <span className='font-sans'>Nom de la Région</span>,
      dataIndex: 'regionName',
      key: 'regionName',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>Total Signalements</span>,
      dataIndex: 'totalReports',
      key: 'totalReports',
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
          columns={columns} 
          pagination={false}
        />
    );
};

export default Signalementbyregion;
