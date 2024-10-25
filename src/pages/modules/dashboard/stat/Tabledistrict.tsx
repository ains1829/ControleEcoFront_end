import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';
import { useDistrictByregion } from '../../../../api/dashboard/PpnStat';
import { useNavigate } from 'react-router-dom';
import { formatValue } from './Provinceregion';
interface DataType {
  key: number;
  district: string;
  prixMoyenne: number;
  prixMax: number;
  prixMin: number;
}
const TransFormPpnDistrict = (data: any[]): DataType[] => {
  return data.map(item => ({
    district: item.namedistrict,
    key: item.iddistrict,
    prixMoyenne: item.p_moyenne,
    prixMax: item.p_max,
    prixMin:item.p_min
  }))
}

function Tabledistrict({ idregion, idproduct, mois, annee }: { idregion: number, idproduct: number, mois: number, annee: number }) {
  const navigate = useNavigate();
  const data_district = useDistrictByregion(idregion, idproduct, mois, annee,navigate);
  if (data_district.isPending) {
    return <>loading...</>
  } 
  if (data_district.isError) {
    return <>error...</>
  }
  const data = TransFormPpnDistrict(data_district.data);
  const handleChange:TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: <span className='font-sans'>District</span>,
      dataIndex: 'district',
      key: 'district',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) =>
      <span className='font-sans'>{text}</span>
        
    },
    {
      title: <span className='font-sans'>Prix moyenne</span>,
      dataIndex: 'prixMoyenne',
      key: 'prixMoyenne',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.prixMoyenne - b.prixMoyenne,
      render: (prix) => <span className='font-sans'>{formatValue(prix)}</span>
    },
    {
      title: <span className='font-sans'>Prix max</span> ,
      dataIndex: 'prixMax',
      key: 'prixMax',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.prixMax - b.prixMax,
      render: (prix) => <span className='font-sans'>{formatValue(prix)}</span>
    },
    {
      title: <span className='font-sans'>Prix min</span>,
      dataIndex: 'prixMin',
      key: 'prixMin',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.prixMin - b.prixMin,
      render: (prix) => <span className='font-sans'>{formatValue(prix)}</span>
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} pagination={false} />
    </>
  );
};

export default Tabledistrict;
