import { Divider } from "antd"
import TableComponent from "./table/TableComponent"
import { Ordredemission } from "../../../../types/mission/Ordredemission"

function DetailMission({data} : {data:Ordredemission}) {
  return (
    <>
      <div className="flex flex-col gap-y-4 detail font-sans">
        <div>
          <span>Ref : </span>
          <span className="font-bold text-xs">{data.numeroserie }</span>
        </div>
        <div>
          <span>L'origine de la demande : </span>
          <span>{ data.sender }<span className="text-xs">({data.profil})</span> </span>
        </div>
        <div>
          <span>Type de mission : </span>
          <span>{data.nametymission }</span>
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