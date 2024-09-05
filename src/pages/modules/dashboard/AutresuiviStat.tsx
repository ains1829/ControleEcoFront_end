import Tableregionstat from "./Tableregionstat";
function AutresuiviStat({date,data} : {date:number,data : any}) {
   return (
    <div className="flex flex-col gap-y-7 font-sans">
      <div className="grid grid-cols-2 gap-8" >
        <div className="flex justify-between items-center border-b-2 ">
          <span>Mission en cours</span>
          <span className="text-2xl">{data.mission_pending }</span>
        </div>
        <div className="flex justify-between items-center border-b-2 ">
          <span>Mission achevée</span>
          <span className="text-2xl">{data.mission_finished }</span>
        </div>
      </div>
      <div>
        <Tableregionstat date={date} typemission={3} />
      </div>
    </div>
  )
}
export default AutresuiviStat;