import Profile from '../components/Dashboard/Profile'
import { useSeo } from '../seo/Seo';

const DashboardPage = () => {
      useSeo({
        title: "Profilim",
        description: "Kişisel bilgiler, başvuru takibi ve kurs tarihleri.",
        canonical: "/dashboard",
      });
    return (
        <Profile />
    )
}

export default DashboardPage