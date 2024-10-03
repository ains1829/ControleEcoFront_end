import {theme } from "antd";
import { usegetSocietebyregion } from "../../../api/mission/Api";
import C_societe from "./C_societe";
import Search, { SearchProps } from "antd/es/input/Search";
import { TransformdataSociete } from "../../../types/societe/SocieteData";
import { useState } from "react";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
function Societe() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const societe = usegetSocietebyregion(page , search,navigate);
  if (societe.isPending) {
    return <>loading....</>
  }
  if (societe.isError) {
    return <>error...</>
  }
  const data_societe = TransformdataSociete(societe.data.data)
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    setPage(0)
    setSearch(value)
  };
  const handleNext = () => {
    if (societe.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (societe.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (societe.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (societe.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
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
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold" >Societe.</span>
          <Search placeholder="Recherche" allowClear onSearch={onSearch} className="w-1/4 font-sans" />
        </div>
        <C_societe data={data_societe} />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className={`${ClassNamePrevious} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handlePrevious}>
              <LeftOutlined />
              <span>
                Previous
              </span>
            </div>
            <div className={`${classNameNext} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handleNext}>
              <span>
                Next
              </span>
              <RightOutlined/>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold">Page {societe.data.page + 1} de {societe.data.nombrepage}</span>
          </div>
        </div>
    </div>
    </>
  )
}
export default Societe;