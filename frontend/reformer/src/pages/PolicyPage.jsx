import Policy from '../components/Policy/Policy'
import { useSeo } from '../seo/Seo';

const PolicyPage = () => {
  useSeo({
    title: "Kurumsal",
    description: "Gizlilik politikaları, kullanım şartları ve kvkk bilgilendirmesi.",
    canonical: "/policy",
  });
  return (
    <Policy />
  )
}

export default PolicyPage