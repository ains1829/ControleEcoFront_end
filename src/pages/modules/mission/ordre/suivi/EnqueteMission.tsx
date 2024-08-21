import { Breadcrumb, Button, Divider, Drawer, Space, Steps, Tag, theme } from "antd";
import {
  SyncOutlined,
  ArrowRightOutlined,
  CalendarOutlined,SendOutlined
} from '@ant-design/icons';
import { useState } from "react";
import UploadComponent from "./upload/UploadComponent";
import { Image } from 'antd';
import { Link, useParams } from "react-router-dom";
function EnqueteMission() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  console.log(id);
  return (
    <>
      <Breadcrumb className="font-sans p-2" items={[{ title: 'Mission' }, { title: <Link to={'/suivimission'}>Suivi de mission</Link>  } , {title:'Descente'}]} />
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
              <span className="text-xl font-bold"> AINS MADAGASCAR</span>
              <div className="flex">
                <span className="bg-green-400 p-1 text-xs text-white rounded-full mr-4"># Descente</span> 
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
                <strong>Resultat :  </strong>
                <span className="ml-1"> en cours</span>
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
          </div>
          <Divider dashed/>
          <div className="mb-5"><strong>Etape du mission</strong></div>
            <Steps
              direction="vertical"
              current={1}
              className="font-sans"
              items={[
                {
                  title: <span className="text-sm">Fiche Technique</span>,
                  description : <span className="text-sm">Terminer le 20 Aout 2024</span>,
                },
                {
                  title: <span className="text-sm">Convocation</span>,
                  description : 'en cours',
                },
                {
                  title: <span className="text-sm">PV Audition</span>,
                  description : 'en cours',
                },
                {
                  title: <span className="text-sm">PV Infraction</span>,
                  description : 'en cours',
                },
              ]}
          />
        <Space>
          <Button className="font-sans" type="dashed" onClick={()=>setOpen(true)}>
            Consulter <ArrowRightOutlined />
          </Button>
        </Space>
          <Divider dashed />
          <div>
            <div className="mb-2">
              <strong>Feed-back</strong>
            </div>
            <div className="flex flex-col gap-y-3 ">
              <div className="flex flex-col p-2 gap-y-2 border-dotted border-2 border-gray-200 rounded-lg">
                <span className="date text-blue-500"> <SendOutlined /> Envoye le : 20 aout 2024 </span>
                <span><strong>Context : </strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, enim perferendis explicabo debitis officiis, sed veritatis vel minima aliquam architecto culpa? Consectetur autem aliquid laborum illo dolores, quaerat explicabo ea!</span>
                <strong>Photo</strong>
                <div>
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                  
                  >
                    <Image width={100} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                    <Image
                      width={100}
                      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    />
                  </Image.PreviewGroup>
                </div>
              </div>
              <div className="flex flex-col p-2 gap-y-2 border-dotted border-2 border-gray-200 rounded-lg">
                <span className="date text-blue-500"> <SendOutlined /> Envoye le : 20 aout 2024 </span>
                <span><strong>Context : </strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, enim perferendis explicabo debitis officiis, sed veritatis vel minima aliquam architecto culpa? Consectetur autem aliquid laborum illo dolores, quaerat explicabo ea!</span>
              </div>
            </div>
          </div>
        </div>
      <Drawer
        title={`Detail Mission`}
        placement="right"
        size={"large"}
        onClose={onClose}
        open={open}
        className="font-sans"
        extra={
          <Space>
            <Button type="dashed" onClick={onClose}>
              CLOTURER
            </Button>
          </Space>
        }
      >
          <div className="flex flex-col gap-y-2">
          <div>
            <strong>NB : </strong>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quae deserunt repudiandae non mollitia</span>
          </div>
          <div className="flex flex-col gap-y-1 border-dotted border-2 border-gray-200 p-3 rounded-lg">
            <span className="font-bold mb-3">Fiche technique</span>
            <div className=""><CalendarOutlined /> <span className="ml-1">Date : 20 Aout 2024</span></div>
            <span>url : <a href="https://chatgpt.com" className="text-xs" style={{color:'blue'}}>Fiche_technique.pdf</a> </span>
            <UploadComponent />
            </div>
            <div className="flex flex-col gap-y-1 border-dotted border-2 border-gray-200 p-3 rounded-lg">
            <span className="font-bold mb-3">Convocation</span>
            <div className=""><CalendarOutlined /> <span className="ml-1">Date : En cours</span></div>
            <span>url : <a className="text-xs" >En cours</a> </span>
            <UploadComponent />
            </div>
            <div className="flex flex-col gap-y-1 border-dotted border-2 border-gray-200 p-3 rounded-lg">
            <span className="font-bold mb-3">PV Audition</span>
            <div className=""><CalendarOutlined /> <span className="ml-1">Date : En cours</span></div>
            <span>url : <a className="text-xs" >En cours</a> </span>
            <UploadComponent />
            </div>
            <div className="flex flex-col gap-y-1 border-dotted border-2 border-gray-200 p-3 rounded-lg">
            <span className="font-bold mb-3">PV Infraction</span>
            <div className=""><CalendarOutlined /> <span className="ml-1">Date : En cours</span></div>
            <span>url : <a className="text-xs" >En cours</a> </span>
            <UploadComponent />
          </div>
        </div>
      </Drawer>
      </div>
    </>
  )
}
export default EnqueteMission;