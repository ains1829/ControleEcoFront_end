import { useState } from "react";
import SignalComponent from "./SignalComponent";
import { useGetSignalbyregion } from "../../../api/dashboard/SignalementStat";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
function SignalementDetailRegion({ date }: { date: number }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const data_signal = useGetSignalbyregion(date, page,navigate);
  if (data_signal.isLoading) {
    return <>loading...</>
  }
  if (data_signal.isError) {
    return <>Error...</>
  }
  const data = data_signal.data;
  console.log(data)
  const handleNext = () => {
    if (data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (data.hasprevious) {
      setPage(page - 1)
    }
  }
  let classNameNext = true;
  let ClassNamePrevious =true;
  if (data.hasnext) {
    classNameNext = false
  }
  if (data.hasprevious) {
    ClassNamePrevious = false
  }
  return (
    <>
      <div className="bg-white p-5 mt-2 font-sans">
        <div className="flex mb-5 justify-between">
          <span className="font-bold text-xl">Liste Signalment.</span>
            <div className="flex gap-2">
              <Button size="small" className="font-sans text-xs" disabled={ClassNamePrevious} type="dashed" icon={<LeftOutlined />} onClick={handlePrevious}>Previous</Button>
              <Button size="small" className="font-sans text-xs" disabled={classNameNext} type="dashed" icon={<RightOutlined/>} onClick={handleNext} >Next</Button>
            </div>
        </div>
        <div className="flex flex-col gap-y-5">
          {
            data.data.map((element: any, index: number) => (
              <SignalComponent key={index} data={element} />
            ))
          }
        </div>
      </div>
    </>
  )
}
export default SignalementDetailRegion ;