import Contact from "../components/Contact/Contact"
import { useSeo } from "../seo/Seo";

const ContactPage = () => {
  useSeo({
    title: "İletişim",
    description: "Re:Form Akademi ile iletişime geçin.",
    canonical: "/contact",
  });
  return (
    <Contact />
  )
}

export default ContactPage