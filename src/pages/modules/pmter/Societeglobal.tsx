import { Breadcrumb, Button, Input, message, Modal, Select, theme } from "antd";
import C_societe from "./C_societe";
import Search, { SearchProps } from "antd/es/input/Search";
import { TransformdataSociete } from "../../../types/societe/SocieteData";
import { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { usegetDistrict, usegetRegions, usegetSocieteglobal } from "../../../api/mission/Api";
import TextArea from "antd/es/input/TextArea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SocieteForm } from "../../../types/societe/SocieteForm";
import { useSaveSociete } from "../../../api/mission/Apiordremission";
function Societeglobal() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [region_choice, setRegion] = useState(0);
  const [region_view , setRegionview] = useState('Tous')
  const societe = usegetSocieteglobal(region_choice, page, search);
  const region = usegetRegions();
  const [choice_region, setChoice] = useState(0);
  const [open, setOpen] = useState(false);
  const district_options = usegetDistrict(choice_region);
  const { control, handleSubmit } = useForm<SocieteForm>();
  const savesociete = useSaveSociete();
  if (societe.isPending) {
    return <>loading....</>
  }
  if (societe.isError) {
    return <>error...</>
  }
  if (region.isPending) {
    return <>loading...</>
  }
  if (region.isError) {
    return <>error...</>
  }
  const data_societe = TransformdataSociete(societe.data.data);
  const options : any [] = [];
  const options_regions: any[] = [];
  const options_district: any[] = [];
  options.push({value : 0,label : <span className="font-sans">Tous</span>})
  region.data.forEach((item: any) => (
    options.push({ value: item.idregion, label: <span className="font-sans">{item.nameregion}</span> })
  ));
  region.data.forEach((item : any) => (
    options_regions.push({value:item.idregion , label : <span className="font-sans">{item.nameregion}</span>})
  ))
  if (district_options.isSuccess) {
    district_options.data.forEach((item: any) => (
      options_district.push({ value: item.iddistrict, label: <span className="font-sans">{item.nameville}</span> })
    ));
  }
  const handleChange = (value: number , option : any) => {
    setPage(0)
    setRegion(value)
    setRegionview(option.label)
  };
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    setPage(0)
    setSearch(value)
  };
  const handleNext = () => {
    if (societe.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (societe.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (societe.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (societe.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  const handlenewsociete: SubmitHandler<SocieteForm> = async (data) => {
    console.log(data);
    const reponse = await savesociete.mutateAsync(data);
    if (reponse?.data?.status === 200) {
      message.open({
        type: 'success',
        content: "New Societe",
      });
      setPage(0);
      setRegion(0);
      setRegionview('Tous');
      setOpen(false);
    } else {
      message.open({
        type: 'error',
        content:reponse?.data?.data
      })
    }
  }
  return (
    <>
    <Breadcrumb className="font-sans p-2" items={[{ title: 'Liste' } , {title:'Societe'}]} />
   <div
      className="flex flex-col gap-y-2 font-sans"
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      > 
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold" >Societe.</span>
          <span className="text-sm font-bold">{region_view }</span>
          <div className="flex gap-3 w-1/2">
            <div className="flex items-center gap-2">
              <span>Region</span>
              <Select
                allowClear={false}
                options={options}
                placeholder="Tous"
                className="font-sans"
                style={{ width: '200px' }}
                onChange={handleChange}
              />
            </div>
            <Search placeholder="Recherche" allowClear onSearch={onSearch} className="font-sans" />
          </div>
        </div>
        <div className="flex justify-end font-sans font-bold">
          <span className="border-dotted border-gray-200 border-2 p-2 text-xs rounded-md cursor-pointer" onClick={()=>setOpen(true)}><PlusCircleOutlined /> Nouveau societe </span>
        </div>
        <C_societe data={data_societe} />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className={`${ClassNamePrevious} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handlePrevious}>
              <LeftOutlined />
              <span>
                Previous
              </span>
            </div>
            <div className={`${classNameNext} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handleNext}>
              <span>
                Next
              </span>
              <RightOutlined/>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold">Page {societe.data.page + 1} de {societe.data.nombrepage}</span>
          </div>
        </div>
      </div>
       <Modal
        title={<div className="flex flex-col gap-y-3 font-sans">
          <span className="text-secondary text-2xl">Nouveaux </span>
          <span className="text-xs text-gray-400 ">
            Veuillez compléter ce formulaire .
            Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
          </span>
        </div>}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={(_, {   }) => (
          <>
            <Button className="font-sans text-xs" size="large" type="dashed" onClick={()=> setOpen(false)}>Cancel</Button>
            <Button form="newsociete" htmlType="submit" className="font-sans text-xs bg-green-500 text-white" size="large" type="dashed">Valider</Button>
          </>
        )}
      >
        <form id="newsociete" className="font-sans flex flex-col gap-y-2" onSubmit={handleSubmit(handlenewsociete)}>
          <div>
            <label>Nom</label>
            <Controller control={control} name="namesociete"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder={"Nom"} />}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span>Responsable</span>
              <Controller control={control} name="responsable"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="responsable" />}/>
            </div>
            <div>
              <span>Telephone</span>
              <Controller control={control} name="telephone"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="telephone" />}/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span>Addresse</span> 
              <Controller control={control} name="addresse"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="addresse" />}/>
            </div>
            <div className="flex flex-col">
              <span>Region</span>
              <Controller control={control} name="idregion"
                render={({ field:{onChange , value} }) => 
                  <Select
                    allowClear
                    options={options_regions}
                    placeholder="Region"
                    onChange={(value) => { onChange(value); if (value === undefined) {
                        setChoice(0);
                      } else {
                        setChoice(value);
                      }}}
                    value={value}
                  />
                }/>
            </div>
            <div className="flex flex-col">
              <span>District</span>
              <Controller control={control} name="iddistrict"
                render={({ field }) => 
                  <Select
                  {...field}
                  allowClear
                  options={options_district}
                  placeholder="District"
                />
              }/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span>Nif</span> 
              <Controller control={control} name="nif"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="nif" />}/>
            </div>
            <div>
              <span>Stat</span>
              <Controller control={control} name="stat"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="stat" />}/>
            </div>
            <div>
              <span>Numero fiscal</span>
              <Controller control={control} name="numerofiscal"  render={({field}) => <Input required {...field} className="font-sans" size={"large"} placeholder="fiscal" />}/>
            </div>
          </div>
          <div>
            <span>Description</span>
            <Controller control={control} name="description"  render={({field}) => <TextArea className="font-sans" {...field} rows={4} required/>}/>
          </div>
        </form>
      </Modal>
    </>
  )
}
export default Societeglobal;