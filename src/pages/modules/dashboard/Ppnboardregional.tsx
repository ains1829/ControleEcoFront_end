import { DatePicker, DatePickerProps, Divider, Segmented, theme } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { usegetProduct } from "../../../api/mission/Apipublic";
import Priceglobalbyregion from "./stat/regional/Priceglobalbyregion";
import Evoluationbyregion from "./stat/regional/Evoluationbyregion";
import Provinceregional from "./stat/regional/Provinceregional";
dayjs.locale('fr');
function Ppnboardregional() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [product_choice, setProductchoice] = useState(1);
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
  const option_product: any[] = []
  if (product.isSuccess) {
    console.log(product.data)
    product.data.map((item:any) => (
      option_product.push({ value: item.idproduct, label: <span className="font-sans">{ item.nameproduct } / ({item.typeproduct.unite.nameunite})</span>})
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
              <span className="text-xl font-bold" >Dashboard.</span>
              <span className="font-bold text-xs text-gray-500">({mois} {anne})</span>
            </div>
            <div className="font-sans flex flex-col">
              <div className="flex gap-4">
                <div className="flex gap-4 items-center">
                  <span className="text-xs font-bold">Date : </span>
                  <DatePicker onChange={onChange} picker="month" />
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
          <Priceglobalbyregion product={product_choice} mois={moisNumber} annee={anne}/>
        </div>
        <Provinceregional  product={product_choice} mois={moisNumber} annee={anne}/>
        <Evoluationbyregion  product={product_choice} annee={anne}/>
      </div>
  )
}
export default Ppnboardregional;