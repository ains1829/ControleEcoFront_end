import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ispdf, setIspdf] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file as FileType);
    setUploading(true);
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFile(null);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
      setIspdf(false);
    },
    beforeUpload: (file) => {
      setFile(file)
      const isPNG = file.type === 'application/pdf';
      if (!isPNG) {
        message.error(`${file.name} is not a pdf file`);
        setIspdf(false)
      } else {
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
          <Button className='ml-2' icon={<UploadOutlined />}>Fiche Technique</Button>
        </div>
      </Upload>
      <Button
        type="dashed"
        onClick={handleUpload}
        disabled={file === null || ispdf == false}
        loading={uploading}
        style={{ marginTop: 16, marginLeft:'auto'}}
        className='flex font-sans  w-1/4'
      >
        {uploading ? 'Uploading' : 'Envoyer'}
      </Button>
    </>
  );
};

export default UploadComponent;