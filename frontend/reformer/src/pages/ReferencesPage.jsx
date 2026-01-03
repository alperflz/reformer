import References from '../components/References/References'
import { useSeo } from '../seo/Seo';

const ReferencesPage = () => {
  useSeo({
    title: "Referanslarımız",
    description: "Referanslarımız ve markalarımız.",
    canonical: "/references",
  });
  return (
    <References />
  )
}

export default ReferencesPage