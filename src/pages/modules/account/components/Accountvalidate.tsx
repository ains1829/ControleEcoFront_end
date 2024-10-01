import { Avatar, Table, TableColumnsType, Tag, theme } from "antd";
import { useState } from "react";
import { usegetAdministrationValidate } from "../../../../api/mission/Api";
import { Account, TransformDataAccount } from "../../../../types/administration/Account";
function Accountvalidate() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page, setPage] = useState(0);
  const Account_validate = usegetAdministrationValidate(page);
  if (Account_validate.isPending) {
    return <>loading...</>
  }
  if (Account_validate.isError) {
    return <>error...</>
  }
  console.log(Account_validate.data)
  const data_account = TransformDataAccount(Account_validate.data.data);
  const columns: TableColumnsType<Account> = [
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
      title: <span className="font-sans">Profil</span>,
      dataIndex: 'profil',
      key: 'profil',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text}</span>
    },
    {
      title: <span className="font-sans">Status</span>,
      dataIndex: 'tag',
      key: 'tag',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render:()=> <Tag color={"green"} className="font-sans">Valider</Tag>
    },
    {
      title: <span className="font-sans">Date validation</span>,
      dataIndex: 'date_validate',
      key: 'date_validate',
            onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render:(text)=> <span className='font-sans'>{text}</span>
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
        <div>
          <span className="text-xl font-bold">Validate.</span>
        </div>
        <Table columns={columns} dataSource={data_account} pagination={false} />
      </div>
    </>
  )
}
export default Accountvalidate;