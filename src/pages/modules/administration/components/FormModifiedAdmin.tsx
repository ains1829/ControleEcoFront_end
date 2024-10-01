import { Button, Image, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import { Administration } from "../../../../types/administration/Administration";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Formadministration } from "../../../../types/administration/Formadministration";
import { useUpdateAdmin } from "../../../../api/administration/Apiadmin";
import { usegetProfils, usegetRegions } from "../../../../api/mission/Api";
function FormModifiedAdmin({ search , idregion, page, isregional, data_detail , closed_modal}: {search:string,idregion:number,page:number,isregional:boolean,  data_detail: Administration , closed_modal:()=>void }) {
  const modifiedform = useUpdateAdmin(search,idregion,page,isregional);
  const region = usegetRegions();
  const profils = usegetProfils();
  const [file, setFile] = useState<UploadFile | null>(null);
  const { control, handleSubmit } = useForm<Formadministration>({
    defaultValues: {
      idadministration:data_detail.key,
      name: data_detail?.name,
      matricule: data_detail?.matricule,
      email: data_detail?.email,
      telephone: data_detail?.telephone,
      addresse: data_detail?.addresse,
      idprofil: data_detail?.idprofil.toString(),
      genre: data_detail.genre.toString(),
      region:data_detail.idregion.toString()
    }
  })
  const HandleModified: SubmitHandler<Formadministration> = async (data: Formadministration) => {
    const file_upload = file as unknown as File;
    data.photo=file_upload
    const reponse = await modifiedform.mutateAsync({ data: data });
    console.log(reponse);
    if (reponse.status===200) {
      closed_modal();
    } else {
      message.error(reponse.object)
    }
  }
  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      const isPNG = file.type === 'application/pdf';
      if (!isPNG) {
      } else {
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
      <form onSubmit={handleSubmit(HandleModified)} className="flex flex-col gap-y-1">
          <div className='font-sans flex items-center' style={{ cursor: 'pointer' }}> 
            <Image src={data_detail.photo} alt="..." width={100} height={100} />
            <Upload {...props}>
              <Button type="dashed" className='font-sans text-xs ml-5' icon={<UploadOutlined />}>Changer</Button>
            </Upload>
          </div>
        <div>
          <label>Nom</label>
          <Controller control={control} name="name" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          }/>
        </div>
        <div>
          <label>Genre</label>
            <Controller control={control} name="genre" render={({ field }) => 
            <Select {...field} key={data_detail.key} className="w-full font-sans" options={[{label:'Femme' , value:'0'} , {label:'Homme' , value:'1'}]} />
          }/>
        </div>
        <div>
          <label>Matricule</label>
          <Controller control={control} name="matricule" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          }/>
        </div>
        <div>
          <label>Email</label>
          <Controller control={control} name="email" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          } />
        </div>
        <div>
          <label>Telephone</label>
          <Controller control={control} name="telephone" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          } />
        </div>
        <div>
          <label>Profil</label>
          <Controller control={control} name="idprofil" render={({ field }) => 
          <Select {...field} key={data_detail.key} className="w-full font-sans" options={profil} />
          } />
        </div>
        <div>
          <label>Region</label>
          <Controller control={control} name="region" render={({ field }) => 
          <Select {...field} key={data_detail.key} className="w-full font-sans" options={options_region} />
          } />
        </div>
        <div>
          <label>Addresse</label>
          <Controller control={control} name="addresse" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          } />
        </div>
        <div className="mt-2 flex justify-end">
            <Button loading={modifiedform.isPending} htmlType="submit" type="dashed" size="large" className="font-sans text-xs font-bold">Modifier</Button>
        </div>
      </form>
    </>
  )
}
export default FormModifiedAdmin;