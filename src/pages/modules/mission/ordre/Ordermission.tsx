import {Empty, Segmented, theme } from "antd"
import Mission from "./Mission";
import { usegetOrdermission} from "../../../../api/mission/Api";
import {TransformDataContent } from "../../../../types/mission/Contentdata";
import {  useState } from "react";
import { useOMvalidation } from "../../../../api/dashboard/Statistique";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import Search, { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
function Ordermission() {
  const navigate = useNavigate();
  const [selectedButton, selectedFetch] = useState('0');
  const om_validation = useOMvalidation(navigate);
  const [page, setPage] = useState(0);
  const [search,setSearch] = useState('')
  let mission_all = usegetOrdermission(page , Number(selectedButton),search,navigate);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  if (mission_all?.isPending) {
    return<>loading...</>
  }
  if (mission_all?.isError) {
    return<>Error</>
  }
  if (om_validation.isPending) {
    return <>loading...</>
  }
  if (om_validation.isError) {
    return <>error...</>
  }
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    if (value.trim().length === 0) {
      setSearch('')
    } else {
      setPage(0);
      setSearch(value);
    }
  };
  const contendata = TransformDataContent(mission_all?.data)
  console.log(contendata)
  const data_om = om_validation.data;
  const handleClick = (name: string) => {
    setPage(0)
    selectedFetch(name)
  }
  const handleNext = () => {
    if (mission_all?.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (mission_all?.data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (mission_all?.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (mission_all?.data.hasprevious) {
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
          <span className="text-xl font-bold">Ordres de mission.</span>
          <div className="w-1/3">
            <Search placeholder="Rechercher dans les demandes" allowClear onSearch={onSearch} style={{ fontFamily:'font-sans'}} className="font-sans"/>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 mt-5">
          <div className="w-full">
            <Segmented
              className="font-sans p-1 custom-segmented"
              options={[
                { label: <span>Tous ({data_om.total})</span> , value: '0' },
                { label: <span>Approuvés ({data_om.valider})</span>, value: '1' },
                { label: <span>En attente ({data_om.non_valider + data_om.attente_dg})</span>, value: '2' },
                { label: <span>Rejetés({data_om.supprimer}) </span>, value: '3' },
              ]}
              value={selectedButton}
              onChange={handleClick}
              block
              style={{
                display: 'flex',
                gap: '1rem',
                background: 'transparent',
                
              }}
              
            />
          </div>
        </div>
        {
          contendata.mission.length === 0 ? <Empty /> :
          <div className="mt-3">
            <div className="flex mb-2 p-3 gap-4">
              <div className="flex-none w-1/4 text-gray-500 font-bold">Demande</div>
              <div className="flex-none w-1/4 text-gray-500 font-bold">Date</div>
              <div className="flex-none w-1/4 text-gray-500 font-bold">Status</div>
              <div className="flex-none w-1/4 text-gray-500 font-bold">Action</div>
            </div>
            {contendata.mission.map((item, index) => (
              <Mission key={index} data={item} />
            ))}
          </div>
        }
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
            <span className="text-xs text-gray-500 font-bold">Page {mission_all?.data.page + 1} de {mission_all?.data.nombrepage}</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default Ordermission