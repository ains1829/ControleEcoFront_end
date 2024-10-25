import { Button, Divider, Modal, Table, TableColumnsType, theme } from "antd";
import { useRegionProvince } from "../../../../api/dashboard/PpnStat";
import { Statppn, TransFormPpnRegion } from "../../../../types/stat/Statppn";
import Tabledistrict from "./Tabledistrict";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "./components/Price";

export function formatValue(value: number): string {
  return value === 0 ? '_' : `${formatNumber(value)}`;
}
function Provinceregion({ province, product, mois, annee }: { province: number, product: number, mois: number, annee: number }) {
  const navigate = useNavigate();
  const ppnregion = useRegionProvince(province, product, mois, annee,navigate);
  const [region_click, setRegion] = useState(0);
  const [name_region , setNameregion] = useState('')
  const [open, setOpen] = useState(false)
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (ppnregion.isPending) {
    return <>loading...</>
  }
  if (ppnregion.isError) {
    return <>error...</>
  }
  const data = TransFormPpnRegion(ppnregion.data);
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
      <Divider/>
      <Table  columns={columns} dataSource={data} pagination={false} />
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
export default Provinceregion;