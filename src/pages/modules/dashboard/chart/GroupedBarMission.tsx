import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useStatMissionByMonth } from '../../../../api/dashboard/Statistique';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const GroupedBarCMission = ({ annee }: { annee: number }) => {
  const navigate = useNavigate();
  const data_stat = useStatMissionByMonth(annee, navigate);
  if (data_stat.isPending) {
    return <>loading...</>
  }
  if (data_stat.isError) {
    return <>error...</>
  }
  const data_reel: any[] = [];
  data_stat.data.forEach((item:any)=> data_reel.push(item.nb_mission))
  const data = {
    labels: [  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Nombre de mission',
        data: data_reel,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
}
export default GroupedBarCMission;