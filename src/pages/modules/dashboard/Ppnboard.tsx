import { DatePicker, DatePickerProps, Divider, Segmented, Select, theme } from "antd";

import Evoluation from "./stat/Evoluation";
import Provinceregion from "./stat/Provinceregion";
import Priceglobal from "./stat/Priceglobal";
import { provinces } from "../../../types/lieu/Province";
import { useState } from "react";
import { usegetProduct } from "../../../api/mission/Apipublic";
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importer la locale française
dayjs.locale('fr');
function Ppnboard() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [province_choice, setProvincechoice] = useState(1);
  const [product_choice, setProductchoice] = useState(1);
  const [label_province, setLabel] = useState('Antananarivo');
  const [mois, setmois] = useState(dayjs().format('MMMM'))
  const [anne, setannee] = useState(Number(dayjs().format('YYYY')))
  const [moisNumber,setMoisNumber] = useState(Number(dayjs().format('M')))
  const product = usegetProduct();
  const onChange: DatePickerProps['onChange'] = (date, _) => {
    if (date) {
      const month = date.format('MMMM');
      const year = date.format('YYYY');  
      setmois(month);
      setMoisNumber(Number(date.format('M')));
      setannee(Number(year))
    } else {
      console.log('Date non sélectionnée');
    }
  };
  const handleChangeProvince = (value:any, option:any) => {
    setProvincechoice(value)
    setLabel(option.label)
  }
  const options = provinces.map(province => ({
    value: province.id,
    label: province.name
  }));
  const option_product: any[] = []
  if (product.isSuccess) {
    console.log(product.data)
    product.data.map((item:any) => (
      option_product.push({ value: item.idproduct, label: <span className="font-sans">{ item.nameproduct } / ({item.typeproduct.unite.nameunite}) </span>})
    ))
  }
  const handleSegmentedChange = (value:number) => {
    setProductchoice(value);
  }
  return (
    <div className="flex flex-col gap-y-2">
      <div
        className="flex flex-col  font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop:10
        }}
      > 
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <span className="text-xl font-bold" >{label_province}.</span>
            <span className="font-bold text-xs text-gray-500">({mois} {anne})</span>
          </div>
          <div className="font-sans flex flex-col">
            <div className="flex gap-4">
              <div className="flex gap-4 items-center">
                <span className="text-xs font-bold">Date : </span>
                <DatePicker onChange={onChange} picker="month" />
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs font-bold">Province : </span>
                <Select
                  className="font-sans"
                  options={options}
                  onChange={handleChangeProvince}
                  placeholder='Antananarivo'
                  />
              </div>
            </div>
          </div>
          </div>
        <Divider dashed />
        <div className="flex flex-col gap-y-3 mb-5">
          <span className="text-bold text-sm font-bold">Produit de première nécessité (PPN)</span>
          <Segmented
            className="font-sans p-1"
            defaultValue={1}
            options={option_product}
            onChange={handleSegmentedChange}
              block
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            />
        </div>
        <Priceglobal province={province_choice} product={product_choice} mois={moisNumber} annee={anne}/>
      </div>
      <Provinceregion province={province_choice} product={product_choice} mois={moisNumber} annee={anne}/>
      <Evoluation province={province_choice} product={product_choice} annee={anne}/>
    </div>
  )
}
export default Ppnboard;