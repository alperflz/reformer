import EducationCalendar from '../components/EducationCalendar/EducationCalendar'
import { useSeo } from '../seo/Seo';

const EducationCalendarPage = () => {
  useSeo({
    title: "Eğitim Takvimi",
    description: "Yaklaşan Pilates eğitimleri ve kurs tarihleri.",
    canonical: "/education-calendar",
  });
  return (
    <EducationCalendar />
  )
}

export default EducationCalendarPage