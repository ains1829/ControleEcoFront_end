import { Breadcrumb, Button, Input, message, Modal, Select, theme, Upload, UploadFile, UploadProps } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import {
  PlusCircleOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { usegetDistrict, usegetRegions } from "../../../api/mission/Api";
import TextArea from "antd/es/input/TextArea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SocieteForm } from "../../../types/societe/SocieteForm";
import { useSaveSociete } from "../../../api/mission/Apiordremission";
import { UserInstance } from "../../../types/administration/Userconnected";
import { DatePicker } from "antd";
import ResulFilter from "./components/ResulFilter";
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
function Societeglobal() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  const [file, setFile] = useState<UploadFile | null>(null);
  const [search, setSearch] = useState('');
  const [filterOm_mission, setFilterom] = useState(false);
  const [date_begin, setDatebegin] = useState('');
  const [date_end, setDateend] = useState('');
  const [region_choice, setRegion] = useState(0);
  const [region_view , setRegionview] = useState('Tous')
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
    setRegionview(option.label)
  };
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    setSearch(value)
  };

  const handlenewsociete: SubmitHandler<SocieteForm> = async (data) => {
    const file_upload = file as unknown as File;
    const reponse = await savesociete.mutateAsync({logo:file_upload , data:data});
    if (reponse?.data?.status === 200) {
      message.open({
        type: 'success',
        content: "New Societe",
      });
      setRegion(0);
      setRegionview('Tous');
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
      setSearch('');
    } else {
      console.log('Aucune date sélectionnée');
      setFilterom(false);
    }
  };
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
          <div className="flex flex-col">
            <span className="text-xl font-bold" >Societe.</span>
            <span className="text-xs font-bold">({region_view })</span>
          </div>
          <div className="flex items-center w-5/6 gap-3">
            <div className="flex">
              <span className="text-xs font-bold">Date descente</span>
              <RangePicker style={{ width: '200px' }} picker="month" placeholder={['Date 1', 'Date 2']} onChange={onYearRangeChange}/>
            </div>
            <div className="flex  items-center gap-2 w-1/4">
              <span className="text-xs font-bold">Region</span>
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
            {
              role === "DSI" &&
              <div className="flex justify-end font-sans font-bold">
                <Button icon={<PlusCircleOutlined /> }  className="text-xs bg-secondary text-white font-sans" onClick={()=>setOpen(true)}>Nouveau societe </Button>
              </div>
            }
          </div>
        </div>
        <ResulFilter region={region_choice}  search={search} isfilter={filterOm_mission} datebegin={date_begin} date_end={date_end} />
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
          <div className="flex flex-col p-2 ">
            <span className="font-bold text-secondary text-xl">Company </span>
            <span className="text-xs ">
              Veuillez compléter ce formulaire . Assurez-vous que toutes les informations sont exactes et complètes avant de valider.
            </span>
          </div>
          <div className="grid grid-cols-2 p-2 items-center gap-4">
            <div className="flex flex-col">
              <label className="font-bold">Logo</label>
              <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <Upload {...props}>
                <Button type="dashed" size="large" className='font-sans text-xs w-full' icon={<UploadOutlined />}>Photo</Button>
              </Upload>
            </div>
          </div>
          <div className="grid grid-cols-2 p-2 items-center gap-4">
            <div className="flex flex-col">
              <label className="font-bold">Societe nom</label>
              <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <Controller control={control} name="namesociete"  render={({field}) => <Input required {...field} className="font-sans"  placeholder={"Nom"} />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2 items-center">
            <div className="flex flex-col">
              <span className="font-bold">Responsable</span>
              <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <Controller control={control} name="responsable"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="responsable" />}/>
              <Controller control={control} name="telephone"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="telephone" />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2 items-center">
              <div className="flex flex-col">
                <span className="font-bold">Addresse</span> 
                <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Controller control={control} name="addresse" render={({ field }) => <Input required {...field} className="font-sans" placeholder="addresse" />} />
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
                }/>
              </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2 items-center">
            <div className="flex flex-col">
              <span className="font-bold">Nif</span> 
              <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <Controller control={control} name="nif"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="nif" />}/>
              <Controller control={control} name="stat"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="stat" />}/>
              <Controller control={control} name="numerofiscal"  render={({field}) => <Input required {...field} className="font-sans"  placeholder="fiscal" />}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-2 items-center">
            <div className="flex flex-col">
              <span className="font-bold">Description</span>
              <span className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <Controller control={control} name="description"  render={({field}) => <TextArea placeholder="description" className="font-sans" {...field} rows={4} required/>}/>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}
export default Societeglobal;