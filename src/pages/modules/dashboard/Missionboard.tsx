import { Button, DatePicker, DatePickerProps, Divider, theme } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import Tableregion from "./Tableregion";
import { useEnqueteglobal, useStatMissionglobal, useTypeMissionglobal } from "../../../api/dashboard/Statistique";
import { useState } from "react";
export function Missionboard() {
  const [date_actuelle, setDate] = useState(0);
  const statmission_global = useStatMissionglobal(date_actuelle);
  const stat_typemission = useTypeMissionglobal(date_actuelle);
  const enquete_stat_global = useEnqueteglobal(date_actuelle);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDate(2024);
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
  console.log(enquete_global_Stat);
  return (
    <>
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
        <div className="flex justify-between">
          <span className="text-sm font-bold">DASHBOARD</span>
          <DatePicker onChange={onChange} picker="year" />
        </div>
        <Divider dashed />
         <div className="flex justify-between font-sans items-center">
          <div className="flex flex-col gap-y-2">
              <span className="text-3xl font-bold" >Ordre de Mission.</span>
            <span className="font-bold text-sm">{data?.total_missions} total</span>
          </div>
          <div className="w-1/3 grid grid-cols-2 divide-x">
            <div className="flex flex-col gap-y-1 p-1 justify-center flex-end items-center">
              <span className="text-4xl font-bold">{data?.missions_fini }</span>
              <span className="text-xs text-xs text-gray-400">Mission terminer</span>
            </div>
           <div className="flex flex-col gap-y-1 p-1 justify-center flex-end items-center">
              <span className="text-4xl font-bold">{data?.missions_en_cours }</span>
              <span className="text-xs text-gray-400">Mission en cours</span>
            </div>
          </div>
          <div className="w-1/4 grid grid-cols-3 divide-x">
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{data_typemission[0]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">enquete</span> 
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{data_typemission[1]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">collecte </span> 
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{data_typemission[2]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">autre suivi</span> 
            </div>
          </div>
        </div>
        <Divider dashed/>
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-xl ">
              <div>
                <span className="text-blue-800 font-bold bg-white shadow-xl p-2 text-xs rounded-full"> <DashboardOutlined /> Enquete en cours</span>
              </div>
              <span className="text-blue-800 mt-6 text-3xl font-bold">{ enquete_global_Stat?.enquete_encours}</span>
            </div>
            <div className="flex flex-col bg-green-100 p-4 rounded-xl ">
              <div>
                <span className="text-green-400 font-bold  bg-white rounded-full shadow-xl p-2 text-xs"> <CheckCircleOutlined /> Enquete Fini</span>
              </div>
              <span className="mt-6 text-3xl text-green-400 font-bold">{ enquete_global_Stat?.enquete_fini}</span>
            </div>
            <div className="flex flex-col p-4 bg-red-100 rounded-xl">
              <div>
                <span className="text-red-500 font-bold bg-white shadow-xl p-2 text-xs rounded-full"><ClockCircleOutlined /> Infraction</span>
              </div>
              <span className="mt-6 text-red-500 text-3xl font-bold">{ enquete_global_Stat?.enquete_infraction}</span>
            </div>
            <div className="flex flex-col p-4 bg-blue-100 rounded-xl">
              <div>
                <span className="text-blue-800 font-bold bg-white shadow-xl p-2 text-xs rounded-full"> <DashboardOutlined /> Clean</span>
              </div>
              <span className="mt-6 text-blue-800 text-3xl font-bold">{ enquete_global_Stat?.enquete_clean}</span>
            </div>
          </div>
        </div>
      </div>
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
          <span className="text-sm font-bold">Detail par region</span>
          <Button icon={<DownloadOutlined />} type="dashed" className="bg-secondary text-white font-sans text-xs">Exporter</Button>
        </div>
        <Tableregion  date={date_actuelle}/>
        </div>
    </>
  )
}