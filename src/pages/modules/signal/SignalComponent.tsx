import { WarningOutlined } from '@ant-design/icons';
import { Divider, Empty, Modal } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useState } from 'react';
import { Image } from 'antd'
dayjs.locale('fr')
function SignalComponent({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const truncateText = (text: string) => {
    let maxlength = 170;
    return text.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
  };
  return (
    <>
      <div className="flex cursor-pointer font-sans" onClick={()=>setOpen(true)}>
        <div className="w-full flex gap-x-5">
          <div className='w-full flex items-center'>
            <div className="w-5/6 flex flex-col gap-y-1">
              <span className='text-red-500 font-bold'>Societe :  {data.namesociete} ({data.addressesociete})</span>
              <span className='text-xs'>Motifs : {truncateText(data.description)}  </span>
              <span className="text-xs">({data.photo.length} photos)</span>
            </div>
            <div className="w-1/6">
              <span className="text-xs font-bold">{ dayjs(data.datesignal).format('DD MMMM YYYY') }</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="font-sans flex flex-col gap-2 p-4">
            <span className='text-xl'>Detail Signalment.</span> 
          </div>
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={(_, {}) => (
          <>
          </>
        )}
      >
        <div className='flex flex-col gap-y-3 font-sans divide-y'>
          <div className='grid grid-cols-2 items-center p-4'>
            <div>
              <span className='font-bold'>Information du victime</span>
            </div>
              <div className='flex flex-col gap-y-3'>
               <div className='flex gap-x-2 items-center'>
                  <span>Date d'envoye : </span>
                  <span>{ dayjs(data.datesignal).format('DD MMMM YYYY') }</span>
                </div>
              <div className='flex gap-x-2 items-center'>
                <span>Email : </span>
                {
                  data.email_sending === '' ? <span>Aucune adresse e-mail n'a été ajoutée.</span> : 
                    <span className='text-blue-500'>{data.email_sending }</span>
                }
              </div>
              <div className='flex gap-x-2 items-center'>
                <span>Contact : </span>
                <span className='text-blue-500'>{data.numberphone}</span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center gap-2 p-4'>
            <div className='flex flex-col gap-y-1'>
              <span className='font-bold'>Detail signalement</span>
              <span className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolores aliquam nam rep</span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <div className='flex gap-x-2 items-center'>
                <span>Anomaly : </span>
                <span className='font-bold text-red-600'>{data.nameanomaly}</span>
              </div>
              <div className='flex gap-x-2 items-center'>
                <span>Societe : </span>
                <span className='font-bold'>{data.namesociete}</span>
              </div>
              {data.societe === null && <span className='text-xs text-gray-500'>(Societe n'est pas encore presente dans notre base de donnee)</span>} 
              <div className='flex gap-x-2 items-center'>
                <span>Addresse societe : </span>
                <span>{data.addressesociete }</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col p-4'>
            <span className='font-bold'>Description </span>
            <span>{data.description}</span>
          </div>
          <div className='flex flex-col gap-y-2 p-4'>
            <span className='font-bold'>Photo</span>
            {
              data.photo.length === 0 ? <Empty /> :
              <div>
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                  }}
                >
                  {
                    data.photo.map((elemet: any, index: number) => (
                      <Image alt='Photo non pris en charge' key={index} width={100} src={elemet.url_photo} />
                    ))
                  }
                </Image.PreviewGroup>
              </div>
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SignalComponent;

