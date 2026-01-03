// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <motion.div
        className="footer-wrapper container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="footer-grid">
          <div className="footer-col about">
            <img
              src="/images/logo-dark.png"
              alt="Re:Form Akademi Logo"
              className="footer-logo"
            />
            <p>
              <strong>Re:Form Akademi</strong>, bilimsel temelli ve yenilikçi Pilates eğitimleriyle profesyonel eğitmenler yetiştirir. 
              Hareketin anatomisini, öğretme sanatını ve bütüncül sağlık yaklaşımını keşfedin.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/re.form_akademi" target="_blank" rel="noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=905465683996" target="_blank" rel="noreferrer">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="mailto:info@reformakademi.com">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Kurumsal</h4>
            <ul>
              <li><a href="/policy">Hakkımızda</a></li>
              <li><a href="/policy/contact-us">İletişim</a></li>
              <li><a href="/blogs">Blog</a></li>
              <li><a href="/policy">Gizlilik Politikası</a></li>
              <li><a href="/policy">Kullanım Şartları</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Eğitim Programları</h4>
            <ul>
              <li><a href="/educations/anatomi-and-pilates-prensipleri-egitimi">Anatomi & Pilates Prensipleri</a></li>
              <li><a href="/educations/matwork-1-pilates-egitmenlik-egitimi">Matwork-1</a></li>
              <li><a href="/educations/reformer-1-pilates-egitmenlik-egitimi">Reformer-1</a></li>
              <li><a href="/education-calendar">Eğitim Takvimi</a></li>
              <li><a href="/educations">Tüm Eğitimler</a></li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h4>İletişim</h4>
            <ul>
              <li>
                <i className="bi bi-geo-alt"></i> İstanbul, Türkiye
              </li>
              <li>
                <i className="bi bi-telephone"></i>{" "}
                <a href="tel:+905465683996">+90 546 568 3996</a>
              </li>
              <li>
                <i className="bi bi-envelope"></i>{" "}
                <a href="mailto:info@reformakademi.com">info@reformakademi.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} <strong>Re:Form Akademi</strong> | Tüm Hakları Saklıdır.
          </p>
          <div className="footer-links">
            <a href="/policy/privacy-policy">Gizlilik</a>
            <span>•</span>
            <a href="/policy/terms">Kullanım Şartları</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
