import {Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Divider } from 'antd';
import {useRepartitionanomalybyregion } from '../../../../api/dashboard/SignalementStat';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
function PieChartRegion({ date }: { date: number }) {
  const anomalyrepartition = useRepartitionanomalybyregion(date);
  if (anomalyrepartition.isPending) {
    return <>loading...</>
  }
  if (anomalyrepartition.isError) {
    return <>error...</>
  }
  console.log(anomalyrepartition.data)
  const labels: any[] = [];
  const data: any[] = [];
  let total_signal: number = 0;
  anomalyrepartition.data.forEach((element : any) => {
    labels.push(element.nameanomaly);
    data.push(element.percent)
    total_signal += element.nb_anomaly
  });
  const color = ["#ff4d4f", '#f39c12', '#3498db'];
const data_pie = {
    labels: labels,
    datasets: [
        {
            label: 'Répartition des Anomalies',
            data: data, // Remplacez par les données réelles
            backgroundColor: [
                '#ff4d4f', // Couleur pour "Produit Périmé"
                '#f39c12', // Couleur pour "Affichage Non Conforme"
                '#3498db'  // Couleur pour "Autre"
            ],
          
        }
    ]
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
      },

      tooltip: {
        callbacks: {
          label: function(tooltipItem:any) {
            return`${tooltipItem.label} :  ${tooltipItem.raw} %`;
          }
        }
      }
    }
  };
  return (
    <div className='flex flex-col font-sans'>
      <span className='text-sm font-bold'>Total Signal : {total_signal}</span>
      <span className='mt-5 font-sans font-bold text-red-500'>Répartition des anomalies</span>
      <div className='mt-5'>
        <Doughnut data={data_pie} options={options} />
      </div>
      <Divider dashed />
      <div className='flex flex-col gap-y-5'>
        {
          anomalyrepartition.data.map((element: any , index:number) => (
            <div key={index} className='flex justify-between items-center'>
              <div className='flex gap-4 items-center'>
                <span style={{minHeight:10, minWidth:50, padding:10, background:color[index]}}></span>
                <span>{element.nameanomaly}</span>
              </div>
              <span>{element.percent } %</span>
            </div>
          ))
        }
      </div>
    </div>
  )

}
export default PieChartRegion;