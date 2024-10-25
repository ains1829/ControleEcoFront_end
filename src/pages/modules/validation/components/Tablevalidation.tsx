import { Button, Modal, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import Detailvalidation from './Detailvalidation';
import { usegetCollecteNovalidate } from '../../../../api/mission/Api';
import { useNavigate } from 'react-router-dom';
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { formatOrderDate } from '../../mission/ordre/Mission';
export interface CollecteData {
  key: number;
  numero_reference: string;
  region: string;
  district: string;
  date_collecte: string; // Format de date en chaîne
  status: number;
}
const TransformdataCollecte = (data: any[]): CollecteData[] => {
  return data.map(item => ({
    key: item.idcollecte,
    numero_reference: item.ordermission.numeroserie,
    region: item.ordermission.region.nameregion,
    district:item.ordermission.nomdistrict,
    date_collecte: item.datecollecte,
    status:item.statu
  }))
}

function TableValidation() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [open, SetOpen] = useState(false);
  const [collecte_data, setDataCollecte] = useState<CollecteData>();
  const liste_collecte = usegetCollecteNovalidate(page, navigate);
  if (liste_collecte.isPending) {
    return <>loading...</>
  }
  if (liste_collecte.isError) {
    return <>Error...</>
  }
  const liste_collecte_order = TransformdataCollecte(liste_collecte.data.data);
  const HandleSetData = async (data:CollecteData) => {
    setDataCollecte(data);
    SetOpen(true);
  }
  const hadleClose = () => {
    SetOpen(false);
  }
  const handleNext = () => {
    if (liste_collecte.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (liste_collecte.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (liste_collecte.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (liste_collecte.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  const columns: TableColumnsType<CollecteData> = [
    {
      title: <span className='font-sans'>Numéro de Référence</span>,
      dataIndex: 'numero_reference',
      key: 'numero_reference',
      render: (text) => <span className='font-sans'>{text}</span>,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    },
    {
      title: <span className='font-sans'>Région</span>,
      dataIndex: 'region',
      key: 'region',
      render: (text) => <span className='font-sans'>{text}</span>,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    },
    {
      title: <span className='font-sans'>District</span>,
      dataIndex: 'district',
      key: 'district',
      render: (text) => <span className='font-sans'>{text}</span>,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    },
    {
      title: <span className='font-sans'>Date de Collecte</span>,
      dataIndex: 'date_collecte',
      key: 'date_collecte',
      render: (text) => <span className='font-sans'>{formatOrderDate(text)}</span>,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    },
    {
      title: <span className='font-sans'>Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        let color;
        switch (status) {
          case 210:
            color = 'green';
            return <Tag className='font-sans' color={color}>Valider</Tag>
            break;
          case 200:
            color = 'orange';
            return <Tag className='font-sans' color={color}>En attente</Tag>
            break;
          case 515:
            color = 'red';
            return <Tag className='font-sans' color={color}>Rejeté</Tag>
            break;
          default:
            color = 'blue';
            return <Tag className='font-sans' color={color}>{status}</Tag>;
        }
      },
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    },
    {
      render: (_, record) =>
        <>
          <Button type='dashed' className='font-sans text-xs' onClick={()=>HandleSetData(record)}>Detail</Button>
        </>,
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={liste_collecte_order} pagination={false} />
      <Modal centered width={1000} open={open} onCancel={hadleClose} footer>
        <Detailvalidation data={collecte_data!} page={page} Close_modal={hadleClose}/>
      </Modal>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className={`${ClassNamePrevious} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handlePrevious}>
            <LeftOutlined />
            <span>
              Previous
            </span>
          </div>
          <div className={`${classNameNext} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handleNext}>
            <span>
              Next
            </span>
            <RightOutlined/>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-bold">Page {liste_collecte.data.page + 1} de {liste_collecte.data.nombrepage}</span>
        </div>
      </div>
    </>
  );
}

export default TableValidation;
