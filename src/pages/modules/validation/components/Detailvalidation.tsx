import { Button, Divider, message, Table } from "antd";
import { columns, TransformdataDetailCollecte } from "../../mission/ordre/suivi/Tableppn";
import { CollecteData } from "./Tablevalidation";
import { useDetailCollecte } from "../../../../api/mission/Apiordremission";
import { useNavigate } from "react-router-dom";
import { useValidateResultatCollecte } from "../../../../api/auth/mutation/Mutation";

function Detailvalidation({ data , page , Close_modal }: { data: CollecteData , page:number , Close_modal : () => void }) {
  const navigate = useNavigate();
  const collecte = useDetailCollecte(data.key, navigate);
  const validate = useValidateResultatCollecte(page);
  if (collecte.isPending) {
    return <>loading...</>
  }
  if (collecte.isError) {
    return <>error...</>
  }
  const HandleValidate = async (validation: boolean) => {
    const resultat = await validate.mutateAsync({ validate: validation, id: data.key, navigate: navigate });
    if (resultat.status == 200) {
      message.success(<span className="font-sans">{resultat.object }</span> );
      Close_modal();
    } else {
      message.error(<span className="font-sans">{resultat.object }</span> );
    }
  }
  return (
    <div className="flex flex-col">
      <div className="font-sans flex text-xs flex-col gap-y-2">
        <span>Date : {data.date_collecte}</span>
        <span>Reference : {data.numero_reference}</span>
        <span>Region : {data.region} ({data.district})</span>
      </div>
      <Divider dashed />
      <Table columns={columns} dataSource={TransformdataDetailCollecte(collecte.data)}></Table>
      <div className="flex justify-end gap-2">
        <Button disabled={validate.isPending}  onClick={()=>HandleValidate(true)} className="font-sans text-xs" type="dashed">Valider</Button>
        <Button disabled={validate.isPending} onClick={()=>HandleValidate(false)} className="font-sans text-xs" type="dashed">Rejeter</Button>
      </div>
    </div>
  )
}
export default Detailvalidation;