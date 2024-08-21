import { Breadcrumb, Button, Space, theme } from "antd";
import SuiviMission from "./suivi/SuiviMission";
import { useState } from "react";
import { usegetOrdermissionByEquipe } from "../../../../api/equipe/Apiequipe";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
function ContentSuivi() {
  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdermissionByEquipe();
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
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: 'Suivi de mission'  }]} />
        <div
          className="flex flex-col gap-y-2 font-sans"
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
      > 
        <Space>
          <div className="flex gap-x-5 mb-3">
            <Button className={`font-sans ${selectedButton === '0' ? 'bg-blue-300 text-white' : ''}`} type="dashed" onClick={()=>handleClick('0')}>Tous</Button>
            <Button className={`font-sans ${selectedButton === '1' ? 'bg-blue-300 text-white' : ''}`} type="dashed" onClick={()=>handleClick('1')}>Fini</Button>
            <Button className={`font-sans ${selectedButton === '2' ? 'bg-blue-300 text-white' : ''}`} type="dashed" onClick={()=>handleClick('2')} >En cours</Button>
          </div>
        </Space>
        <div className="flex w-full grid grid-cols-5 gap-8">
          {
            data_mission.mission.map((item, index) => (
              <SuiviMission key={index}  data={item}/>
            ))
          }
          </div>
        </div>
    </>
  )
}
export default ContentSuivi