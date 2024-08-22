import {  Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Equipe } from '../../../../../types/mission/Equipe';
const columns: TableProps<Equipe>['columns'] = [
  {
    title: <span className="font-sans">Nom</span>,
    dataIndex: 'nom',
    key: 'nom',
    render: (text) => <span className='font-sans'>{text}</span>,
  },
  {
    title: <span className='font-sans'>Matricule</span>,
    dataIndex: 'matricule',
    key: 'matricule',
    render:(text)=><span className='font-sans'> {text} </span>
  },
  {
    title: <span className='font-sans'>Email</span>,
    dataIndex: 'email',
    key: 'email',
    render: (text) => <span className='font-sans'>{text}</span>
  },
  {
    title: <span className="font-sans">Qualite</span>,
    key: 'profil',
    dataIndex: 'profil',
    render: (_, { profil }) => (
      <>
        {profil.map((tag) => {
          let color = 'blue' ;
          if (tag === 'Chef equipe') {
            color = 'volcano';
          }
          return (
            <Tag className='font-sans' color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  }
];
function TableComponent({ data }: { data: Equipe[] }) {
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

export default TableComponent;