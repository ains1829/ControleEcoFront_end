import Tableregion from "./Tableregion";

function EnqueteStat({date,data , infraction , conforme} : {date:number,data:any , infraction:any , conforme:any}) {
  return (
    <div className="flex flex-col gap-y-7 font-sans">
      <div className="grid grid-cols-4 gap-8">
        <div className="flex justify-between items-center border-b-2 ">
          <span>Mission en cours</span>
          <span className="text-2xl">{data.mission_pending }</span>
        </div>
        <div className="flex justify-between items-center border-b-2 ">
          <span>Mission achevé</span>
          <span className="text-2xl">{data.mission_finished }</span>
        </div>
        <div className="flex justify-between items-center border-b-2 text-red-500">
          <span>Mission avec infraction</span>
          <span className="text-2xl">{infraction }</span>
        </div>
        <div className="flex justify-between items-center border-b-2 text-blue-500">
          <span>Mission conforme</span>
          <span className="text-2xl">{ conforme}</span>
        </div>
      </div>
      <div>
        <Tableregion date={date} />
      </div>
    </div>
  )
}
export default EnqueteStat;