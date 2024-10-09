import { Button, Image, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import { Administration } from "../../../../types/administration/Administration";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Formadministration } from "../../../../types/administration/Formadministration";
import { useUpdateAdmin } from "../../../../api/administration/Apiadmin";
import { usegetProfils, usegetRegions } from "../../../../api/mission/Api";
import { useNavigate } from "react-router-dom";
function FormModifiedAdmin({ search, idregion, page, isregional, data_detail, closed_modal }: { search: string, idregion: number, page: number, isregional: boolean, data_detail: Administration, closed_modal: () => void }) {
  const navigate = useNavigate();
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
    const reponse = await modifiedform.mutateAsync({ data: data , navigate });
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
      <form onSubmit={handleSubmit(HandleModified)} className="flex font-sans flex-col gap-y-2 divide-y">
        <div className="flex flex-col p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <div className="mt-2 flex flex-col gap-y-1">
            <span className="font-bold text-secondary text-sm">Information personnel.</span>
            <span className="text-xs text-gray-600">
              Veuillez compléter ce formulaire . Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
            </span>
          </div>
        </div>
        <div className='grid grid-cols-2 p-4 items-center gap-4'> 
          <div>
            <Image src={data_detail.photo} alt="..." width={50} height={50} />
          </div>
          <div>
            <Upload {...props}>
              <Button type="dashed" className='font-sans text-xs ml-5' icon={<UploadOutlined />}>Changer</Button>
            </Upload>
          </div>
        </div>
        <div className="grid grid-cols-2 p-4 items-center gap-4">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Profil</label>
            <span className="text-xs">Précisez le profil du personnel</span>
          </div>
          <Controller control={control} name="idprofil" render={({ field }) => 
          <Select {...field} key={data_detail.key} className="w-full font-sans" options={profil} />
          } />
        </div>
        <div className="grid grid-cols-2 p-4 items-center gap-4">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Nom</label>
            <span className="text-xs">Indiquez le nom et le prénom</span>
          </div>
          <Controller control={control} name="name" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          }/>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 items-center">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Genre</label>
            <span className="text-xs">Mentionnez le genre du personnel</span>
          </div>
            <Controller control={control} name="genre" render={({ field }) => 
            <Select {...field} key={data_detail.key} className="w-full font-sans" options={[{label:'Femme' , value:'0'} , {label:'Homme' , value:'1'}]} />
          }/>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 items-center">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Matricule</label>
            <span className="text-xs">Indiquez le matricule du personne</span>
          </div>
          <Controller control={control} name="matricule" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          }/>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 items-center">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Contact</label>
            <span className="text-xs">Fournissez l'email et le numéro de téléphone le plus utilisé par le personnel</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller control={control} name="email" render={({ field }) => 
              <Input {...field} className="font-sans"  required/>
            } />
            
          <Controller control={control} name="telephone" render={({ field }) => 
            <Input {...field} className="font-sans"  required/>
          } />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 items-center">
          <div className="flex flex-col">
            <label className="font-bold text-secondary">Region et Addresse</label>
            <span className="text-xs">Indiquez la région et l'adresse où il réside</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller control={control} name="region" render={({ field }) => 
            <Select {...field} key={data_detail.key} className="w-full font-sans" options={options_region} />
            } />
            <Controller control={control} name="addresse" render={({ field }) => 
              <Input {...field} className="font-sans"  required/>
            } />
          </div>
        </div>
        <div></div>
      </form>
      <div className="mt-2 flex gap-2 justify-end">
        <Button className="font-sans text-xs" type="dashed" onClick={closed_modal}>Cancel</Button>
        <Button loading={modifiedform.isPending} htmlType="submit" type="dashed" className="font-sans text-xs bg-secondary text-white">Modifier</Button>
      </div>
    </>
  )
}
export default FormModifiedAdmin;