import { Breadcrumb, theme } from "antd";
import { usegetSocietebyregion } from "../../../api/mission/Api";
import C_societe from "./C_societe";
import Search, { SearchProps } from "antd/es/input/Search";
import { TransformdataSociete } from "../../../types/societe/SocieteData";

function Societe() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const societe = usegetSocietebyregion();
  if (societe.isPending) {
    return <>loading....</>
  }
  if (societe.isError) {
    return <>error...</>
  }
  const data_societe = TransformdataSociete(societe.data.data)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
    <Breadcrumb className="font-sans p-2" items={[{ title: 'Liste' } , {title:'Societe'}]} />
   <div
      className="flex flex-col gap-y-2 font-sans"
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      > 
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold" >Societe.</span>
          <Search placeholder="Recherche" allowClear onSearch={onSearch} className="w-1/4 font-sans" />
        </div>
        <C_societe data={data_societe} />
    </div>
    </>
  )
}
export default Societe;