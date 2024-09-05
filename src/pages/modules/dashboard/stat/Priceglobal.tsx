import {
  DollarOutlined
} from '@ant-design/icons';
import { usePpnglobalprovince } from '../../../../api/dashboard/PpnStat';
function Priceglobal({province , product, mois,annee} : {province:number , product:number,mois:number,annee:number}) {
  const priceGlobal = usePpnglobalprovince(province, product, mois, annee);
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
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix moyenne</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_moyenne} MGA</span>
          <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.haverapport.moyenne_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> - {data_price.haverapport.moyenne_rapport} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.haverapport.moyenne_rapport}%</span>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix max</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_max} MGA</span>
              <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.haverapport.max_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> - {data_price.haverapport.max_rapport} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.haverapport.max_rapport}%</span>
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10  p-5 rounded-xl shadow-lg">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-bold">Prix min</span>
              <DollarOutlined  style={{fontSize:'22px'}}/>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-3xl font-bold">{data_price.price_actu.p_min} MGA</span>
              <div className="flex gap-2 items-center">
                {
                  data_price.haverapport === false ?
                  <span className="text-xs text-gray-500">{data_price.rapport}</span> : (
                    <>
                      <span className="text-xs text-gray-500">Comparé au mois dernier</span>
                      {
                        data_price.haverapport.min_rapport < 0 ? <span className="text-xs bg-green-500 p-1 rounded-full text-white font-bold"> - {data_price.haverapport.min_rapport} %</span>
                        :
                          <span className="text-xs bg-red-500 p-1 rounded-full text-white font-bold"> + {data_price.haverapport.min_rapport}%</span>
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
export default Priceglobal;