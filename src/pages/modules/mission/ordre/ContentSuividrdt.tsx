import { theme , Progress, DatePicker, DatePickerProps} from "antd";
import {useState } from "react";
import { useStatbyprogressiongbyregion } from "../../../../api/dashboard/Statistique";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import MissionSuiviDr from "./suivi/MissionSuiviDr";
import { useNavigate } from "react-router-dom";
dayjs.locale('fr');
function ContentSuividrdt() {
  const navigate = useNavigate();
  const [date_actuelle, setDate] = useState(Number(dayjs().format('YYYY')));
  const progressing = useStatbyprogressiongbyregion(date_actuelle,navigate);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (progressing.isPending) {
    return <>loading...</>
  }
  if (progressing.isError) {
    return <>error...</>
  }
  const data_progressing = progressing.data
  const onChange: DatePickerProps['onChange'] = (date, _) => {
    if (date) {
      const year = date.format('YYYY');  
      setDate(Number(year))
    }
  };
  return (
    <>
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop:10
        }}
      > 
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <span className="text-xl font-bold" >Total des missions : {data_progressing[0].nombre_mission + data_progressing[1].nombre_mission + data_progressing[2].nombre_mission}</span>
            <span>(annee : {date_actuelle})</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold">Date:</span>
            <DatePicker onChange={onChange} picker="year" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Enquete</span>
              <span>{data_progressing[0].nombre_mission} total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={data_progressing[0].progressing} size="default" strokeColor={'rgb(23, 155, 174)'} />
            </div>
          </div>
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Collecte economique</span>
              <span>{data_progressing[1].nombre_mission}  total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={data_progressing[1].progressing}  size="default" strokeColor={'rgb(65, 88, 166)'} />
            </div>
          </div>
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Autre suivi</span>
              <span>{data_progressing[2].nombre_mission} total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={data_progressing[2].progressing} size="default" strokeColor={'rgb(255, 131, 67)'} />
            </div>
          </div>
        </div>
      </div>
      <MissionSuiviDr date_actuelle={date_actuelle} />
    </>
  )
}
export default ContentSuividrdt;