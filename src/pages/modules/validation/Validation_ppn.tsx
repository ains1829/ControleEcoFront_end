import {Divider, theme } from "antd";
import TableValidation from "./components/Tablevalidation";
function Validation_ppn() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
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
        <div className="flex flex-col gap-y-1">
          <span className="text-xl font-bold">Resultat collecte.</span>
          <span>Les résultats des collectes doivent être validés avant d'apparaître sur le tableau de bord</span>
        </div>
        <Divider dashed />
        <TableValidation/>
      </div>
    </>
  )
}
export default Validation_ppn;