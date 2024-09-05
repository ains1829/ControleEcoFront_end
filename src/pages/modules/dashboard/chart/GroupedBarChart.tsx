import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const GroupedBarChart = () => {
  const data = {
    labels: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    datasets: [
      {
        label: 'Infraction',
        data: [3, 4, 2, 0, 3, 2, 4, 3, 5, 6, 2, 4], // Remplacez par vos données
        backgroundColor: '#4F1787',
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div>
      <div className='flex'>
        <span className='font-sans font-bold'>Nombre d'infractions constatées par mois</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChart;
