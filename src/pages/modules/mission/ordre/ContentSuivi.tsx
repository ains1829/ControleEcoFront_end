import { Button, Divider, Modal, Progress, Segmented, theme } from "antd";
import SuiviMission from "./suivi/SuiviMission";
import {useState } from "react";
import { usegetOrdermissionByEquipe, useStatMissionByEquipe, useStatTypeMissionByEquipe } from "../../../../api/equipe/Apiequipe";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import {
  LeftOutlined,
  RightOutlined,TeamOutlined
} from '@ant-design/icons';
import Myequipe from "../../administration/Myequipe";
import { useNavigate } from "react-router-dom";
function ContentSuivi() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdermissionByEquipe(page , Number(selectedButton),navigate);
  // const dashboard_mission = useStatMissionByEquipe(navigate);
  const type_mission_dashboard = useStatTypeMissionByEquipe(navigate);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  if (type_mission_dashboard.isPending) {
    return <span>loading...</span>
  }
  if (type_mission_dashboard.isError) {
    return <span>errorrr...</span>
  }
  // const mission_stat = dashboard_mission.data;
  const typemission_stat = type_mission_dashboard.data;
  const data_mission = TransformDataContent(suivi_mission.data);
  const handleClick = (name:string) =>{
    selectedFetch(name)
  }
  const handleNext = () => {
    if (data_mission.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (data_mission.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = true;
  let ClassNamePrevious =true;
  if (data_mission.hasnext) {
    classNameNext = false
  }
  if (data_mission.hasprevious) {
    ClassNamePrevious = false
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
        <div className="flex justify-between font-sans items-center">
          <div className="flex flex-col gap-y-2">
            <span className="text-xl font-bold" >Mission.</span>
            <span className="font-bold text-sm">({typemission_stat[0].nombre_mission  + typemission_stat[1].nombre_mission + typemission_stat[2].nombre_mission} total)</span>
          </div>
          {/* <div className="w-1/3 grid grid-cols-2 gap-x-5">
              <div className="flex p-1 justify-evenly gap-2 text-white bg-green-400 items-center rounded-full font-bold text-xs">
                <span>Mission terminé </span>
                <span className="text-xl">{mission_stat?.missions_fini }</span>
              </div>
              <div className="flex p-1 justify-evenly gap-2 text-white bg-orange-300 items-center rounded-full font-bold text-xs">
                <span>Mission en cours</span>
                <span className="text-xl">{mission_stat?.missions_en_cours }</span>
              </div>
            </div> */}
          </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Enquete</span>
              <span>{typemission_stat[0].nombre_mission} total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={typemission_stat[0].progressing} size="default" strokeColor={'rgb(23, 155, 174)'} />
            </div>
          </div>
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Collecte economique</span>
              <span>{typemission_stat[1].nombre_mission}  total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={typemission_stat[1].progressing}  size="default" strokeColor={'rgb(65, 88, 166)'} />
            </div>
          </div>
          <div className="flex flex-col gap-y-8 font-sans rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center">
              <span className="font-bold">Autre suivi</span>
              <span>{typemission_stat[2].nombre_mission} total</span>
            </div>
            <div className="flex flex-col justify-between">
              <span>Progression</span>
              <Progress type="line" className="font-sans" percent={typemission_stat[2].progressing} size="default" strokeColor={'rgb(255, 131, 67)'} />
            </div>
          </div>
        </div>
        <Divider dashed />
        <div className="flex flex-col font-sans">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold" >Tickets.</span>
            <Button onClick={()=>setOpen(true)} icon={<TeamOutlined/>} type="dashed" className="font-sans text-xs">Mon equipe</Button>
          </div>
          <div className="flex items-center justify-between mt-3">
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
                      marginBottom: '1rem'
                    }}
                  />
            </div>
            <div className="flex gap-2">
            <Button size="small" className="font-sans text-xs" disabled={ClassNamePrevious} type="dashed" icon={<LeftOutlined />} onClick={handlePrevious}>Previous</Button>
            <Button size="small" className="font-sans text-xs" disabled={classNameNext} type="dashed" icon={<RightOutlined/>} onClick={handleNext} >Next</Button>
          </div>
          </div>
        </div>
        <div className="flex w-full grid grid-cols-4 gap-5">
          {
            data_mission.mission.map((item, index) => (
              <SuiviMission key={index}  data={item}/>
            ))
          }
        </div>
      </div>
      <Modal
        title={<div className="font-sans text-secondary"> Equipe <Divider className="font-sans" dashed ></Divider> </div>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={(_) => (
          <></>
        )}
      >
        <Myequipe />
      </Modal>
    </>
  )
}
export default ContentSuivi