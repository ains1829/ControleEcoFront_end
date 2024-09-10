import { Breadcrumb, Button, Divider, Empty, Input, Tag, theme } from "antd";
import {
  SyncOutlined,
  PlusCircleOutlined,
  StopOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { usegetProduct } from "../../../../../api/mission/Apipublic";
import { TransformDataProduct } from "../../../../../types/mission/suivi/Product";
import { useCollecteMissionByEquipe } from "../../../../../api/equipe/Apiequipe";
import { Link, useParams } from "react-router-dom";
import { TransformdataCollecte } from "../../../../../types/mission/suivi/Collecte";
import { useCollecteFinished } from "../../../../../api/mission/Apiordremission";
import { Jsoncollecte } from "../../../../../api/json/mission/jsoncollecte";
import Tableppn from "./Tableppn";
import Feedback from "./Feedback";
export interface InputGroup {
  id: number;
  nameproduct: string;
  unite: string;
  inputs: string[];
}
function CollecteMission() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const product = usegetProduct();
  const [inputGroups, setInputGroups] = useState<InputGroup[]>([]);
  const { id } = useParams();
  const collect = useCollecteMissionByEquipe(Number(id));
  const finished_collect = useCollecteFinished();
  useEffect(() => {
    if (product.isSuccess) {
      const data_product = TransformDataProduct(product?.data);
      const donne = data_product.map((item) => ({
        id: item.idproduct,
        nameproduct: item.nameproduct,
        unite: item.unite,
        inputs: [""],
      }));
      setInputGroups(donne);
    }
  }, [product.isSuccess, product.data]);
  let collecte_object = null;
  if (collect.isSuccess) {
    collecte_object = TransformdataCollecte(collect.data);
  }
  const handleAddInput = (groupId: number) => {
    setInputGroups(
      inputGroups.map(group =>
        group.id === groupId
          ? { ...group, inputs: [...group.inputs, ''] }
          : group
      )
    );
  };

  const handleRemoveInput = (groupId: number, index: number) => {
    setInputGroups(
      inputGroups.map(group =>
        group.id === groupId
          ? { ...group, inputs: group.inputs.filter((_, i) => i !== index) }
          : group
      )
    );
  };

  const handleInputChange = (groupId: number, index: number, value: string) => {
    setInputGroups(
      inputGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              inputs: group.inputs.map((input, i) =>
                i === index ? value : input
              ),
            }
          : group
      )
    );
  };
  const handleSumbit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   const dataToSend : Jsoncollecte[] =  inputGroups.map(group => ({
      id: group.id,
      prix: group.inputs
   }));
    let idordermission = collecte_object?.ordermission.idordermission;
    if (idordermission !== undefined) {
      console.log(dataToSend)
      var reponse = await finished_collect.mutateAsync({ idordermission, data: dataToSend });
      console.log(reponse);
    } else {
      console.log('idordermission undefined');
    }
  }
  const role = localStorage.getItem('role');
  let url = "";
  if (role === 'DR' || role == 'DT') {
    url = "/suivimission_dr_dt"
  } else {
    url = "/suivimission";
  }
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: <Link to={`${url}`}>Suivi de mission</Link> }, { title: 'Collecte economique' }]} />
      <div
        className="flex flex-col gap-y-2 font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold"> COLLECTE ECONOMIQUE</span>
              <div className="flex">
                <span className="bg-blue-400 p-1 text-xs text-white rounded-full mr-4"># Collecte</span> 
                {
                  collecte_object?.statu === 200 ? 
                  <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">
                    Terminer
                  </Tag> :
                  <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                    En cours
                  </Tag> 
                }
              </div>
            </div>
            <Divider dashed />
            <div className="flex flex-col gap-y-4">
              <div>
                <strong>OM : </strong>
                <a href="Https://Ordredemission.com" className="ml-1"> <span style={{color:'blue'}}>Ordredemission.com</span></a>
              </div>
              <div>
                <strong>District : </strong>
                <span>{ collecte_object?.ordermission.nomdistrict }</span>
              </div>
              <div>
                <strong>Debut de la mission : </strong>
                <span>{ collecte_object?.ordermission.debut.toString() }</span>
              </div>
              <div>
                <strong>Fin de la mission : </strong>
                <span>
                  { collecte_object?.ordermission.fin != null ? collecte_object?.ordermission.fin.toString() : 'en cours' }
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="mb-1">Contexte</strong>
                <span>{ collecte_object?.ordermission.context }</span> 
              </div>
            </div>
            <Divider dashed />
            {
              collecte_object?.statu === 200 ? <Tableppn /> :
                (role === 'DR' || role === 'DT') ? <>
                  <strong>Ppn en cours de collecte</strong>
                  <Empty />
                </> :
              <form onSubmit={handleSumbit}>
                <div className="flex flex-col gap-y-4">
                    {inputGroups.map((group) => (
                      <div key={group.id} className="flex flex-col gap-y-1">
                        <span className="font-bold text-xs">{group.nameproduct.toUpperCase()}</span>
                        {group.inputs.map((input, index) => (
                          <div key={index} className="flex items-center gap-x-2">
                            <Input
                              id="prix"
                              type="text"
                              size="large"
                              placeholder={`prix en ${group.unite}`}
                              className="font-sans"
                              value={input}
                              onChange={(e) =>
                                handleInputChange(group.id, index, e.target.value)
                              }
                              required
                            />
                            <Button
                              icon={<StopOutlined />}
                              type="dashed"
                              onClick={() => handleRemoveInput(group.id, index)}
                            >
                              Minus
                            </Button>
                          </div>
                        ))}
                        <div>
                          <Button
                            icon={<PlusCircleOutlined />}
                            type="dashed"
                            onClick={() => handleAddInput(group.id)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Button loading={finished_collect.isPending} htmlType="submit" type="dashed" className="font-sans bg-secondary text-white text-xs p-4">Valider</Button>
                    </div>
                </div>
              </form>
            }
            <Divider dashed />
            {
              role === 'CH' ? '' :
                <Feedback idordermission={Number(id)} />
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default CollecteMission