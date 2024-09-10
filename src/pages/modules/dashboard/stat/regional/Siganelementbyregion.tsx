import React from 'react';
import { Table, TableColumnsType } from 'antd';

// Définir le type des données
interface RegionData {
    key: string;
    regionName: string;
    totalReports: number;
    expiredProducts: number;
    other: number;
}

// Données d'exemple
const data: RegionData[] = [
    {
        key: '1',
        regionName: 'Région A',
        totalReports: 15,
        expiredProducts: 10,
        other: 5,
    },
    {
        key: '2',
        regionName: 'Région B',
        totalReports: 20,
        expiredProducts: 12,
        other: 8,
    },
    {
        key: '3',
        regionName: 'Région C',
        totalReports: 18,
        expiredProducts: 7,
        other: 11,
    },
    {
        key: '4',
        regionName: 'Région D',
        totalReports: 25,
        expiredProducts: 15,
        other: 10,
    },
];

// Colonnes de la table
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
    {
        title: <span className='font-sans'>Produit Périmé</span>,
        dataIndex: 'expiredProducts',
        key: 'expiredProducts',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    render: (text) => <span className='font-sans'>{text }</span>
    },
    {
        title: <span className='font-sans'>Autre</span>,
        dataIndex: 'other',
        key: 'other',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
    render: (text) => <span className='font-sans'>{text }</span>
    },
];

const Signalementbyregion: React.FC = () => {
    return (
        <Table 
            dataSource={data} 
            columns={columns} 
            pagination={false}
        />
    );
};

export default Signalementbyregion;
