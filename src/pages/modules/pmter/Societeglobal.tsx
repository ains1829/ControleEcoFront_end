import {  Button, Divider, FloatButton, Input, message, Modal, Popover, Select, theme, Upload, UploadFile, UploadProps } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import {
  PlusCircleOutlined,
  UploadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { usegetDistrict, usegetRegions } from "../../../api/mission/Api";
import TextArea from "antd/es/input/TextArea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SocieteForm } from "../../../types/societe/SocieteForm";
import { useSaveSociete } from "../../../api/mission/Apiordremission";
import { UserInstance } from "../../../types/administration/Userconnected";
import { DatePicker } from "antd";
import ResulFilter from "./components/ResulFilter";
import { useNavigate } from "react-router-dom";
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
function Societeglobal() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();
  const [file, setFile] = useState<UploadFile | null>(null);
  const [search, setSearch] = useState('');
  const [filterOm_mission, setFilterom] = useState(false);
  const [filter_om, setFilter] = useState(false);
  const [date_begin, setDatebegin] = useState('');
  const [date_end, setDateend] = useState('');
  const [date_begin_filter, setDateBeginfilter] = useState('');
  const [date_end_filter, setDateEndfilter] = useState('');
  const [search_filter, setSearchFilter] = useState('');
  const [region_filter, setRegionFilter] = useState(0);
  const [click_button_filter, setClick] = useState(0);
  const [region_choice, setRegion] = useState(0);
  const region = usegetRegions();
  const [choice_region, setChoice] = useState(0);
  const [open, setOpen] = useState(false);
  const district_options = usegetDistrict(choice_region);
  const { control, handleSubmit,reset } = useForm<SocieteForm>();
  const savesociete = useSaveSociete();
  const role = UserInstance().getRole
  if (region.isPending) {
    return <>loading...</>
  }
  if (region.isError) {
    return <>error...</>
  }

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
  const handleChange = (value: number , option : any) => {
    setRegion(value)
    // setRegionview(option.label)
  };
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };
  const handlenewsociete: SubmitHandler<SocieteForm> = async (data) => {
    const file_upload = file as unknown as File;
    const reponse = await savesociete.mutateAsync({logo:file_upload , data:data,navigate});
    if (reponse?.data?.status === 200) {
      message.open({
        type: 'success',
        content: "New Societe",
      });
      setRegion(0);
      // setRegionview('Tous');
      setOpen(false);
      setFile(null);
      reset();
    } else {
      message.open({
        type: 'error',
        content:reponse?.data?.object
      })
    }
  }
  const { RangePicker } = DatePicker;
  const onYearRangeChange = async (dates:any, _:any) => {
    if (dates) {
      const [startYear, endYear] = dates;
      setDatebegin(startYear.format('YYYY') + "-" + startYear.format('MM') + '-01');
      setDateend(endYear.format('YYYY') + "-" + endYear.format('MM') + '-01');
      setFilterom(true)
    } else {
      console.log('Aucune date sélectionnée');
      setFilterom(false);
    }
  };
  const resetFilter =  () => {
    setSearchFilter('');
    setDateBeginfilter('');
    setDateEndfilter('');
    setRegionFilter(0);
    setFilter(false);
    setClick(click_button_filter + 1);
  }
  const HandleFilter = () => {
    console.log("salut")
    setDateBeginfilter(date_begin);
    setDateEndfilter(date_end);
    setSearchFilter(search);
    setRegionFilter(region_choice);
    setFilter(filterOm_mission);
    setClick(click_button_filter + 1);
  }
  const content = (
    <div className="font-sans flex flex-col gap-y-3 p-1">
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Recherche</span>
        <Input placeholder="recherche" onChange={onSearch} className="font-sans" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Historique des descentes</span>
        <RangePicker className="font-sans" picker="month" placeholder={['Date 1', 'Date 2']} onChange={onYearRangeChange}/>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Region</span>
        <Select
          allowClear={false}
          options={options}
          placeholder="Tous"
          className="font-sans"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={resetFilter} type="dashed" className="font-sans text-xs">Reset</Button>
        <Button onClick={HandleFilter} type="dashed" className="font-sans text-xs bg-secondary text-white">Valider</Button>
      </div>
    </div>
  )
  return (
    <>
    <div
      className="flex flex-col gap-y-2 font-sans"
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        marginTop:10
      }}
    > 
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold" >Societe.</span>
        </div>
        <Popover title={<span className="font-sans p-1">Filtre</span>} placement="bottom" arrow content={content}>
          <Button className="font-sans" icon={<FilterOutlined />} type="dashed">Filter</Button>
        </Popover>
      </div>
        <ResulFilter change_filter={click_button_filter} region={region_filter} search={search_filter} isfilter={filter_om} datebegin={date_begin_filter} date_end={date_end_filter} />
      </div>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={(_, {   }) => (
          <>
            <Button className="font-sans text-xs" type="dashed" onClick={()=> setOpen(false)}>Cancel</Button>
            <Button form="newsociete" htmlType="submit" className="font-sans text-xs bg-secondary text-white"  type="dashed">Valider</Button>
          </>
        )}
      >
        <form id="newsociete" className="font-sans flex flex-col gap-y-2 divide-y" onSubmit={handleSubmit(handlenewsociete)}>
          <div className="flex flex-col p-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
            <div className="mt-2 flex flex-col gap-y-1">
              <span className="font-bold text-secondary text-sm">Nouveaux société</span>
              <span className="text-xs text-gray-600">
                Veuillez compléter ce formulaire . Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 items-center gap-4">
            <div className="flex flex-col">
              <label className="font-bold text-secondary">Logo de la société </label>
              <span className="text-xs">Téléchargez le logo de la société</span>
            </div>
            <div>
              <Upload {...props}>
                <Button type="dashed" size="large" className='font-sans text-xs w-full' icon={<UploadOutlined />}>Photo</Button>
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
                  } />
                <Controller control={control} name="iddistrict"
                  render={({ field }) => 
                    <Select
                    {...field}
                    allowClear
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
      </Modal>
      {
        role === "DSI" &&
          <FloatButton icon={<PlusCircleOutlined /> }  type="default" shape="circle" tooltip={<div className="font-sans text-xs">Nouveaux </div>}onClick={()=>setOpen(true)}/>
      }
    </>
  )
}
export default Societeglobal;