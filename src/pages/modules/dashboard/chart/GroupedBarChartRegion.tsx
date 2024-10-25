import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {useEvolutionSignalmentbyregion } from '../../../../api/dashboard/SignalementStat';
import { useNavigate } from 'react-router-dom';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const GroupedBarChartRegion = ({ date }: { date: number }) => {
  const navigate = useNavigate();
  const evolution = useEvolutionSignalmentbyregion(date,navigate);
  if (evolution.isPending) {
    return <>loading...</>
  }
  if (evolution.isError) {
    return <>error...</>
  }
  console.log(evolution.data)
  const value: any[] = [];
  evolution.data.forEach((element: any) => {
    value.push(Number(element.nombre_signal))
  })
  const data = {
    labels: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    datasets: [
      {
        label: 'Évolution des signalements',
        data: value, // Remplacez par vos données
        backgroundColor: '#e74c3c',
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
        <span className='font-sans font-bold text-secondary'>Visualisation du nombre de signalements par mois</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChartRegion;
