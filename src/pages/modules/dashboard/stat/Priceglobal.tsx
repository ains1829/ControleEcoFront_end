import { usePpnglobalprovince } from '../../../../api/dashboard/PpnStat';
import { useNavigate } from 'react-router-dom';
import Price from './components/Price';
function Priceglobal({ province, product, mois, annee }: { province: number, product: number, mois: number, annee: number }) {
  const navigate = useNavigate();
  const priceGlobal = usePpnglobalprovince(province, product, mois, annee,navigate);
  if (priceGlobal.isPending) {
    return <>loading...</>
  }
  if (priceGlobal.isError) {
    return <>error...</>
  } 
  const data_price = priceGlobal.data

  return (
      <div className="grid grid-cols-3 gap-10">
        <Price price={data_price.price_actu.p_moyenne} haverapport={data_price.haverapport} rapport={data_price.rapport} percent_rapport={data_price.moyenne_rapport} type={1} />
        <Price price={data_price.price_actu.p_max} haverapport={data_price.haverapport} rapport={data_price.rapport} percent_rapport={data_price.max_rapport} type={2} />
        <Price price={data_price.price_actu.p_min} haverapport={data_price.haverapport} rapport={data_price.rapport} percent_rapport={data_price.min_rapport} type={3} />
      </div>
  )
}
export default Priceglobal;