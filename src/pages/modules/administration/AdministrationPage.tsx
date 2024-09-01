import { Breadcrumb, Table, TableColumnsType, theme } from "antd";
import { usegetMissionnaire } from "../../../api/administration/Apiadmin";
import { Administration, TransformDataAdministration } from "../../../types/administration/Administration";
import ContentEquipe from "./ContentEquipe";

function AdministrationPage() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const data = usegetMissionnaire();
  if (data.isPending) {
    return <>loading...</>
  }
  if (data.isError) {
    return<>errorr...</>
  }
  const columns: TableColumnsType<Administration> = [
    {
      title: <span className="font-sans">Nom</span>,
      dataIndex: 'name',
      key: 'name',
      width:'35%',
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
      render: (text) => <span className='font-sans'>{text}</span>
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
  console.log(data.data)
  const data_missionnaire = TransformDataAdministration(data.data.data)
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Liste' }, { title: 'Membre' }]} />
      <div className="flex flex-col gap-y-3">
        <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        > 
          <span className="text-xl font-bold" >Membres.</span>
          <Table columns={columns} dataSource={data_missionnaire} pagination={false} />
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