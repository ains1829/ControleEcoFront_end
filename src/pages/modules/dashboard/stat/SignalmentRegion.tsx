import { DatePicker, DatePickerProps, theme } from "antd";

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useState } from "react";
import PieChartRegion from "../chart/PieCharRegion";
import GroupedBarChartRegion from "../chart/GroupedBarChartRegion";
import SignalementDetailRegion from "../../signal/SignalementDetailRegion";
dayjs.locale('fr');
function SignalmentRegion() {
  const [date_actuelle, setDate] = useState(Number(dayjs().format('YYYY')));
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, _) => {
    if (date) {
      const year = date.format('YYYY');  
      setDate(Number(year))
    }
  };
  return (
    <>
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
            <span className="text-xl font-bold">Signalement.</span>
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
          <PieChartRegion date={date_actuelle}/>
        </div>
        <div className="w-3/4  p-5 bg-white rounded-lg">
          <GroupedBarChartRegion date={date_actuelle}/>
        </div>
      </div>
      <SignalementDetailRegion date={date_actuelle}/>
  </>
  )
}
export default SignalmentRegion;