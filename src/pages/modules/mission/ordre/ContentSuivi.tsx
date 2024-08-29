import { Button, Divider, Modal, Segmented, theme } from "antd";
import SuiviMission from "./suivi/SuiviMission";
import {useState } from "react";
import { usegetOrdermissionByEquipe, useStatMissionByEquipe, useStatTypeMissionByEquipe } from "../../../../api/equipe/Apiequipe";
import { TransformDataContent } from "../../../../types/mission/Contentdata";
import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function ContentSuivi() {

  const [selectedButton, selectedFetch] = useState('0');
  const suivi_mission = usegetOrdermissionByEquipe();
  const dashboard_mission = useStatMissionByEquipe();
  const type_mission_dashboard = useStatTypeMissionByEquipe();
  const [open, setOpen] = useState(false);
   const [calendarKey, setCalendarKey] = useState(0);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  if (dashboard_mission.isPending) {
    return <span>loading...</span>
  }
  if (dashboard_mission.isError) {
    return <span>Errorr....</span>
  }
  if (type_mission_dashboard.isPending) {
    return <span>loading...</span>
  }
  if (type_mission_dashboard.isError) {
    return <span>errorrr...</span>
  }
  const mission_stat = dashboard_mission.data;
  const typemission_stat = type_mission_dashboard.data;
  const data_mission = TransformDataContent(suivi_mission.data);
  const handleClick = (name:string) =>{
    selectedFetch(name)
  }
  const handleDateClick = (arg:any) => {
    alert('Date clicked: ' + arg.dateStr);
  };
  const handleOpenModal = () => {
    setCalendarKey(calendarKey + 1); // Change key to force re-render
    setOpen(true);
  };

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
              <span className="text-3xl font-bold" >Mission.</span>
            <span className="font-bold text-sm">{mission_stat?.total_missions } total</span>
          </div>
          <div className="w-1/3 grid grid-cols-2 divide-x">
            <div className="flex flex-col gap-y-1 p-1 justify-center flex-end items-center">
              <span className="text-4xl font-bold">{mission_stat?.missions_fini }</span>
              <span className="text-xs text-xs text-gray-400">Mission terminer</span>
            </div>
           <div className="flex flex-col gap-y-1 p-1 justify-center flex-end items-center">
              <span className="text-4xl font-bold">{mission_stat?.missions_en_cours }</span>
              <span className="text-xs text-gray-400">Mission en cours</span>
            </div>
          </div>
          <div className="w-1/4 grid grid-cols-3 divide-x">
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{typemission_stat[0]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">enquete</span> 
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{typemission_stat[1]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">collecte </span> 
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <span className="font-bold text-4xl">{typemission_stat[2]?.nombre_mission }</span>
              <span className="text-xs text-gray-400">autre suivi</span> 
            </div>
          </div>
        </div>
        <Divider dashed />
       <div className="w-1/2" style={{marginLeft : 'auto' , marginRight:'auto'}}>
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
        <div className="flex w-full grid grid-cols-5 gap-5">
          {
            data_mission.mission.map((item, index) => (
              <SuiviMission key={index}  data={item}/>
            ))
          }
        </div>
        <div>
          <Button type="primary" onClick={handleOpenModal}>
            Open Modal of 1000px width
          </Button>
          <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div>
          <h1>Calendar</h1>
              <FullCalendar
                key={calendarKey}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
              { title: 'Event 1', date: '2024-08-25' },
              { title: 'Event 2', date: '2024-08-26' },
            ]}
            dateClick={handleDateClick}
          />
        </div>
      </Modal>
        </div>
      </div>
    </>
  )
}
export default ContentSuivi