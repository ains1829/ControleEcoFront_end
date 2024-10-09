import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { usegetDistrict, usegetRegions } from "../../../../api/mission/Api";
import { Societedata } from "../../../../types/societe/SocieteData";
import { useState } from "react";
import { SocieteForm_modify } from "../../../../types/societe/SocieteForm";
import { Button, Image, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from '@ant-design/icons';
import { useModifySociete } from "../../../../api/mission/Apiordremission";
import { useNavigate } from "react-router-dom";
function FormSociete({societe_modify , CloseModal ,page, regions, search, isfilter, datebegin, date_end} : {societe_modify:Societedata , CloseModal:()=>void , page:number,  regions: number,  search: string, isfilter: boolean, datebegin: string, date_end: string }) {
  const region = usegetRegions();
  const [file, setFile] = useState<UploadFile | null>(null);
  const navigate = useNavigate();
  const modify_societe = useModifySociete(page, search, regions, isfilter, datebegin, date_end);
  const [choice_region, setChoice] = useState(societe_modify.idregion);
  const district_options = usegetDistrict(choice_region);
  const { control, handleSubmit, reset } = useForm<SocieteForm_modify>({
    defaultValues: {
      idsociete: societe_modify?.key,
      namesociete: societe_modify?.namesociete,
      description: societe_modify?.description,
      telephone: societe_modify?.telephone,
      addresse: societe_modify?.addresse,
      iddistrict: societe_modify?.iddistrict,
      nif: societe_modify?.nif,
      stat: societe_modify?.stat,
      responsable: societe_modify?.responsable,
      numerofiscal: societe_modify.numerofiscal,
      idregion: societe_modify.idregion
    }
  });
  const options_regions: any[] = [];
  const options_district: any[] = [];
  if (region.isSuccess) {
    region.data.forEach((item : any) => (
      options_regions.push({value:item.idregion , label : <span className="font-sans">{item.nameregion}</span>})
    ))
  }
  if (district_options.isSuccess) {
    district_options.data.forEach((item: any) => (
      options_district.push({ value: item.iddistrict, label: <span className="font-sans">{item.nameville}</span> })
    ));
  }
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      if (!imageMimeTypes.includes(file.type)) { 
        message.error('Uniquement des images en jpeg , png , jpg')
      }  else {
        setFile(file)
      }
      return false;
    },
    fileList : file ? [file] : [],
  }; 
  const HandleModified: SubmitHandler<SocieteForm_modify> = async (data: SocieteForm_modify) => {
    const file_upload = file as unknown as File;
    const response = await modify_societe.mutateAsync({ logo: file_upload, data: data, navigate });
    if (response?.data.status === 200) {
      message.open({
        type: 'success',
        content: "Update Societe",
      });
      CloseModal()
    } else {
      message.open({
        type: 'error',
        content:response?.data?.object
      })
    }
  } 
  return (
    <>
        <form  onSubmit={handleSubmit(HandleModified)} id="modify_societe" className="font-sans flex flex-col gap-y-2 divide-y" >
          <div className="flex flex-col p-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth ="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
            <div className="mt-2 flex flex-col gap-y-1">
              <span className="font-bold text-secondary text-sm">Information société</span>
              <span className="text-xs text-gray-600">
                Veuillez compléter ce formulaire . Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 items-center gap-4">
            <div className="flex flex-col">
              <Image src={societe_modify.logo} width={50} height={50} />
            </div>
            <div>
              <Upload {...props}>
                <Button type="dashed" size="large" className='font-sans text-xs w-full' icon={<UploadOutlined />}>Changer</Button>
              </Upload>
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 items-center gap-4">
            <div className="flex flex-col">
              <label className="font-bold text-secondary">Nom de la société</label>
              <span className="text-xs">Indiquez le nom de la société</span>
            </div>
            <div>
              <Controller control={control} name="namesociete"  render={({field}) => <Input required {...field} className="font-sans"  placeholder={"Nom"} />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 items-center">
            <div className="flex flex-col">
              <label className="font-bold text-secondary">Responsable et contact</label>
              <span className="text-xs">Entrez le nom du responsable et son numéro de téléphone</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <Controller control={control} name="responsable"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="responsable" />}/>
              <Controller control={control} name="telephone"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="telephone" />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 items-center">
              <div className="flex flex-col">
                <span className="font-bold text-secondary">Localisation</span> 
                <span className="text-xs">Renseignez l'adresse, la région et le district de la société</span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Controller control={control} name="idregion"
                  render={({ field:{onChange , value} }) => 
                    <Select
                      options={options_regions}
                      placeholder="Region"
                      onChange={(value) => { onChange(value); if (value === undefined) {
                          setChoice(0);
                        } else {
                          setChoice(value);
                      }
                      }}
                      value={value}
                    />
                  } />
                <Controller control={control} name="iddistrict"
                  render={({ field }) => 
                    <Select
                    {...field}
                    options={options_district}
                    placeholder="District"
                  />
                } />
                <Controller control={control} name="addresse" render={({ field }) => <Input required {...field} className="font-sans" placeholder="addresse" />} />
              </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 items-center">
            <div className="flex flex-col">
              <span className="font-bold text-secondary">Informations fiscales</span> 
              <span className="text-xs">Indiquez les numéros NIF, STAT et CIF de la société</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <Controller control={control} name="nif"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="nif" />}/>
              <Controller control={control} name="stat"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="stat" />}/>
              <Controller control={control} name="numerofiscal"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="fiscal" />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 items-center">
            <div className="flex flex-col">
              <span className="font-bold text-secondary">Description de la société</span>
              <span className="text-xs">Ajoutez une brève description de la société</span>
            </div>
            <div>
              <Controller control={control} name="description"  render={({field}) => <TextArea placeholder="description" className="font-sans" {...field} rows={4} required/>}/>
            </div>
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <Button className="font-sans text-xs" type="dashed" onClick={CloseModal}>Cancel</Button>
        <Button form="modify_societe" htmlType="submit" className="font-sans text-xs bg-secondary text-white"  type="dashed">Valider</Button>
      </div>
    </>
  )
}
export default FormSociete;