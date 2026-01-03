
import HelpCenter from '../components/HelpCenter/HelpCenter'
import { useSeo } from '../seo/Seo';

const HelpCenterPage = () => {
  useSeo({
    title: "Yardım Merkezi",
    description: "Yaklaşan Pilates eğitimleri ve kurs tarihleri.",
    canonical: "/education-calendar",
  });
  return (
    <HelpCenter />
  )
}

export default HelpCenterPage