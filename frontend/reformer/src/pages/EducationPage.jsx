import Education from "../components/Education/Education"
import { useSeo } from "../seo/Seo";


const EducationPage = () => {
  useSeo({
    title: "Eğitimler",
    description: "Reform Akademi tarafından sağlanan profesyonel eğitimler.",
    canonical: "/educations",
  });
  return (
    <Education />
  )
}

export default EducationPage