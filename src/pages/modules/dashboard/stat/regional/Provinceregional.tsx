import { Button, Divider, Modal, Table, TableColumnsType, TableProps, theme } from "antd";
import {useRegionProvincebydirecteur } from "../../../../../api/dashboard/PpnStat";
import { Statppn, TransFormPpnRegion } from "../../../../../types/stat/Statppn";
import Tabledistrict from "../Tabledistrict";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatValue } from "../Provinceregion";

function Provinceregional({ product, mois, annee }: { product: number, mois: number, annee: number }) {
  const navigate = useNavigate();
  const ppnregion = useRegionProvincebydirecteur(product, mois, annee,navigate);
  const [open, setOpen] = useState(false);
  const [region_click, setRegion] = useState(0);
  const [name_region , setNameregion] = useState('')
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (ppnregion.isPending) {
    return <>loading...</>
  }
  if (ppnregion.isError) {
    return <>error...</>
  }
  const data = TransFormPpnRegion(ppnregion.data)
  const handleClick = (data: Statppn) => {
    setOpen(true)
    setRegion(data.key);
    setNameregion(data.nameregion)
  }
  const columns: TableColumnsType<Statppn> = [
    {
      title: <span className="font-sans">Region</span>,
      dataIndex: 'nameregion',
      key: 'nameregion',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className="font-sans">{text}</span>
    },
    {
      title: <span className="font-sans">Prix moyenne</span>,
      dataIndex: 'p_moyenne',
      key: 'p_moyenne',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.p_moyenne - b.p_moyenne,
      render: (prix) => <span className="font-sans">{formatValue(prix)}</span>
    },
    {
      title: <span className="font-sans">Prix max</span>,
      dataIndex: 'p_max',
      key: 'p_max',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent'},
      }),
      sorter: (a, b) => a.p_max - b.p_max,
      render: (prix) => <span className="font-sans">{formatValue(prix)}</span>
    },
    {
      title: <span className="font-sans">Prix min</span>,
      dataIndex: 'p_min',
      key: 'p_min',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.p_min - b.p_min,
      render: (prix) => <span className="font-sans">{formatValue(prix)}</span>
    },
    {
      dataIndex: 'action',
      key: 'action',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (_,record) => <Button type="dashed" className="font-sans text-xs font-bold text-secondary" onClick={()=>handleClick(record)}>Detail par district</Button>
    }
  ];
  const onChange: TableProps<Statppn>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div
        className="flex flex-col  font-sans"
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
    > 
      <div className="flex justify-between items-center">
        <span className="text-bold text-sm font-bold ">Detail par region</span>
      </div>
      <Divider />
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
      <Modal
        title={<span className="font-sans">{name_region}</span>}
        centered
        width={1000}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={() => (
          <></>
        )}
        >
        <Tabledistrict idregion={region_click}  idproduct={product} mois={mois} annee={annee}/>
      </Modal>
    </div>
    
  )
}
export default Provinceregional;