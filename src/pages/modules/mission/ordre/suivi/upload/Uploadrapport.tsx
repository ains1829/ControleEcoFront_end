import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { useEnvoyeRapport } from '../../../../../../api/mission/Apiordremission';
import { useNavigate } from 'react-router-dom';

function Uploadrapport({ idordermission }: { idordermission: number }) {
  const navigate = useNavigate();
  const [file, setFile] = useState<UploadFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ispdf, setIspdf] = useState(false);
  const envoyer = useEnvoyeRapport();
  const handleUpload = async () => {
    setUploading(true);
    const file_upload = file as unknown as File;
    const reponse = await envoyer.mutateAsync({ idordermission: idordermission, rapport: file_upload, navigate});
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
        <div className='flex items-center mb-2' style={{cursor:'pointer'}}> 
          <Button className='ml-2' icon={<UploadOutlined />}>Joindre fichier</Button>
        </div>
      </Upload>
      <Button
        type="dashed"
        onClick={handleUpload}
        disabled={file === null || ispdf == false}
        loading={uploading}
        className='flex font-sans'
      >
        {uploading ? 'Uploading' : 'Envoyer'}
      </Button>
    </>
  );
};

export default Uploadrapport;