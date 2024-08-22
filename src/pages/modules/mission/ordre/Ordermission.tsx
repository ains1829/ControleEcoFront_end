import { Breadcrumb, Button, Empty, Segmented, Space, theme } from "antd"
import Mission from "./Mission";
import { usegetOrdermission, usegetOrdermissionNonValider, usegetOrdermissionValider } from "../../../../api/mission/Api";
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
  else{
    mission_all = usegetOrdermissionNonValider();
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
          <div>
            <Segmented
        className="font-sans"
        options={[
          { label: 'All', value: '0' },
          { label: 'Valider', value: '1' },
          { label: 'Non Valider', value: '2' }
        ]}
        value={selectedButton}
        onChange={handleClick}
        block
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem'
        }}
      />
          </div>
        {
          contendata.mission.length === 0 && <Empty />
        }

        <div className="flex bg-gray-100 gap-4 p-5  mb-1 font-bold rounded-lg shadow-md">
          <div className="flex-none w-1/4">Demande</div>
          <div className="flex-none w-1/4">Date</div>
          <div className="flex-none w-1/4">Status</div>
          <div className="w-1/4">Action</div>
        </div>
        {contendata.mission.map((item, index) => (
          <Mission key={index} data={item} />
        ))}
      </div>
    </>
  )
}
export default Ordermission