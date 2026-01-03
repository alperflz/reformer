// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* === BACKGROUND LAYER === */}
      <div className="hero-bg">
        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>
        <div className="hero-overlay"></div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container hero-content">
        <motion.div
          className="slider-hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>🎓 Re:Form Akademi’ye Hoş Geldiniz</h1>
          <p className="subtitle">
            Pilates eğitmenliğinde profesyonelliğe giden yol burada başlıyor.
          </p>
          <p className="desc">
            Türkiye’nin önde gelen fizyoterapist ve master eğitmenlerinden oluşan
            ekibimizle, bilim temelli ve modern yaklaşımla sizi profesyonel
            eğitmenliğe hazırlıyoruz.
          </p>

          <div className="hero-buttons">
            <a href="/egitimler" className="btn-primary">
              Eğitimleri Keşfet
            </a>
            <a href="https://forms.gle/49Vryt6WDbL9stsU7" className="btn-outline">
              Ön Kayıt Formu
            </a>
          </div>
        </motion.div>

        {/* === INFO CARDS === */}
        <motion.div
          className="hero-info-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="slider-info-card">
            <i className="bi bi-lightbulb-fill"></i>
            <h4>Bilimsel Temel</h4>
            <p>Fizyoterapist eğitmenlerle bilim temelli sistem</p>
          </div>
          <div className="slider-info-card">
            <i className="bi bi-activity"></i>
            <h4>Pratik Odaklı</h4>
            <p>Gerçek stüdyo deneyimiyle uygulamalı eğitim</p>
          </div>
          <div className="slider-info-card">
            <i className="bi bi-people-fill"></i>
            <h4>Kariyer Desteği</h4>
            <p>Staj, mentorluk ve iş yönlendirmesiyle güçlü başlangıç</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
