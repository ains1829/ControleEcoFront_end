import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction';
import { theme } from 'antd';
import { usegetOrdremissionByDrDt } from '../../../../api/equipe/ApiDr_dt';
import { TransformDataContent } from '../../../../types/mission/Contentdata';
function Calendar() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
   const suivi_mission = usegetOrdremissionByDrDt();
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  const data_mission = TransformDataContent(suivi_mission.data);
  const missions = data_mission.mission;
  const events : any[] = [];
  missions.forEach(mission => {
    let title;
    let color;
  if (mission.typemission === 1) {
    title = 'Descente';
    color=  'red';
  } else if (mission.typemission === 2) {
    title = 'Collecte économique';
    color=  '#00ff00';
  } else if (mission.typemission === 3) {
    title = 'Autre suivi';
    color= 'bg-orange-500'
  }
    events.push({ title: title, start: mission.dateordre , end : '2024-09-02', backgroundColor:color });
  });
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
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin , interactionPlugin]}
        initialView="listMonth"
        events={events}
        
      />
    </div>
  )
}
export default Calendar;