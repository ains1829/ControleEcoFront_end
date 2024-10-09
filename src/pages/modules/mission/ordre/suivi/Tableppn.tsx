import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useDetailCollecte } from '../../../../../api/mission/Apiordremission';
import { useNavigate } from 'react-router-dom';

interface PpnType {
  key: React.Key;
  product: string;
  price: number;
  obsevation: string;
  unite: string;
}
const TransformdataDetailCollecte = (data: any[]): PpnType[] => {
  return data.map(item => ({
    key: item.iddetailcollecte,
    product: item.product.nameproduct,
    price: item.prix,
    obsevation: item.observation,
    unite:item.product.typeproduct.unite.nameunite
  }))
}

const columns: TableColumnsType<PpnType> = [
  {
    title: <span className='font-sans'>Produit (PPN)</span> ,
    dataIndex: 'product',
    onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    render: (text) => <span className='font-sans'>{text }</span>
  },
  {
    title:<span className='font-sans'>Prix</span> ,
    dataIndex: 'price',
    onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    render: (text, record) => <span className='font-sans'>{text} Ar / {record.unite}</span>
  },
  {
    title: <span className='font-sans'>Lieu d'observation</span>,
    dataIndex: 'obsevation',
    onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    render: (text) => <span className='font-sans'>{text }</span>
  }
];
function Tableppn({ idcollecte }: { idcollecte: number }) {
  const navigate = useNavigate();
  const collecte = useDetailCollecte(idcollecte,navigate);
  if (collecte.isPending) {
    return <>loading...</>
  }
  if (collecte.isError) {
    return <>error...</>
  }
  return (
    <>
      <Table columns={columns} dataSource={TransformdataDetailCollecte(collecte.data)} pagination={false} />
    </>
  )
}

export default Tableppn;
