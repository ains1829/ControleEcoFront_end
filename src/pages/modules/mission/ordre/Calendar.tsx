import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction';
import { Breadcrumb, Tag, theme, Tooltip } from 'antd';
import { usegetCalendar } from '../../../../api/equipe/ApiDr_dt';
import frlocal from '@fullcalendar/core/locales/fr'
import {
  SyncOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importer la locale française
dayjs.locale('fr');
import { TransFormData } from '../../../../types/mission/Ordredemission';
import { useState } from 'react';
function Calendar() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [year, setYear] = useState(Number(dayjs().format('YYYY')));
  const [date,setDate] = useState(`${dayjs().format('YYYY')}-${dayjs().format('MM')}`)
  const suivi_mission = usegetCalendar(year);
  if (suivi_mission.isPending) {
    return <span>loading...</span>
  }
  if (suivi_mission.isError) {
    return <span>error...</span>
  }
  const missions = TransFormData(suivi_mission.data);
  const events : any[] = [];
  missions.forEach(mission => {
    let title = "Ref : " + mission.numeroserie;
    let color;
    if (mission.fin !== null) {
      color = '#212E53'
    } else {
      color = '#4AA3A2'
    }
    events.push({ title: title, start: mission.dateordre , backgroundColor:color , Padding:5 , extendedProps: {
      details: <div className='font-sans flex flex-col  gap-y-2'>
        <div className='flex gap-2 items-center'>
          <span className='text-xs text-gray-700'>Equipe :</span>
          <span className='font-bold text-gray-700'>{mission.nameequipe}</span>
        </div>
        <div className='flex gap-2'>
          <span className={`p-1 text-white ${mission.colortypemission} rounded-full text-xs`}># {mission.nametymission}</span>
          {
            mission.fin !== null ? <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">Terminer  </Tag> :<Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing"> En cours </Tag> 
          }
        </div>
      </div>,
    },});
  });
  const handleClick = (info: any) => {
    const data = info.view.currentStart
    const date = data.getFullYear();
    const month = String(data.getMonth() + 1);
    setDate(`${date}-${month}`)
    setYear(date);
  }
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Calendrier' }]} />
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <span className='text-xl font-bold'>Calendrier.</span>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
            locale={frlocal}
            initialView="dayGridMonth"
            datesSet={handleClick}
            initialDate={date}
            events={events}
            eventContent={(eventInfo) => (
              <Tooltip color='white' title={eventInfo.event.extendedProps.details}>
                <div className='font-sans'>{eventInfo.event.title}</div>
              </Tooltip>
            )}
          />
        </div>
      </div>
    </>
  )
}
export default Calendar;