import { Table, TableColumnsType, TableProps, theme } from "antd";
import {useRegionProvincebydirecteur } from "../../../../../api/dashboard/PpnStat";
import { Statppn, TransFormPpnRegion } from "../../../../../types/stat/Statppn";

function Provinceregional({product,mois , annee} : {product:number , mois:number, annee:number}) {
  const ppnregion = useRegionProvincebydirecteur(product, mois, annee);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (ppnregion.isPending) {
    return <>loading...</>
  }
  if (ppnregion.isError) {
    return <>error...</>
  }
  const data =  TransFormPpnRegion(ppnregion.data)
  const columns: TableColumnsType<Statppn> = [
    {
      title: <span className="font-sans">Region Name</span>,
      dataIndex: 'nameregion',
      key: 'nameregion',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className="font-sans">{text}</span>
    },
    {
      title: <span className="font-sans">Prix Moyenne</span>,
      dataIndex: 'p_moyenne',
      key: 'p_moyenne',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.p_moyenne - b.p_moyenne,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
    {
      title: <span className="font-sans">Prix Max</span>,
      dataIndex: 'p_max',
      key: 'p_max',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent'},
      }),
      sorter: (a, b) => a.p_max - b.p_max,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
    {
      title: <span className="font-sans">Prix Min</span>,
      dataIndex: 'p_min',
      key: 'p_min',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      sorter: (a, b) => a.p_min - b.p_min,
      render: (text) => <span className="font-sans">{text} Ariary</span>
    },
  ];
  const onChange: TableProps<Statppn>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div
        className="flex flex-col  font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
    > 
      <div className="flex justify-between mb-5 items-center">
        <span className="text-bold text-sm font-bold ">Detail par region</span>
      </div>
      <Table  columns={columns} dataSource={data} onChange={onChange} pagination={false} />
    </div>
    
  )
}
export default Provinceregional;