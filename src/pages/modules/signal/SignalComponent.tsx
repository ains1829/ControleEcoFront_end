import { Empty, Modal } from 'antd';
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
        <div className='flex flex-col font-sans divide-y'>
          <div className="font-sans flex flex-col p-4">
            <svg xmlns="http://www.w3.org/2000/svg" color="red" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <div className='font-sans flex flex-col mt-1'>
              <span className='text-xl font-bold'>Detail Signalment.</span> 
              <span className='text-xs'>Veuillez bien vérifier attentivement le signalement reçu pour garantir une prise en charge</span>
            </div>
          </div>
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
                      <Image alt='...' key={index} width={100} height={100} src={elemet.url_photo} />
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

