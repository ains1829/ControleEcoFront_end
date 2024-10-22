import { Avatar, Button, Divider, Drawer, Empty, Image, Modal, Space, Table, TableColumnsType, Tag} from 'antd';
import { useState } from 'react';
import { Societedata } from '../../../types/societe/SocieteData';
import { useSocieteRef } from '../../../api/mission/Apiordremission';
import { useNavigate } from 'react-router-dom';
import { UserInstance } from '../../../types/administration/Userconnected';
import {EditOutlined} from '@ant-design/icons';
import FormSociete from './components/FormSociete';
const C_societe = ({ data , page, region, search, isfilter, datebegin, date_end }: { data: Societedata[] , page:number, region: number,  search: string, isfilter: boolean, datebegin: string, date_end: string  }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open_modal, setOpen_modal] = useState(false);
  const [data_societe, setdatasociete] = useState<Societedata>();
  const [idsociete, setSociete] = useState(0);
  const data_ref = useSocieteRef(idsociete, navigate);
  const [societe_modify, setSocieteModify] = useState<Societedata | null>(null); 
  const role = UserInstance().getRole
  const handleClick = async (data: Societedata) => {
    setdatasociete(data);
    setSociete(Number(data.key))
    setOpen(true);
    
  }
  const UpModal = async (data: Societedata) => {
    setSocieteModify(data);
    setOpen_modal(true);
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
      render:(text)=><Avatar src={text} size="large" shape="square" />
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
      width: '30%',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{truncateText(text) }</span>
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
          {
            role === "DSI" && <Button icon={<EditOutlined />} className='text-xs font-sans p-4' type='dashed' onClick={()=>UpModal(record)}>Modifier</Button>
          }
          <Button type="dashed" className="text-xs font-sans p-4" onClick={()=>handleClick(record)} >Detail</Button>
        </Space>
      ),
    }
  ];
  const onClose = () => {
    setOpen(false);
  };
  const CloseModal = () => {
    setOpen_modal(false);
  }
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width={520}
      >
        <div className='flex flex-col'>
          <div>
            <div className='flex flex-col gap-y-2'>
              <Image src={data_societe?.logo} alt='...' width={100} height={100}/>
              <span className='font-sans font-bold'>{data_societe?.namesociete}</span>
            </div>
          </div>  
          <Divider />
          <div className='font-sans flex flex-col gap-y-2'>
            <span className='font-bold font-sans'>Detail Societe</span>
            <div className='font-sans gap-4 mt-3 di'>
              <div className='flex flex-col gap-y-5'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>Responsable</span>
                  <span className=' font-bold'>{data_societe?.responsable }</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>Telephone</span>
                  <span className=''>{ data_societe?.telephone}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>Addresse</span>
                  <span className=''>{ data_societe?.addresse}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>District</span>
                  <span className=''>{ data_societe?.district}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>NIF</span>
                  <span className=''>{ data_societe?.nif}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>STAT</span>
                  <span className=''>{ data_societe?.stat}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>Numero Fiscal</span>
                  <span className=''>{ data_societe?.numerofiscal}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-bold'>Status</span>
                  <Tag className='font-sans' color='green'>Active</Tag>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className='font-sans flex flex-col gap-y-2'>
            <span className='font-bold text-sm'>Description</span>
            <span>
              {data_societe?.description}
            </span>
          </div>
          <Divider />
          <div className='font-sans flex flex-col gap-y-2'>
            <span className='font-bold'>Reference OM</span>
              <div className='flex flex-col gap-y-4'>
                {
                  data_ref.isPending ? <>loading....</> :
                      data_ref.isError ? <>erreurr...</> :
                        (
                          data_ref.data.length === 0 ? <Empty /> :
                            data_ref.data.map((item:any , index:number) => (
                              <div key={index} className='p-2 flex justify-between items-center border-dotted border-b-2 border-gray-200'>
                                <span>Ref</span>
                                <div className='flex gap-2 text-xs'>
                                  <span className=' font-bold'>{item.numeroserie}</span>
                                  (date d'ordre :  {item.date_om}) </div>
                              </div>
                          ))
                        )
                }
              </div>
            </div>
        </div>
      </Drawer>
      <Modal
        key={societe_modify?.key!}
        centered
        open={open_modal}
        onCancel={() => setOpen_modal(false)}
        width={1000}
        footer={(_, {   }) => ( <> </> )}
      >
        <FormSociete page={page} societe_modify={societe_modify!} CloseModal={CloseModal} regions={region} search={search} isfilter={isfilter} datebegin={datebegin} date_end={date_end}  />
      </Modal>
    </>
  )
}

export default C_societe;
