import { useParams } from "react-router-dom";
import { Breadcrumb, theme } from "antd";

function Signaladmin() {
  const { id, date } = useParams();
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  console.log(date);
  console.log(id)
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: 'Signal' } , { title: 'Analamanga (2024)' }]} />
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="flex flex-col gap-y-5">
        {/* <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent />
        <SignalComponent /> */}
        </div>
      </div>
    </>
  )
}
export default Signaladmin;