import { Breadcrumb, Button, Divider, Empty, Segmented, Space, theme } from "antd"
import Mission from "./Mission";
import { usegetOrdermission, usegetOrdermissionNonValider, usegetOrdermissionValider } from "../../../../api/mission/Api";
import {TransformDataContent } from "../../../../types/mission/Contentdata";
import {  useState } from "react";
import { useOMvalidation } from "../../../../api/dashboard/Statistique";

function Ordermission() {
  const [selectedButton, selectedFetch] = useState('0');
  const om_validation = useOMvalidation();
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
  if (om_validation.isPending) {
    return <>loading...</>
  }
  if (om_validation.isError) {
    return <>error...</>
  }
  const contendata = TransformDataContent(mission_all?.data)
  const data_om = om_validation.data;
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
        <div className="flex justify-between font-sans items-center mb-2">
          <div className="flex flex-col gap-y-2">
              <span className="text-3xl font-bold" >Demande OM.</span>
            <span className="font-bold text-sm">{data_om.total} total</span>
          </div>
          <div className="w-1/4 grid grid-cols-2 divide-x">
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{data_om.valider}</span>
              <span className="text-xs text-gray-400">valider</span> 
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{data_om.non_valider}</span>
              <span className="text-xs text-gray-400">non valider </span> 
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Segmented
            className="font-sans p-1"
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
            }}
          />
        </div>
        {
          contendata.mission.length === 0 && <Empty />
        }

        <div className="flex bg-gray-100 gap-4 p-5">
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