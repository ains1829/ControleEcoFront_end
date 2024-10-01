import { DatePicker, DatePickerProps, theme } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importer la locale française
import PieChart from "../chart/PieChart";
import GroupedBarChart from "../chart/GroupedBarChart";
import Signalementbyregion from "./regional/Siganelementbyregion";
dayjs.locale('fr');
function Signalement() {
  const [date_actuelle, setDate] = useState(Number(dayjs().format('YYYY')));
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, _) => {
    if (date) {
      const year = date.format('YYYY');  
      setDate(Number(year))
    }
  };
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col font-sans"
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop:10
        }}
      > 
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="text-xl font-bold">Signalment.</span>
            <span className="text-xs">(annee : {date_actuelle })</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold">Date:</span>
            <DatePicker onChange={onChange} picker="year" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="w-1/4 p-5 bg-white rounded-lg">
          <PieChart date={date_actuelle}/>
        </div>
        <div className="w-3/4  p-5 bg-white rounded-lg">
          <GroupedBarChart date={date_actuelle} />
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-3 p-5 bg-white rounded-lg">
        <span className="font-sans font-bold text-red-500">Tableau des Signalements Totaux par Région</span>
        <Signalementbyregion date={date_actuelle}/>
      </div>
    </div>
  )
}
export default Signalement;