import { DatePicker, DatePickerProps, Divider, Segmented, Select, theme } from "antd";
import {
  DollarOutlined
} from '@ant-design/icons';
import Evoluation from "./stat/Evoluation";
import Provinceregion from "./stat/Provinceregion";
function Ppnboard() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
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
          <div className="flex flex-col gap-y-2">
            <span className="text-3xl font-bold" >Antananarivo.</span>
            <span className="font-bold text-sm text-gray-500">(aout 2024)</span>
          </div>
          <div className="font-sans flex flex-col">
            <div className="mb-1">
              <span className="text-xs text-gray-500 font-bold">Filtrer </span>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-xs font-bold">Date : </span>
                <DatePicker onChange={onChange} picker="month" />
              </div>
              <div>
                <span className="text-xs font-bold">Province : </span>
                <Select
                  className="font-sans"
                    defaultValue="Antananarivo"
                    allowClear
                    options={[{ value: 'Antananarivo', label: 'Antananarivo' }]}
                    placeholder="select it"
                  />
              </div>
            </div>
          </div>
          </div>
        <Divider dashed />
        <div className="flex flex-col gap-y-3 mb-5">
          <span className="text-bold text-sm font-bold">Produit de premier neccessite (PPN)</span>
          <Segmented
            className="font-sans p-1"
            options={[
              { label: 'Riz', value: '0' },
              { label: 'Riz Importer', value: '1' },
              { label: 'Sucre', value: '2' },
              { label: 'Sucre Importer', value: '3' },
              { label: 'Huile', value: '4' },
              { label: 'Huile Importer', value: '5' },
            ]}
              block
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            />
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix moyenne</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">1000 MGA</span>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">Par rapport au mois dernier</span>
                <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + 10%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix max</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">1000 MGA</span>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">Par rapport au mois dernier</span>
                <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> - 5%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix min</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">1000 MGA</span>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">Par rapport au mois dernier</span>
                <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold "> + 10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Evoluation />
      <Provinceregion />
    </div>
  )
}
export default Ppnboard;