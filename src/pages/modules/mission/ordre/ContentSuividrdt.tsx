import {Divider, Empty, Segmented, theme } from "antd";
import SuiviMission from "./suivi/SuiviMission";
import {useState } from "react";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import { usegetOrdremissionByDrDt } from "../../../../api/equipe/ApiDr_dt";
function ContentSuividrdt() {
  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdremissionByDrDt();
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
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
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop:10
          }}
      > 
        <div className="flex flex-col gap-y-2 mb-3">
            <span className="text-3xl font-bold" >Mission.</span>
        </div>
       <div className="w-1/2">
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
        <div className="flex w-full grid grid-cols-5 gap-5">
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