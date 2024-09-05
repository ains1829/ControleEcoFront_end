import { Table, TableColumnsType, theme } from "antd";
import { usegetDirecteur } from "../../../../api/mission/Apipublic";
import { useState } from "react";
import { Administration, TransformDataAdministration } from "../../../../types/administration/Administration";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
function AdminRegional() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page , setPage] = useState(0)
  const Directeur = usegetDirecteur(page);
  if (Directeur.isPending) {
    return <>loading...</>
  }
  if (Directeur.isError) {
    return <>Erreur...</>
  }
  const directeur_data = TransformDataAdministration(Directeur.data.data);
  const columns: TableColumnsType<Administration> = [
    {
      title: <span className="font-sans">Nom</span>,
      dataIndex: 'name',
      key: 'name',
      width:'25%',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Matricule</span>,
      dataIndex: 'matricule',
      key:'matricule',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Email</span>,
      dataIndex: 'email',
      key:'email',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans text-blue-500'>{text}</span>
    },
    {
      title: <span className="font-sans">Telephone</span>,
      dataIndex: 'telephone',
      key: 'telephone',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Profil</span>,
      dataIndex: 'profil',
      key: 'profil',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Region</span>,
      dataIndex: 'region',
      key:'region',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Addresse</span>,
      dataIndex: 'addresse',
      key: 'addresse',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    }
  ]
  const handleNext = () => {
    if (Directeur.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (Directeur.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (Directeur.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (Directeur.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  return (
    <>
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="flex justify-between items-center">
            <span className="text-xl font-bold" >Regional.</span>
          </div>
        <Table columns={columns} dataSource={directeur_data} pagination={false} />
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
              <span className="text-xs text-gray-500 font-bold">Page {Directeur.data.page + 1} de {Directeur.data.nombrepage}</span>
            </div>
          </div>
      </div>
    </>
  )
}
export default AdminRegional;