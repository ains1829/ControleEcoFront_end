import {useState } from "react";
import { usegetSocieteglobal } from "../../../../api/mission/Api";
import { TransformdataSociete } from "../../../../types/societe/SocieteData";
import C_societe from "../C_societe";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
function ResulFilter({ region, search, isfilter, datebegin, date_end }: { region: number,  search: string, isfilter: boolean, datebegin: string, date_end: string }) {
  const [page, setPage] = useState(0);
  const societe = usegetSocieteglobal(region, page, search, isfilter, datebegin, date_end);
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
    </>
  )
}
export default ResulFilter