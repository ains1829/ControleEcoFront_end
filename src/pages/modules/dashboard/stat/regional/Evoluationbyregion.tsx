import { Button, DatePicker, theme } from "antd";
import { Line } from 'react-chartjs-2';
import {
  CalendarOutlined
} from '@ant-design/icons';
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
import {usePpnAnnebydirecteur } from "../../../../../api/dashboard/PpnStat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Evoluationbyregion({product,annee} : {product:number,annee:number}) {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();
  const [date1, setDate1] = useState(annee);
  const [date2, setDate2] = useState(0);
  const [choix, setChoix] = useState(true);
  const ppn = usePpnAnnebydirecteur(product, choix, date1, date2,navigate);
  const { RangePicker } = DatePicker;
  const onYearRangeChange = async (dates:any, _:any) => {
    if (dates) {
      const [startYear, endYear] = dates;
      setDate1(startYear.format('YYYY'));
      setDate2(endYear.format('YYYY'));
      setChoix(false);
    } else {
      console.log('Aucune date sélectionnée');
    }
  };
  const handleThreeyears = async () => {
    setDate1(annee);
    setDate2(0);
    setChoix(true);
  }
  if (ppn.isPending) {
    return <>loading...</>
  }
  if (ppn.isError) {
    return <>error...</>
  }
  console.log(ppn.data)
  const extractData = (data: any[], target: number[]) => {
    data.forEach((item: any) => target.push(item.p_moyenne));
  };
  const content_data: any[] = [];
  const data_price1: number[] = [];
  const data_price2: number[] = [];
  const data_price3: number[] = [];
  if (ppn.data.isthreeyears === true) {
    extractData(ppn.data.data1, data_price1);
    extractData(ppn.data.data2, data_price2);
    extractData(ppn.data.data3, data_price3);
    content_data.push(
      {
        label: ppn.data.date1,
        data: data_price1,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: ppn.data.date2,
        data: data_price2,
        borderColor: 'rgba(153, 102, 255, 1)', // Couleur de la bordure pour la troisième série
        backgroundColor: 'rgba(153, 102, 255, 0.5)'
      },
      {
        label: ppn.data.date3,
        data: data_price3,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    )
  } else {
    extractData(ppn.data.data1, data_price1);
    extractData(ppn.data.data2, data_price2);
    content_data.push(
      {
        label: ppn.data.date1,
        data: data_price1,
        borderColor: 'rgba(153, 102, 255, 1)', // Couleur de la bordure pour la troisième série
        backgroundColor: 'rgba(153, 102, 255, 0.5)'
      },
      {
        label: ppn.data.date2,
        data: data_price2,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    )
  }
  const options = {
  responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Utilise une valeur valide ici
      },
      title: {
        display: false,
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
  datasets: content_data
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
          <Button icon={<CalendarOutlined />} className="font-sans text-xs" type="dashed" onClick={handleThreeyears}>Les trois dernières années</Button>
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
export default Evoluationbyregion;