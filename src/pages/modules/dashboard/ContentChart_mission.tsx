import {Divider, Segmented, theme } from 'antd';
import { useState } from 'react';
import GroupedBarCMission from './chart/GroupedBarMission';
import GroupetBarTypemission from './chart/GroupetBarTypemission';
const ContentCharMission = ({annee} : {annee:number}) => {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [choix_component, setComponent] = useState('0');
  const handleClick = (name:string) =>{
    setComponent(name)
  }
  return (
    <div style={{
      padding: 24,
      minHeight: 360,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      marginTop: 10,
    }} className='font-sans'>
      <div className='flex flex-col'>
        <div className="flex flex-col gap-y-1">
          <span className='font-bold text-xl'>Nombre de mission par mois.</span>
          <span className="text-xs text-gray-500">(annee : {annee})</span>
        </div>
        <Divider dashed />
        <div className='w-1/4'>
          <Segmented
            className="font-sans p-1"
            options={[
              { label: 'global', value: '0' },
              { label: 'par type de mission', value: '1' }
            ]}
            block
            style={{
              display: 'flex',
              gap: '1rem',
            }}
            value={choix_component}
            onChange={handleClick}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        {
          choix_component === '0' ?
          <GroupedBarCMission annee={annee} /> : <GroupetBarTypemission annee={annee} />
        }
        
      </div>
    </div>
  );
}
export default ContentCharMission;