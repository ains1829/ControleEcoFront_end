import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Divider } from 'antd';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
function PieChart() {
const data_pie = {
    labels: ['Produit Périmé', 'Affichage Non Conforme', 'Autre'],
    datasets: [
        {
            label: 'Répartition des Anomalies',
            data: [10, 7, 5], // Remplacez par les données réelles
            backgroundColor: [
                '#ff4d4f', // Couleur pour "Produit Périmé"
                '#f39c12', // Couleur pour "Affichage Non Conforme"
                '#3498db'  // Couleur pour "Autre"
            ]
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
            return`${tooltipItem.label} :  ${tooltipItem.raw}`;
          }
        }
      }
    }
  };
  return (
    <div className='flex flex-col font-sans'>
      <span className='font-sans font-bold'>Répartition des anomalies</span>
      <div className='mt-10'>
        <Pie data={data_pie} options={options} />
      </div>
      <Divider dashed />
      <div className='flex flex-col gap-y-5'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <span style={{minHeight:10, minWidth:50, padding:10, background:'#ff4d4f'}}></span>
            <span>Produit perimer</span>
          </div>
          <span>10</span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <span style={{minHeight:10, minWidth:50, padding:10, background:'#f77f00'}}></span>
            <span>Affichage Non Conforme</span>
          </div>
          <span>10</span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <span style={{minHeight:10, minWidth:50, padding:10, background:'rgba(153, 102, 255, 0.2)'}}></span>
            <span>Autre</span>
          </div>
          <span>10</span>
        </div>
      </div>
    </div>
  )

}
export default PieChart;