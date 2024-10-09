import { Avatar, Button, Modal, Select, Table, TableColumnsType, Tag, theme } from "antd";
import { usegetDirecteur } from "../../../../api/mission/Apipublic";
import { useState } from "react";
import { Administration, TransformDataAdministration } from "../../../../types/administration/Administration";
import {
  LeftOutlined,
  RightOutlined,EditOutlined,DeleteOutlined
} from '@ant-design/icons';
import { usegetRegions } from "../../../../api/mission/Api";
import Search, { SearchProps } from "antd/es/input/Search";
import FormModifiedAdmin from "./FormModifiedAdmin";
function AdminRegional() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [regionChoice, setRegion] = useState(1);
  const [region_view, setRegionview] = useState('Analamanga');
  const [data_detail, setDetail] = useState<Administration>();
  const Directeur = usegetDirecteur(search,regionChoice, page);
  const region = usegetRegions();
  if (Directeur.isPending) {
    return <>loading...</>
  }
  if (Directeur.isError) {
    return <>Erreur...</>
  }
  const directeur_data = TransformDataAdministration(Directeur.data.data);
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleClick = (data: Administration) => {
    setOpen(true);
    setDetail(data);
  }
  const options_region: any[] = [];
  if (region.isSuccess) {
    region.data.forEach((item : any) => (
      options_region.push({value:item.idregion , label : <span className="font-sans">{item.nameregion}</span>})
    ))
  }
  const handleChange = (value: number, option: any) => {
    setPage(0)
    setSearch('')
    setRegion(value)
    setRegionview(option.label)
  };
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    if (value.trim().length === 0) {
      setSearch('')
    }
    else {
      setPage(0)
      setSearch(value)
    }
  };
  const columns: TableColumnsType<Administration> = [
    {
      title: <span className="font-sans">Photo</span>,
      dataIndex: 'photo',
      key: 'photo',
      onHeaderCell: () => ({
        style:{background:'transparent'}
      }),
      render:(text) => <Avatar src={text} />
    },
    {
      title: <span className="font-sans">Nom</span>,
      dataIndex: 'name',
      key: 'name',
      width:'15%',
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
      title: <span className="font-sans">Ne(e) le</span>,
      dataIndex: 'date_naissance',
      key: 'date_naissance',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      key: 'action',
      render: (_, record) => 
        <>
          <div className="flex gap-2">
            <Button icon={<EditOutlined />} type="dashed" className="font-sans text-xs" onClick={() => handleClick(record)} >Modifier</Button>
            <Button icon={<DeleteOutlined />} type="dashed" className="font-sans text-xs" danger>Retirer</Button>
          </div>
        </>
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
            <div className="flex flex-col">           
              <span className="text-xl font-bold" >Regional.</span>
              <span className="text-xs">({region_view})</span>
            </div>
            <div className="flex w-1/2 gap-2">
                <div className="flex items-center gap-2">
                  <span>Region:</span>
                  <Select className="w-full font-sans" options={options_region} style={{width:'200px'}} placeholder="select region" onChange={handleChange} />
                </div>
                <div className="w-full">
                  <Search placeholder="Recherche" allowClear onSearch={onSearch} className="font-sans" />
                </div>
            </div>
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
      <Modal key={data_detail?.key!} centered width={1000} className="font-sans" onOk={handleOk} onCancel={handleCancel} open={open}
        footer={(_  , {})=>(
          <></>
        )}>
          <FormModifiedAdmin  search={search} idregion={regionChoice} page={page} isregional={true}  data_detail={data_detail!} closed_modal={handleCancel} />
      </Modal>
    </>
  )
}
export default AdminRegional;