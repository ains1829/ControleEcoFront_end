import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {useEvolutionSignalmentbyregion } from '../../../../api/dashboard/SignalementStat';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const GroupedBarChartRegion = ({ date }: { date: number }) => {
  const evolution = useEvolutionSignalmentbyregion(date);
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
        label: 'Evolution signalment',
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
        <span className='font-sans font-bold text-red-500'>Visualisation du Nombre de Signalements par Mois</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChartRegion;
