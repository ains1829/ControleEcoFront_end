import { Breadcrumb, Button, Empty, Space, theme } from "antd"
import Mission from "./Mission";
import { usegetOrdermission, usegetOrdermissionAttente, usegetOrdermissionNonValider, usegetOrdermissionValider } from "../../../../api/mission/Api";
import {TransformDataContent } from "../../../../types/mission/Contentdata";
import {  useState } from "react";

function Ordermission() {
  const [selectedButton, selectedFetch] = useState('0');
  let mission_all;
  if (selectedButton === '0') {
    mission_all = usegetOrdermission();
  } else if (selectedButton === '1') {
    mission_all = usegetOrdermissionValider();
  }
  else if (selectedButton === '2') {
    mission_all = usegetOrdermissionNonValider();
  }
  else {
    mission_all = usegetOrdermissionAttente();
  }
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (mission_all?.isPending) {
    return<>loading...</>
  }
  if (mission_all?.isError) {
    return<>Error</>
  }
  const contendata= TransformDataContent(mission_all?.data)
  console.log(contendata)
  const handleClick = (name:string) =>{
    selectedFetch(name)
  }
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: 'Ordre de mission' }]} />
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
            <Button className={`font-sans ${selectedButton === '0' ? 'bg-secondary text-white' : ''}`} type="dashed" onClick={()=>handleClick('0')}>All</Button>
            <Button className={`font-sans ${selectedButton === '1' ? 'bg-secondary text-white' : ''}`} type="dashed" onClick={()=>handleClick('1')}>Valider</Button>
            <Button className={`font-sans ${selectedButton === '2' ? 'bg-secondary text-white' : ''}`} type="dashed" onClick={()=>handleClick('2')} >Non valider</Button>
            <Button className={`font-sans ${selectedButton === '3' ? 'bg-secondary text-white' : ''}`} type="dashed" onClick={()=>handleClick('3')}>En Attente</Button>
          </div>
        </Space>
        {
          contendata.mission.length === 0 && <Empty />
        }
        {contendata.mission.map((item, index) => (
          <Mission key={index} data={item} />
        ))}
      </div>
    </>
  )
}
export default Ordermission