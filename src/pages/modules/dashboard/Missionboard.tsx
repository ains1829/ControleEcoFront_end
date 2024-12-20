import { Button, DatePicker, DatePickerProps, Divider, Modal, Progress, Segmented, theme } from "antd";
import { useEnqueteglobal, useStatMissionglobal, useTypeMissionglobal } from "../../../api/dashboard/Statistique";
import { useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import EnqueteStat from "./EnqueteStat";
import CollecteStat from "./CollecteStat";
import AutresuiviStat from "./AutresuiviStat";
import {MoreOutlined} from '@ant-design/icons'
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useNavigate } from "react-router-dom";
import ContentCharMission from "./ContentChart_mission";
dayjs.locale('fr');
ChartJS.register(Title, Tooltip, Legend, ArcElement);
export function Missionboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date_actuelle, setDate] = useState(Number(dayjs().format('YYYY')));
  const [choix_component, setComponent] = useState('0');
  const statmission_global = useStatMissionglobal(date_actuelle,navigate);
  const stat_typemission = useTypeMissionglobal(date_actuelle,navigate);
  const enquete_stat_global = useEnqueteglobal(date_actuelle,navigate);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, _) => {
    if (date) {
      const year = date.format('YYYY');  
      setDate(Number(year))
    }
  };
  if (statmission_global.isPending) {
    return <>loading...</>
  }
  if (statmission_global.isError) {
    return <>error...</>
  }
  if (stat_typemission.isPending) {
    return <>loading...</>
  }
  if (stat_typemission.isError) {
    return <>Error...</>
  }
  if (enquete_stat_global.isPending) {
    return <>loading...</>
  }
  if (enquete_stat_global.isError) {
    return <>errorr....</>
  }
  const data = statmission_global.data;
  const data_typemission = stat_typemission.data;
  const enquete_global_Stat = enquete_stat_global.data;
  const handleClick = (name:string) =>{
    setComponent(name)
  }
  return (
    <>
      <div
          className="flex flex-col  font-sans"
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop:10
          }}
      > 
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="text-xl font-bold">Progression des missions.</span>
            <span className="text-xs text-gray-500">(annee : {date_actuelle })</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold">Date:</span>
            <DatePicker onChange={onChange} picker="year" />
          </div>
        </div>
        <Divider dashed />
        <div className="flex flex-col font-sans">
          <div className="flex justify-between gap-y-2">
            <span className="text-xl font-bold" >Total des missions : {data?.total_missions}</span>
            <Button icon={<MoreOutlined />} type="dashed" className="font-sans text-xs" onClick={()=> setOpen(true)}>Progression par region</Button>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
              <div className="flex justify-between items-center">
                <span className="font-bold">Enquete</span>
                <span>{data_typemission[0].nombre_mission} total</span>
              </div>
              <div className="flex flex-col justify-between">
                <span>Progression</span>
                <Progress type="line" className="font-sans" percent={data_typemission[0].progressing} size="default" strokeColor={'rgb(23, 155, 174)'} />
              </div>
            </div>
            <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
              <div className="flex justify-between items-center">
                <span className="font-bold">Collecte economique</span>
                <span>{data_typemission[1].nombre_mission} total</span>
              </div>
              <div className="flex flex-col justify-between">
                <span>Progression</span>
                <Progress type="line" className="font-sans" percent={data_typemission[1].progressing} size="default" strokeColor={'rgb(65, 88, 166)'} />
              </div>
            </div>
            <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
              <div className="flex justify-between items-center">
                <span className="font-bold">Autre suivi</span>
                <span>{data_typemission[2].nombre_mission} total</span>
              </div>
              <div className="flex flex-col justify-between">
                <span>Progression</span>
                <Progress type="line" className="font-sans" percent={data_typemission[2].progressing} size="default" strokeColor={'rgb(255, 131, 67)'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentCharMission annee={date_actuelle} />
      <Modal onCancel={()=>setOpen(false)} open={open} centered width={1400} footer={(_,{})=>(<></>)}>
        <span className="font-sans font-bold">Progression par region</span>
        <div className="mt-4 mb-4 w-1/4">
          <Segmented
            className="font-sans p-1"
            options={[
              { label: 'Enquete', value: '0' },
              { label: 'Collecte', value: '1' },
              { label: 'Autre suivi', value: '2' }
            ]}
            block
            value={choix_component}
            onChange={handleClick}
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          />
        </div>
        {
          choix_component === '0' ?
            <EnqueteStat date={date_actuelle} data={data_typemission[0]} infraction={enquete_global_Stat.enquete_infraction} conforme={enquete_global_Stat.enquete_clean} /> :
              choix_component === '1' ? <CollecteStat date={date_actuelle} data={data_typemission[1]} /> :
                <AutresuiviStat date={date_actuelle} data={data_typemission[2]} />
        }
      </Modal>
    </>
  )
}