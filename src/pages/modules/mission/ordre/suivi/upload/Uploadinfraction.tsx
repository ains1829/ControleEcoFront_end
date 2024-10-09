import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { useEnquetePvinfraction } from '../../../../../../api/mission/Apiordremission';
import { useNavigate } from 'react-router-dom';

function Uploadinfraction({ idordermission }: { idordermission: number }) {
  const navigate = useNavigate();
  const [file, setFile] = useState<UploadFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ispdf, setIspdf] = useState(false);
  const envoyer = useEnquetePvinfraction();
  const handleUpload = async () => {
    setUploading(true);
    const file_upload = file as unknown as File;
    const reponse = await envoyer.mutateAsync({ idordermission: idordermission, fiche: file_upload,navigate});
    console.log(reponse);
    if (reponse.status === 200 ) {
      setUploading(false);
    } else {
      setUploading(false);
      message.error(reponse.data)
    }
  };
  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
      setIspdf(false);
    },
    beforeUpload: (file) => {
      const isPNG = file.type === 'application/pdf';
      if (!isPNG) {
        message.error(`${file.name} is not a pdf file`);
        setIspdf(false)
      } else {
        setFile(file)
        setIspdf(true)
      }
      return false;
    },
    fileList : file ? [file] : [],
  }; 
  return (
    <>
      <Upload {...props}>
        <div className='flex items-center' style={{cursor:'pointer'}}>
          <span className='font-sans'>Fichier en pdf  : </span>  
          <Button className='ml-2 text-xs font-sans' type="dashed" icon={<UploadOutlined />}>Pv Infraction</Button>
        </div>
      </Upload>
      <Button
        type="dashed"
        onClick={handleUpload}
        disabled={file === null || ispdf == false}
        loading={uploading}
        style={{ marginTop: 5, marginLeft:'auto'}}
        className='flex font-sans  w-1/4'
      >
        {uploading ? 'Uploading' : 'Envoyer'}
      </Button>
    </>
  );
};

export default Uploadinfraction;