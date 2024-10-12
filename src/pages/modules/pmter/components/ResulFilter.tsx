import {useEffect, useState } from "react";
import { usegetSocieteglobal } from "../../../../api/mission/Api";
import { TransformdataSociete } from "../../../../types/societe/SocieteData";
import C_societe from "../C_societe";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
function ResulFilter({ change_filter, region, search, isfilter, datebegin, date_end }: { change_filter:number, region: number,  search: string, isfilter: boolean, datebegin: string, date_end: string }) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const societe = usegetSocieteglobal(region, page, search, isfilter, datebegin, date_end, navigate);
  useEffect(() => {
    setPage(0);
  }, [change_filter]);
  if (societe.isPending) {
    return <>loading....</>
  }
  if (societe.isError) {
    return <>error...</>
  }
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
  const data_societe = TransformdataSociete(societe.data.data);
  return (
    <>
      <div className="flex flex-col">
        <C_societe data={data_societe} page={page} region={region} search={search} isfilter={isfilter} datebegin={datebegin} date_end={date_end} />
        <div className="flex justify-between items-center mt-5">
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
export default ResulFilter