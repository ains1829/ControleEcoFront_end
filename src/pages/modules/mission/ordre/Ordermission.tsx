import { Breadcrumb, Button, Space, theme } from "antd"
import Mission from "./Mission";

function Ordermission() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <Space>
          <div className="flex gap-x-5 mb-3">
            <Button className="font-sans" type="dashed">All</Button>
            <Button className="font-sans" type="dashed">Valider</Button>
            <Button className="font-sans bg-secondary text-white" type="dashed">Non valider</Button>
            <Button className="font-sans" type="dashed">En cours</Button>
            {/* <div>
              <span>Region : </span>
              <select className="p-1 rounded-md border-dashed border-2 bg-inherit">
                <option value="0">Analamanga</option>
                <option value="1">Boeny</option>
                <option value="2">Antsirabe</option>
              </select>
            </div> */}
          </div>
        </Space>
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
        <Mission />
      </div>
    </>
  )
}
export default Ordermission