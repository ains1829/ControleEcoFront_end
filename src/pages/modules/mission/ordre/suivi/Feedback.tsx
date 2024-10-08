import { Empty } from "antd";
import { usegetFeedback } from "../../../../../api/mission/Api";
import { useNavigate } from "react-router-dom";

function Feedback({ idordermission }: { idordermission: number }) {
  const navigate = useNavigate();
  const feedback = usegetFeedback(idordermission,navigate);
  if (feedback.isPending) {
    return <>loading...</>
  }
  if (feedback.isError) {
    return <>error...</>
  }
  console.log(feedback.data);
  return (
    <>
      <div>
        <div className="mb-2">
          <strong>Feedback</strong>
        </div>
        {feedback.data.length === 0 ? <Empty /> : 
          <div className="flex flex-col gap-y-5">
            {
              feedback.data.map((item : any) => (
                <div className="flex flex-col gap-y-1 border-b-2 p-1 border-dotted">
                  <span className="font-bold">Tel : {item.telephone }</span>
                  <span>{item.feedback}</span>
                </div>
              ))
            }
          </div>
        }
      </div>
    </>
  )
}
export default Feedback;