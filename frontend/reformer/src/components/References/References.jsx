// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { referencesData } from "./referencesData";
import "./References.css";

export default function References() {
    return (
        <motion.section
            className="references-page"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <header className="references-hero premium-hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge"><i className="bi bi-handshake"></i> Resmi Partnerler</span>

                        <h1>Re:Form Akademi Referansları</h1>

                        <p>
                            Pilates eğitmenliği sektöründe güvenilir iş ortaklarıyla çalışıyor,
                            eğitimden istihdama uzanan profesyonel bir ekosistem oluşturuyoruz.
                        </p>
                        <div className="references-mini-info">
                            <div><i className="bi bi-building-check"></i> 14+ Profesyonel Stüdyo İş Birliği</div>
                            <div><i className="bi bi-tools"></i> Ekipman & Stüdyo Çözüm Ortaklıkları</div>
                            <div><i className="bi bi-people-fill"></i> Mezunlar İçin Güçlü Destek Ağı</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="references-container container">
                {referencesData.map((ref, index) => (
                    <motion.div
                        className="reference-card"
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className="reference-logo-wrapper">
                            <img src={ref.logo} className="reference-logo" alt={ref.name} />
                        </div>

                        <h3><i className={ref.icon}></i> {ref.name}</h3>
                        <p className="reference-tagline">{ref.tagline}</p>

                        <div className="reference-meta">
                            <div><i className="bi bi-geo-alt-fill"></i> {ref.location}</div>
                            <a href={ref.instagram} target="_blank" rel="noreferrer">
                                <i className="bi bi-instagram"></i> Instagram
                            </a>
                        </div>

                        <div className="reference-mini-desc">
                            {ref.shortDescription}
                        </div>

                        <Link to={`/references/${ref.slug}`} className="reference-btn">
                            Detayları Gör <i className="bi bi-arrow-right"></i>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
