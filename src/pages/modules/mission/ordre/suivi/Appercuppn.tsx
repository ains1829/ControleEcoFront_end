import { Divider, Table, TableColumnsType } from "antd";
import { InputGroup } from "./CollecteMission"

function Appercuppn({ data }: { data: InputGroup[] }) {
const transformData = (inputGroup: InputGroup) => { 
  const transformed = inputGroup.inputs.map((input, index) => ({
    key: `${inputGroup.id}-${index}`,
    nameproduct: inputGroup.nameproduct,
    unite : inputGroup.unite,
    price: input,
    observation: inputGroup.observations[index]
  }));
  return transformed;
};
interface TransformedData {
  key: string;
  nameproduct: string;
  unite: string;
  price: string;
  observation: string;
}

  const tableData:TransformedData[] = data.flatMap(transformData);
  const columns:TableColumnsType<TransformedData> = [
  {
    title: <span className="font-sans">Produit</span> ,
    dataIndex: 'nameproduct',
    key: 'nameproduct',
    render: (text) => <span className="font-sans">{text}</span>
  },
  {
    title: <span className="font-sans">Prix</span> ,
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => <span className="font-sans">{record.price} / {record.unite}</span>
  },
  {
    title: <span className="font-sans">Lieu de la collecte</span>,
    dataIndex: 'observation',
    key: 'observation',
    render: (text) => <span className="font-sans">{text}</span>
  }
];
  return (
    <>
      <div className="flex flex-col gap-y-5 font-sans">
        <div className="flex flex-col gap-y-2">
          <span className="font-bold">Aperçu des données </span>
          <span className="text-xs">Veuillez bien vérifier les données avant de les valider afin d'assurer leur exactitude.</span>
        </div>
      </div>
        <Divider dashed />
        <Table columns={columns} dataSource={tableData} pagination={false} />
    </>
  )
}
export default Appercuppn