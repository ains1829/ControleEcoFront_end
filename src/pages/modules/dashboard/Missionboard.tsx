import { DatePicker, DatePickerProps, Divider, theme } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  DashboardOutlined
} from '@ant-design/icons';
export function Missionboard() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};
  return (
    <>
      <div
          className="flex flex-col  font-sans"
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop:10
          }}
      > 
        <div className="flex justify-between">
          <span className="text-sm font-bold">DASHBOARD</span>
          <DatePicker onChange={onChange} picker="year" />
        </div>
        <Divider dashed />
        <div className="font-sans mb-5 grid grid-cols-3">
            <div className="items-center">
              <span className="text-sm font-bold" >Total OM : </span> <span className="font-bold text-2xl ml-5">30</span>
            </div>
            <div>
              <span className="text-sm font-bold">valide : </span> <span className="font-bold text-2xl ml-5">7</span>
            </div>
            <div>
              <span className="text-sm font-bold">Non valide : </span> <span className="font-bold text-2xl ml-5">23</span>
            </div>
        </div>
        <Divider dashed/>
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-xl ">
              <div>
                <span className="text-blue-800 font-bold bg-white shadow-xl p-2 text-xs rounded-full"> <DashboardOutlined /> Mission en cours</span>
              </div>
              <span className="text-blue-800 mt-6 text-3xl font-bold">500</span>
            </div>
            <div className="flex flex-col bg-green-100 p-4 rounded-xl ">
              <div>
                <span className="text-green-400 font-bold  bg-white rounded-full shadow-xl p-2 text-xs"> <CheckCircleOutlined /> Mission Fini</span>
              </div>
              <span className="mt-6 text-3xl text-green-400 font-bold">100</span>
            </div>
            <div className="flex flex-col p-4 bg-red-100 rounded-xl">
              <div>
                <span className="text-red-500 font-bold bg-white shadow-xl p-2 text-xs rounded-full"><ClockCircleOutlined /> Infraction</span>
              </div>
              <span className="mt-6 text-red-500 text-3xl font-bold">400</span>
            </div>
            <div className="flex flex-col p-4 bg-blue-100 rounded-xl">
              <div>
                <span className="text-blue-800 font-bold bg-white shadow-xl p-2 text-xs rounded-full"> <DashboardOutlined /> Clean</span>
              </div>
              <span className="mt-6 text-blue-800 text-3xl font-bold">500</span>
            </div>
          </div>
        </div>
      </div>
      <div
          className="flex flex-col  font-sans"
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop:10
          }}
      > 
        mada
        </div>
    </>
  )
}