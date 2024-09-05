import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);
function PieChart() {
  const data_pie = {
    labels: ['Enquete', 'Collecte' , 'Autre suivi'],
    datasets: [
      {
        label: 'Répartition des Missions',
        data: [2, 5, 1], // Remplacez ces valeurs par les données dynamiques
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'blue'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem:any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };
  return (
    <Pie data={data_pie} options={options} />
    
  )

}
export default PieChart;