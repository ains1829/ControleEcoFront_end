import { Divider } from "antd"
import TableComponent from "./table/TableComponent"
import { Ordredemission } from "../../../../types/mission/Ordredemission"

function DetailMission({data} : {data:Ordredemission}) {let type_mission;
  if (data.typemission === 1) {
    type_mission = "DESCENTE";
  } else if (data.typemission === 2) {
    type_mission = "COLLECTE";
  } else {
    type_mission = "AUTRE SUIVI";
  }
  return (
    <>
      <div className="flex flex-col gap-y-4 detail font-sans">
        <div>
          <span>L'origine de la demande : </span>
          <span>{ data.sender }<span className="text-xs">({data.profil})</span> </span>
        </div>
        <div>
          <span>Type de mission : </span>
          <span>{type_mission }</span>
        </div>
        <div>
          <span>Date debut :  </span>
          <span>{data.debut.toString()}</span>
        </div>
        <div>
          <span>Region : </span>
          <span>{data.region} ({data.nomdistrict})</span>
        </div>
          {
            data.typemission === 1 &&
            <>
              <div>
                <span>Societe cible : </span>
                <span> {data.nomsociete} ({data.addresse}) </span>
              </div>
            </>
          }
        <div>
          <span>Context : </span>
          <span className="text">
           {data.context}
          </span>
        </div>
      </div>
      <Divider dashed className="font-sans"> <span className="text-xs">Equipe en mission</span></Divider>
      <TableComponent data={data.detailequipe} />
    </>
  )
}
export default DetailMission