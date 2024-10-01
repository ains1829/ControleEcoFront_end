import { Avatar, Button, message, Popconfirm, PopconfirmProps, Table, TableColumnsType, Tag, theme } from "antd";
import { Account, TransformDataAccount } from "../../../../types/administration/Account";
import { useState } from "react";
import { usegetAdministrationNoValidate} from "../../../../api/mission/Api";
import {
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useValidateAccount } from "../../../../api/auth/mutation/Mutation";
function Demande() {
  const [page, setPage] = useState(0);
  const Account_validate = usegetAdministrationNoValidate(page);
  const validate_account = useValidateAccount();
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    if (Account_validate.isPending) {
    return <>loading...</>
  }
  if (Account_validate.isError) {
    return <>error...</>
  }
  const data_account = TransformDataAccount(Account_validate.data.data);
  const confirms_account = async (id: number) => {
    const reponse = await validate_account.mutateAsync({id:id});
    if (reponse.status !== 200) {
      message.error(reponse.object)
    }
  };
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };
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
      render:()=> <Tag color={"yellow-inverse"} className="font-sans font-bold text-white">En attente</Tag>
    },
    {
      title: <span className="font-sans">Date demande</span>,
      dataIndex: 'date_demande',
      key: 'date_demande',
            onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render:(text)=> <span className='font-sans'>{text}</span>
    },
    {
      dataIndex: 'action',
      key: 'action',
            onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (_,record) =>
        <>
          <Popconfirm title={<span className="font-sans text-xs">Valider Le compte</span>} description={<span className="font-sans text-xs"> Êtes-vous sûr de vouloir valider le compte?</span>}
            onConfirm={()=>confirms_account(record.key)}
            onCancel={cancel}
            okText={<span className="font-sans text-xs">Oui</span>}
            cancelText={<span className="font-sans text-xs">Non</span>}
            icon={<CheckCircleOutlined style={{color:"green"}}  /> }
            >
            <Button className="font-sans text-xs" type="dashed" >Valider</Button>
          </Popconfirm>
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
        <div>
          <span className="font-bold text-xl">Demande.</span>
        </div>
        <Table columns={columns} dataSource={data_account} pagination={false} />
      </div>
    </>
  )
}
export default Demande;