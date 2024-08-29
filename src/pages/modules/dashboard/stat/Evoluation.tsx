import { DatePicker, theme } from "antd";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Evoluation() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { RangePicker } = DatePicker;
  const onYearRangeChange = (dates:any, _:any) => {
    if (dates) {
      const [startYear, endYear] = dates;
      console.log('Année de début:', startYear.format('YYYY'));
      console.log('Année de fin:', endYear.format('YYYY'));
    } else {
      console.log('Aucune date sélectionnée');
    }
  };
  const options = {
  responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Utilise une valeur valide ici
      },
      title: {
        display: true,
        text: 'Multi-line Chart',
      },
    },
  };
const labels = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const data = {
  labels,
  datasets: [
    {
      label: '2023',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 85, 92], // 12 valeurs pour chaque mois
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2024',
      data: [28, 48, 40, 19, 86, 27, 90, 72, 66, 88, 75, 94], // 12 valeurs pour chaque mois
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};


  return (
     <div
        className="flex flex-col  font-sans"
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      > 
      <div className="flex justify-between">
        <span className="text-sm font-bold">Evoluation PPN par an</span>
        <div className="flex gap-8 items-center">
          <span className="text-xs font-bold">Comparer vos date ici : </span>
          <RangePicker picker="year" placeholder={['Date 1', 'Date 2']} onChange={onYearRangeChange}/>
        </div>
      </div>
      <div className="flex justify-center font-sans" style={{ height: '800px', width: '100%'}}>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
export default Evoluation;