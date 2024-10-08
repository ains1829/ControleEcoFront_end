import { Table, TableColumnsType, Tag, theme } from "antd";
import { usegetMissionnaire } from "../../../api/administration/Apiadmin";
import { Administration, TransformDataAdministration } from "../../../types/administration/Administration";
import ContentEquipe from "./ContentEquipe";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useState } from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
function AdministrationPage() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const data = usegetMissionnaire(page,search,navigate);
  if (data.isPending) {
    return <>loading...</>
  }
  if (data.isError) {
    return<>errorr...</>
  }
  const handleNext = () => {
    if (data.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (data.data.hasprevious) {
      setPage(page - 1)
    }
  }
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    if (value.trim().length === 0) {
      setSearch('')
      setPage(0)
    } else {
      setPage(0);
      setSearch(value)
    }
  };
  const columns: TableColumnsType<Administration> = [
    {
      title: <span className="font-sans">Nom</span>,
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Matricule</span>,
      dataIndex: 'matricule',
      key: 'matricule',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Email</span>,
      dataIndex: 'email',
      key: 'email',
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
      title: <span className="font-sans">Addresse</span>,
      dataIndex: 'addresse',
      key: 'addresse',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Ne(e) le</span>,
      dataIndex: 'date_naissance',
      key: 'date_naissance',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Status</span>,
      dataIndex: 'age',
      key:'age',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <> {text >= 60 ? <Tag color="red" className="font-sans">Retraite(e)</Tag> : <Tag color="green" className="font-sans">En activite</Tag>} </>
    }
  ]
  const data_missionnaire = TransformDataAdministration(data.data.data)
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (data.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (data.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop:10
        }}
        > 
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold" >Membres.</span>
            <Search placeholder="Recherche" allowClear onSearch={onSearch} className="w-1/4 font-sans" />
          </div>
          <Table columns={columns} dataSource={data_missionnaire} pagination={false} />
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
              <span className="text-xs text-gray-500 font-bold">Page {data.data.page + 1} de {data.data.nombrepage}</span>
            </div>
          </div>
        </div>
        <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        > 
          <ContentEquipe />
        </div>
      </div>
    </>
  )
}
export default AdministrationPage;
