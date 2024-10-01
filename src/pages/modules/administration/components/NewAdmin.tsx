import { Button, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Formadministration } from "../../../../types/administration/Formadministration";
import { usegetProfils, usegetRegions } from "../../../../api/mission/Api";
import { useNewAdmin } from "../../../../api/administration/Apiadmin";

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
function NewAdmin({closed_modal}: {closed_modal:()=>void }) {  
  const region = usegetRegions();
  const profils = usegetProfils();
  const newAdmin = useNewAdmin();
  const [file, setFile] = useState<UploadFile | null>(null);
  const { control, handleSubmit } = useForm<Formadministration>({
    defaultValues: {
    idadministration:0
  }})
  const HandleModified: SubmitHandler<Formadministration> = async (data: Formadministration) => {
    const file_upload = file as unknown as File;
    if (file_upload == null) {
      message.error("Photo required")
    } else {
      data.photo = file_upload
      const reponse =  await newAdmin.mutateAsync({ data: data })
      if (reponse.status === 200) {
        closed_modal();
      } else {
        message.error(reponse.object);
      }
    }
  }
  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
     if (!imageMimeTypes.includes(file.type)) { 
        message.error('Uniquement des images en jpeg , png , jpg')
      }else {
        setFile(file)
      }
      return false;
    },
    fileList : file ? [file] : [],
  }; 
  const options_region: any[] = []
  if (region.isSuccess) {
    region.data.forEach((item:any) =>{
      options_region.push({label:item.nameregion , value:item.idregion.toString()})
    })
  }
  const profil: any[] = []
  if (profils.isSuccess) {
    profils.data.forEach((item:any) =>{
      profil.push({label:item.description , value:item.idprofil.toString()})
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(HandleModified)} className="flex font-sans flex-col gap-y-1">
          <div className='font-sans w-full flex flex-col'> 
            <Upload {...props}>
              <Button type="dashed" size="large" className='font-sans text-xs w-full' icon={<UploadOutlined />}>Photo</Button>
            </Upload>
          </div>
        <div>
          <label>Nom</label>
          <Controller control={control} name="name" render={({ field }) => 
            <Input {...field} className="font-sans" placeholder="nom" required/>
          }/>
        </div>
        <div>
          <label>Genre</label>
            <Controller control={control} name="genre" render={({ field }) => 
            <Select {...field} placeholder="select genre" className="w-full font-sans" options={[{label:'Femme' , value:'0'} , {label:'Homme' , value:'1'}]} />
          }/>
        </div>
        <div>
          <label>Matricule</label>
          <Controller control={control} name="matricule" render={({ field }) => 
            <Input {...field} placeholder="Matricule" className="font-sans"  required/>
          }/>
        </div>
        <div>
          <label>Email</label>
          <Controller control={control} name="email" render={({ field }) => 
            <Input {...field} placeholder="Email" className="font-sans"  required/>
          } />
        </div>
        <div>
          <label>Telephone</label>
          <Controller control={control} name="telephone" render={({ field }) => 
            <Input {...field} placeholder="Telephone" className="font-sans"  required/>
          } />
        </div>
        <div>
          <label>Profil</label>
          <Controller control={control} name="idprofil" render={({ field }) => 
          <Select {...field} placeholder="select profil" className="w-full font-sans" options={profil} />
          } />
        </div>
        <div>
          <label>Region</label>
          <Controller control={control} name="region" render={({ field }) => 
          <Select {...field}  className="w-full font-sans" placeholder="region" options={options_region} />
          } />
        </div>
        <div>
          <label>Addresse</label>
          <Controller control={control} name="addresse" render={({ field }) => 
            <Input {...field} className="font-sans" placeholder="addresse" required/>
          } />
        </div>
        <div className="mt-2 flex justify-end">
          <Button loading={newAdmin.isPending} htmlType="submit" type="dashed" size="large" className="font-sans text-xs font-bold">Valider</Button>
        </div>
      </form>
    </>
  )
}
export default NewAdmin;