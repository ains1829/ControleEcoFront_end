import { Avatar, Table, TableColumnsType, Tag, theme } from "antd";
import { useState } from "react";
import { usegetAdministrationValidate } from "../../../../api/mission/Api";
import { Account, TransformDataAccount } from "../../../../types/administration/Account";
import { useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { formatOrderDate } from "../../mission/ordre/Mission";
function Accountvalidate() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const Account_validate = usegetAdministrationValidate(page , navigate);
  if (Account_validate.isPending) {
    return <>loading...</>
  }
  if (Account_validate.isError) {
    return <>error...</>
  }
  const handleNext = () => {
    if (Account_validate.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (Account_validate.data.hasprevious) {
      setPage(page - 1)
    }
  }
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
      title: <span className="font-sans">Date de validation</span>,
      dataIndex: 'date_validate',
      key: 'date_validate',
            onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render:(text)=> <span className='font-sans'>{formatOrderDate(text)}</span>
    }
  ]
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (Account_validate.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (Account_validate.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
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
          <span className="text-xl font-bold">Liste des comptes validés .</span>
        </div>
        <Table columns={columns} dataSource={data_account} pagination={false} />
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
              <span className="text-xs text-gray-500 font-bold">Page {Account_validate.data.page + 1} de {Account_validate.data.nombrepage}</span>
            </div>
          </div>
      </div>
    </>
  )
}
export default Accountvalidate;