import { Empty,Button, Segmented, theme } from "antd";
import { useState } from "react";
import { usegetOrdremissionByDrDt } from "../../../../../api/equipe/ApiDr_dt";
import { TransformDataContent } from "../../../../../types/mission/Contentdata";
import SuiviMission from "./SuiviMission";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
function MissionSuiviDr({date_actuelle} : {date_actuelle:number}) {
  const [page, setPage] = useState(0);
  const [Search_ref, setRef] = useState('');
  const navigate = useNavigate();
  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdremissionByDrDt(page, date_actuelle, Search_ref,Number(selectedButton),navigate);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  const data_mission = TransformDataContent(suivi_mission.data);
  const onSearch: SearchProps['onSearch'] = (value, _e, _) => { 
    if (value.trim().length === 0) {
      setRef('')
    } else {
      setRef(value)
      setPage(0)
    }
  }
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
          <span className="text-xl font-bold" >Suivi des missions.</span>
        </div>
      <div className="flex justify-between items-center">
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
        <div className="flex items-center gap-2">
          <Search placeholder="Reference" onSearch={onSearch} style={{ width: 200 }} />
          <div className="flex gap-2">
            <Button size="small" className="font-sans text-xs" disabled={ClassNamePrevious} type="dashed" icon={<LeftOutlined />} onClick={handlePrevious}>Previous</Button>
            <Button size="small" className="font-sans text-xs" disabled={classNameNext} type="dashed" icon={<RightOutlined/>} iconPosition="end" onClick={handleNext} >Next</Button>
          </div>
          </div>
      </div>
      {
        data_mission.mission.length ===0 ? <Empty /> :
        <div className="flex w-full grid grid-cols-4 gap-5">
          {
            data_mission.mission.map((item, index) => (
              <SuiviMission key={index}  data={item}/>
            ))
          }
        </div>
      }
      </div>
  )
}
export default MissionSuiviDr;