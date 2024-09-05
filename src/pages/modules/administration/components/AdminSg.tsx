import { Table, TableColumnsType, theme } from "antd";
import { usegetAdministrator } from "../../../../api/mission/Apipublic";
import { Administration, TransformDataAdministration } from "../../../../types/administration/Administration";

function AdminSg() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const administrator = usegetAdministrator();
  if (administrator.isPending) {
    return <>loading...</>
  }
  if (administrator.isError) {
    return <>error...</>
  }

  const data_admin = TransformDataAdministration(administrator.data)
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
      title: <span className="font-sans">Addresse</span>,
      dataIndex: 'addresse',
      key: 'addresse',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    }
  ]
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
            <span className="text-xl font-bold" >Administrateur.</span>
          </div>
          <Table columns={columns} dataSource={data_admin} pagination={false} />
        </div>
      </>
    )
}
export default AdminSg