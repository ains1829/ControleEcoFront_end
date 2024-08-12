import { Divider } from "antd"
import TableComponent from "./table/TableComponent"

function DetailMission() {
  return (
    <>
      <div className="flex flex-col gap-y-4 detail font-sans">
        <div>
          <strong>L'origine de la demande : </strong>
          <span>  RAKOTONAVALONA Andy <span className="text-xs">(Direction Regional)</span> </span>
        </div>
        <div>
          <strong>Type de mission : </strong>
          <span> DESCENTE</span>
        </div>
        <div>
          <strong>Region : </strong>
          <span>Analamanga</span>
        </div>
        <div>
          <strong>Societe cible : </strong>
          <span> MAGASIN-U (Analakely-101) </span>
        </div>
        <div>
          <strong>Context : </strong>
          <span className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus perspiciatis quasi, vitae aspernatur exercitationem, veritatis obcaecati quia quo doloremque esse reprehenderit debitis aperiam, ipsum accusamus ipsa qui totam repellendus facere.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime alias omnis error. Doloremque officiis a quidem quibusdam ut impedit aliquam, quas eligendi maiores harum alias explicabo, sint facere. Eum.
          </span>
        </div>
      </div>
      <Divider dashed style={{ borderColor: 'var(--blue)' }} className="font-sans"> <span className="text-xs">Equipe en mission</span></Divider>
      <TableComponent />
    </>
  )
}
export default DetailMission