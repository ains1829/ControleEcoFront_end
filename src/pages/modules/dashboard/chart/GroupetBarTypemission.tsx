import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useStatMissionByMonthType } from '../../../../api/dashboard/Statistique';
import { useNavigate } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const GroupetBarTypemission = ({ annee }: { annee: number }) => {
  const navigate = useNavigate();
  const data_fecth = useStatMissionByMonthType(annee, navigate);
  if (data_fecth.isPending) {
    return <>loading...</>
  }
  if (data_fecth.isError) {
    return <>error...</>
  }
  const data_enquete: number[]  = [];
  const data_collecte: number[] = [] ;
  const data_autresuivi: number[] = [] ;
  const extractData = (data: any[], target: number[]) => {
    data.forEach((item: any) => target.push(item.nb_mission));
  };
  extractData(data_fecth.data.enquete , data_enquete)
  extractData(data_fecth.data.collecte , data_collecte)
  extractData(data_fecth.data.autre_suivi , data_autresuivi)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Enquête',
        data: data_enquete,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Collecte Économique',
        data: data_collecte,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Autre Suivi',
        data: data_autresuivi,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
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
export default GroupetBarTypemission;