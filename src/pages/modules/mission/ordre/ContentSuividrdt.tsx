import {Empty, Segmented, theme , Progress} from "antd";
import SuiviMission from "./suivi/SuiviMission";
import {useState } from "react";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import { usegetOrdremissionByDrDt } from "../../../../api/equipe/ApiDr_dt";
import { useStatbyprogressiongbyregion } from "../../../../api/dashboard/Statistique";
function ContentSuividrdt() {
  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdremissionByDrDt();
  const progressing = useStatbyprogressiongbyregion(2024);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  if (progressing.isPending) {
    return <>loading...</>
  }
  if (progressing.isError) {
    return <>error...</>
  }
  const data_progressing = progressing.data
  const data_mission = TransformDataContent(suivi_mission.data);
  const handleClick = (name:string) =>{
    selectedFetch(name)
  }
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
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold" >Mission total : {data_progressing[0].nombre_mission + data_progressing[1].nombre_mission + data_progressing[2].nombre_mission }</span>
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
        <div className="flex flex-col gap-y-2 mb-3">
            <span className="text-xl font-bold" >Suivi mission.</span>
        </div>
       <div className="w-1/4">
            <Segmented
              className="font-sans p-1"
              options={[
                { label: 'Tous', value: '0' },
                { label: 'Terminer', value: '1' },
                { label: 'En cours', value: '2' }
              ]}
              value={selectedButton}
              onChange={handleClick}
              block
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            />
          </div>
        <div className="flex w-full grid grid-cols-4 gap-5">
          {
            data_mission.mission.length ===0 ? <Empty /> :
            data_mission.mission.map((item, index) => (
              <SuiviMission key={index}  data={item}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default ContentSuividrdt;