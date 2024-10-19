import { Button, DatePicker, Divider, Popover, Radio, RadioChangeEvent, Select, theme } from "antd";
import TableValidation from "./components/Tablevalidation";
import Search from "antd/es/input/Search";
import {
  FilterOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { usegetDistrict, usegetRegions } from "../../../api/mission/Api";
function Validation_ppn() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(1);
  const region = usegetRegions();
  const [region_choice, setRegion] = useState(0);
  const [district_choice, setDistrict] = useState(0);
  const district_options = usegetDistrict(region_choice);
  const [date_begin, setDatebegin] = useState('');
  const [date_end, setDateend] = useState('');
  const [filtreCollecte, setFiltreCollecteDate] = useState(false);
  const [date_begin_filter, setDateBeginfilter] = useState('');
  const [date_end_filter, setDateEndfilter] = useState('');
  const [filetreCollecte_filter, setFiltreCollecteDate_filter] = useState(false);
  const [district_filter, setDistrictFilter] = useState(0);
  const [value_filter, setValuefilter] = useState(1);
  const [region_filter, setRegionFilter] = useState(0);
  const onYearRangeChange = async (dates:any, _:any) => {
    if (dates) {
      const [startYear, endYear] = dates;
      setDatebegin(startYear.format('YYYY') + "-" + startYear.format('MM') + '-01');
      setDateend(endYear.format('YYYY') + "-" + endYear.format('MM') + '-01');
      setFiltreCollecteDate(true);
    } else {
      setFiltreCollecteDate(false);
    }
  };
  const handleChange = (value: number) => {
    setRegion(value)
  };
  const handleChangeDistrict = (value: number) => {
    setDistrict(value)
  }
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const HandleFilter = async () => {
    setFiltreCollecteDate_filter(filtreCollecte);
    setDateBeginfilter(date_begin);
    setDateEndfilter(date_end);
    setDistrictFilter(district_choice);
    setValuefilter(value);
    setRegionFilter(region_choice)
  }
  const options_regions: any[] = [];
  const options_district: any[] = [];
  if (region.isSuccess) {
    options_regions.push({value:0 , label:<span className="font-sans">Tous</span>})
    region.data.forEach((item: any) => (
      options_regions.push({ value: item.idregion, label: <span className="font-sans">{item.nameregion}</span> })
    ));
  }
  if (district_options.isSuccess) {
    options_district.push({value:0 , label:<span className="font-sans">Tous</span>})
    district_options.data.forEach((item: any) => (
      options_district.push({ value: item.iddistrict, label: <span className="font-sans">{item.nameville}</span> })
    ));
  }
  const content = (
    <div className="font-sans flex flex-col gap-y-3 p-1">
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Historique des collectes</span>
        <RangePicker style={{flex:'1'}} className="font-sans" picker="month" placeholder={['Date 1', 'Date 2']} onChange={onYearRangeChange} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Region</span>
        <Select
          allowClear={false}
          options={options_regions}
          placeholder="Tous"
          className="font-sans"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-secondary">District</span>
        <Select
          allowClear={false}
          options={options_district}
          placeholder="Tous"
          className="font-sans"
          style={{ flex: '1' }}
          onChange={handleChangeDistrict}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-secondary">Status</span>
        <Radio.Group  onChange={onChange} value={value}>
          <Radio className="font-sans" value={1}>Tous</Radio>
          <Radio className="font-sans" value={2}>Valider</Radio>
          <Radio className="font-sans" value={3}>Rejeter</Radio>
          <Radio className="font-sans" value={4}>En attente</Radio>
        </Radio.Group>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="dashed" className="font-sans text-xs">Reset</Button>
        <Button onClick={HandleFilter} type="dashed" className="font-sans text-xs bg-secondary text-white">Filtrer</Button>
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
        <div className="flex flex-col gap-y-1">
          <span className="text-xl font-bold">Resultat collecte.</span>
          <span>Les résultats des collectes doivent être validés avant d'apparaître sur le tableau de bord</span>
        </div>
        <Divider dashed />
        <div className="flex gap-2">
          <div className="w-1/4">
            <Search placeholder="reference" className="font-sans" />
          </div>
          <Popover title={<span className="font-sans p-1">Filtre</span>} placement="bottom" arrow content={content}>
            <Button icon={<FilterOutlined />} type="dashed" className="font-sans" >Filter</Button>
          </Popover>
        </div>
        <TableValidation filter={filetreCollecte_filter} date_begin={date_begin_filter} date_end={date_end_filter} region={region_filter} district={district_filter} value_radio={value_filter} />
      </div>
    </>
  )
}
export default Validation_ppn;