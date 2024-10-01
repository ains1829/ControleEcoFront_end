import { Avatar, Button, Drawer, Empty, Space, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { Societedata } from '../../../types/societe/SocieteData';
import { useSocieteRef } from '../../../api/mission/Apiordremission';
const C_societe = ({data} : {data : Societedata[]}) => {
  const [open, setOpen] = useState(false);
  const [data_societe, setdatasociete] = useState<Societedata>();
  const [idsociete, setSociete] = useState(0);
  const data_ref = useSocieteRef(idsociete);
  const handleClick = async (data: Societedata) => {
    setdatasociete(data);
    setSociete(Number(data.key))
    setOpen(true);
  }
  const truncateText = (text: string) => {
    let maxlength = 50;
    return text.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
  };
  const columns: TableColumnsType<Societedata> = [
    {
      title: <span className='font-sans'>Logo</span>,
      dataIndex: 'logo',
      key: 'logo',
      onHeaderCell: () => ({
        style:{backgroundColor:'transparent'}
      }),
      render:(text)=><Avatar src={text} size="large" />
    },
    {
      title: <span className='font-sans'>Nom Société</span>,
      dataIndex: 'namesociete',
      key: 'namesociete',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>Description</span> ,
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{truncateText(text) }</span>
    },
    {
      title:  <span className='font-sans'>NIF</span>,
      dataIndex: 'nif',
      key: 'nif',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>STAT</span>,
      dataIndex: 'stat',
      key: 'stat',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>District</span>,
      dataIndex: 'district',
      key: 'district',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>Numéro Fiscal</span>,
      dataIndex: 'numerofiscal',
      key: 'numerofiscal',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      key: 'action',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (_, record) => (
        <Space size="middle">
          <Button className="text-xs font-sans p-4" onClick={()=>handleClick(record)} >Detail</Button>
        </Space>
      ),
    }
  ];
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Drawer
        title={
          <div className='flex items-center gap-2'>
            <Avatar src={data_societe?.logo} size={'large'}/>
            <span className='font-sans'>{data_societe?.namesociete}</span>
          </div>
        }
        placement="right"
        size={"large"}
        onClose={onClose}
        open={open}
      >
        <div className='flex flex-col gap-y-10'>
          <div className='font-sans flex flex-col gap-y-2'>
          <span className='text-xs font-bold font-sans'>Detail</span>
          <div className='font-sans grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-y-4'>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>Responsable</span>
                  <span className='text-xs font-bold'>{data_societe?.responsable }</span>
              </div>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>Telephone</span>
                  <span className='text-xs'>{ data_societe?.telephone}</span>
              </div>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>Addresse</span>
                  <span className='text-xs'>{ data_societe?.addresse}</span>
              </div>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>District</span>
                  <span className='text-xs'>{ data_societe?.district}</span>
              </div>
            </div>
            <div className='flex flex-col gap-y-4'>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>NIF</span>
                  <span className='text-xs'>{ data_societe?.nif}</span>
              </div>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>STAT</span>
                  <span className='text-xs'>{ data_societe?.stat}</span>
              </div>
              <div className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                <span>Numero Fiscal</span>
                  <span className='text-xs'>{ data_societe?.numerofiscal}</span>
              </div>
            </div>
          </div>
          </div>
          <div className='font-sans flex flex-col gap-y-2'>
            <span className='font-bold text-xs'>Description</span>
            <span>
              {data_societe?.description}
            </span>
          </div>
          <div className='font-sans flex flex-col gap-y-2'>
            <span className='font-bold text-xs'>Reference OM</span>
              <div className='flex flex-col gap-y-4'>
                {
                  data_ref.isPending ? <>loading....</> :
                      data_ref.isError ? <>erreurr...</> :
                        (
                          data_ref.data.length === 0 ? <Empty /> :
                            data_ref.data.map((item:any , index:number) => (
                              <div key={index} className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                                <span>Ref</span>
                                <span className='text-xs font-bold'>{ item.numeroserie}</span>
                              </div>
                          ))
                        )
                }
              </div>
            </div>
        </div>
      </Drawer>
    </>
  )
}

export default C_societe;
