import {
  DollarOutlined
} from '@ant-design/icons';
import {usePpnglobalprovincebydirecteur } from '../../../../../api/dashboard/PpnStat';
import { useNavigate } from 'react-router-dom';
function Priceglobalbyregion({ product, mois, annee }: { product: number, mois: number, annee: number }) {
  const navigate = useNavigate();
  const priceGlobal = usePpnglobalprovincebydirecteur(product, mois, annee,navigate);
  if (priceGlobal.isPending) {
    return <>loading...</>
  }
  if (priceGlobal.isError) {
    return <>error...</>
  } 
  const data_price = priceGlobal.data
  console.log(data_price)
  return (
    
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-y-10  p-5  shadow-md">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix moyenne</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_moyenne} Ar</span>
          <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.moyenne_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> {data_price.moyenne_rapport.toFixed(2)} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.moyenne_rapport.toFixed(2)}%</span>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5  shadow-md">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix max</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_max} Ar</span>
              <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.max_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> {data_price.max_rapport.toFixed(2)} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.max_rapport.toFixed(2)}%</span>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5  shadow-md">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix min</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_min} Ar</span>
              <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.min_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold">{data_price.min_rapport.toFixed(2)} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.min_rapport.toFixed(2)}%</span>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
  )
}
export default Priceglobalbyregion;