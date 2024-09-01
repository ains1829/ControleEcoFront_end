import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { theme } from 'antd';
function Calendar() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
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
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Event 1', date: '2024-08-25' },
          { title: 'Event 2', date: '2024-08-26' },
        ]}
      />
    </div>
  )
}
export default Calendar;