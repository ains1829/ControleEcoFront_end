import { Avatar, Button,Modal,Table, TableColumnsType, Tag, theme } from "antd";
import { usegetAdministrator } from "../../../../api/mission/Apipublic";
import { Administration, TransformDataAdministration } from "../../../../types/administration/Administration";
import {
  EditOutlined,DeleteOutlined
} from '@ant-design/icons';
import { useState } from "react";
import FormModifiedAdmin from "./FormModifiedAdmin";
function AdminSg() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const administrator = usegetAdministrator();
  const [data_detail, setDetail] = useState<Administration>();
  const [open, setOpen] = useState(false);
  if (administrator.isPending) {
    return <>loading...</>
  }
  if (administrator.isError) {
    return <>error...</>
  }
  const data_admin = TransformDataAdministration(administrator.data);
  const handleClick = (data: Administration) => {
    setOpen(true);
    setDetail(data);
  }
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
            <Button icon={<EditOutlined />} type="dashed" className="font-sans text-xs" onClick={()=>handleClick(record)}>Modifier</Button>
            <Button icon={<DeleteOutlined />} type="dashed" className="font-sans text-xs" danger>Retirer</Button>
          </div>
        </>
    }
  ]
  return (
      <>
        <div
          className="flex flex-col gap-y-2 font-sans"
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        > 
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold" >Administrateur.</span>
          </div>
          <Table columns={columns} dataSource={data_admin} pagination={false} />
        </div>
        <Modal key={data_detail?.key!} centered width={1000} className="font-sans" onOk={handleOk} onCancel={handleCancel} open={open}
          footer={(_  , {})=>(
            <></>
          )}>
            <FormModifiedAdmin search="" idregion={0} page={0} isregional={false} data_detail={data_detail!} closed_modal={handleCancel} />
        </Modal>
      </>
    )
}
export default AdminSg