import { Breadcrumb, Button, Divider, Input, Tag, theme } from "antd";
import {
  SyncOutlined,
  PlusCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import { useState } from "react";
interface InputGroup {
  id: string;
  inputs: string[];
}
function CollecteMission() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [inputGroups, setInputGroups] = useState<InputGroup[]>([
    { id: 'riz Importer', inputs: [''] },
    { id: 'MAKALIOKA', inputs: [''] },
    { id: 'CIMENT', inputs: [''] },
    { id: 'SUCRE ROUGE', inputs: [''] },
    { id: 'HUILE EN VRAC', inputs: [''] },
  ]);

  
  const handleAddInput = (groupId: string) => {
    setInputGroups(
      inputGroups.map(group =>
        group.id === groupId
          ? { ...group, inputs: [...group.inputs, ''] }
          : group
      )
    );
  };

  const handleRemoveInput = (groupId: string, index: number) => {
    setInputGroups(
      inputGroups.map(group =>
        group.id === groupId
          ? { ...group, inputs: group.inputs.filter((_, i) => i !== index) }
          : group
      )
    );
  };

  const handleInputChange = (groupId: string, index: number, value: string) => {
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

  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: 'Suivi de mission' }, { title: 'Collecte economique' }]} />
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
                <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                  En cours
                </Tag>
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
                <span>MAROVOAY</span>
              </div>
              <div>
                <strong>Debut du mission : </strong>
                <span>20 Aout 2024</span>
              </div>
              <div>
                <strong>Fin du mission : </strong>
                <span> en cours</span>
              </div>
              <div className="flex flex-col">
                <strong className="mb-1">Context</strong>
                <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, velit, hic dolore aliquam voluptas sunt laudantium fugit obcaecati sapiente aut exercitationem animi modi repellat, eum veritatis voluptatem voluptatibus ab deleniti?</span> 
              </div>
            </div>
            <Divider dashed className="font-sans text-xs" > PPN </Divider>
            <form action="">
              <div className="flex flex-col gap-y-4">
                  {inputGroups.map((group) => (
                    <div key={group.id} className="flex flex-col gap-y-1">
                      <span className="font-bold text-xs">{group.id.toUpperCase()}</span>
                      {group.inputs.map((input, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                          <Input
                            type="text"
                            size="large"
                            placeholder="prix"
                            className="font-sans"
                            value={input}
                            onChange={(e) =>
                              handleInputChange(group.id, index, e.target.value)
                            }
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
                  <div >
                    <Button type="dashed" className="font-sans bg-secondary text-white text-xs p-4">Valider</Button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default CollecteMission