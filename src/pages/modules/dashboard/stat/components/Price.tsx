import {
  DollarOutlined ,RiseOutlined,FallOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';

export function formatNumber(value: number): string {
  return value.toString().replace('.', ',')
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " Ar";
}
function getAbsoluteValue(value: number): number {
    return Math.abs(value);
}

function Price({ price, haverapport, rapport, percent_rapport, type }: { price: number, haverapport: boolean, rapport: string, percent_rapport: number, type: number }) {
  return (
    <>
      <div className="flex flex-col gap-y-10  p-5  shadow-md">
        <div className="flex justify-between">
          <span className={` text-gray-500 font-bold`}>
            {type === 1 ? "Prix moyenne" : type === 2 ? 'Prix max' : 'Prix min'}
          </span>
          <span className='text-xl'>
            <DollarOutlined />
          </span>
        </div>
        <div className="flex justify-between items-center ">
          <span className="text-3xl font-bold">{price === 0 ? '_' : formatNumber(price)} </span>
          <div className="flex gap-2 items-center">
            {
              haverapport === false ?
              <span className="text-xs text-gray-500">{rapport}</span> : (
                <>
                  <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                  {
                      percent_rapport < 0 ?
                        <Tag color='green' icon={<FallOutlined />}>{getAbsoluteValue(percent_rapport).toFixed(2)} %</Tag>
                    : <Tag color='red' className='font-sans font-bold' icon={<RiseOutlined />}>{percent_rapport.toFixed(2)}%</Tag>
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default Price;