// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Services.css";

const Services = () => {
    return (
        <motion.section
            className="services-page"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <header className="services-hero premium-hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-layers-fill"></i> Profesyonel Hizmetler
                        </span>

                        <h1>Re:Form Akademi</h1>

                        <p>
                            Bilimsel temelli eğitimler, profesyonel eğitmenlik programları ve
                            modern hareket yaklaşımıyla sektöre değer katıyoruz. Fizyoterapist
                            master eğitmen kadromuzla birlikte, hareketin gücünü bilimle
                            birleştirerek her öğrencimize sağlam bir temel sunuyoruz.
                        </p>

                        <div className="hero-mini-info">
                            <div><i className="bi bi-shield-check"></i> Güvenilir eğitmen ekibi</div>
                            <div><i className="bi bi-people-fill"></i> 1500+ Mezun</div>
                            <div><i className="bi bi-award-fill"></i> Uluslararası metodoloji</div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="services-video container">
                <h2>🎥 Tanıtım Videomuz</h2>
                <p>
                    Re:Form Akademi'nin vizyonunu, eğitim ortamını ve profesyonel yaklaşımını yakından görün.
                </p>

                <div className="video-frame">
                    <video controls playsInline>
                        <source src="/videos/reform-intro.mp4" type="video/mp4" />
                        Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                </div>
            </section>

            <section className="services-about container">
                <h2>🌙 Re:Form Akademi Hakkında</h2>

                <p>
                    Re:Form Akademi, modern Pilates eğitimini bilimsel altyapıyla birleştiren
                    profesyonel bir akademidir. Tüm müfredatlar fizyoterapist ve master eğitmenler
                    tarafından hazırlanır. Her modül; anatomiyi anlamayı, hareketi doğru
                    analiz etmeyi ve öğretme sanatını maksimum verimle uygulamayı hedefler.
                </p>

                <div className="about-stats">
                    <div>
                        <strong>1500+</strong>
                        <span>Mezun Öğrenci</span>
                    </div>
                    <div>
                        <strong>25+</strong>
                        <span>Kurumsal Eğitim Programı</span>
                    </div>
                    <div>
                        <strong>98%</strong>
                        <span>Memnuniyet Oranı</span>
                    </div>
                </div>

                <div className="services-features">
                    <div className="feature-card">
                        <i className="bi bi-book-half"></i>
                        <h3>Bilim Temelli İçerik</h3>
                        <p>Her eğitim fizyoterapist eğitmenler tarafından hazırlanır ve sürekli güncellenir.</p>
                    </div>
                    <div className="feature-card">
                        <i className="bi bi-person-video3"></i>
                        <h3>Uygulama Odaklı Sistem</h3>
                        <p>Gerçek stüdyo ortamında egzersiz analizi ve eğitmen pratiği yapılır.</p>
                    </div>
                    <div className="feature-card">
                        <i className="bi bi-bar-chart-fill"></i>
                        <h3>Kariyer Desteği</h3>
                        <p>Mezunlara iş yönlendirme, CV desteği ve mentorluk sağlanır.</p>
                    </div>
                    <div className="feature-card">
                        <i className="bi bi-heart-pulse"></i>
                        <h3>Özel Branş Eğitimleri</h3>
                        <p>Hamile Pilatesi, Postür Analizi ve ileri seviye hareket eğitimi programları.</p>
                    </div>
                </div>
            </section>

            <section className="why-us container">
                <h2>⭐ Neden Re:Form Akademi?</h2>

                <ul className="why-list">
                    <li><i className="bi bi-check-circle-fill"></i> Fizyoterapist eğitmen kadrosu</li>
                    <li><i className="bi bi-check-circle-fill"></i> Uluslararası metodolojiye uygun müfredatlar</li>
                    <li><i className="bi bi-check-circle-fill"></i> Gerçek stüdyo ortamında uygulamalı eğitim</li>
                    <li><i className="bi bi-check-circle-fill"></i> Dijital notlar, video materyalleri ve analiz destekleri</li>
                    <li><i className="bi bi-check-circle-fill"></i> Eğitim sonrası staj ve kariyer rehberliği</li>
                    <li><i className="bi bi-check-circle-fill"></i> Sektörde güçlü mezun ağı ve iş bağlantıları</li>
                </ul>
            </section>

            <section className="services-programs container">
                <h2>🧠 Profesyonel Eğitim Modüllerimiz</h2>
                <p>Temelden ileri seviyeye kadar tüm eğitmenlik yolculuğunuz için tasarlanmış eğitim programları.</p>

                <div className="services-grid">
                    <a href="/educations/anatomi-pilates-prensipleri" className="service-card">
                        <i className="bi bi-body-text"></i>
                        <h3>Anatomi & Pilates Prensipleri</h3>
                        <p>Hareketin bilimsel temellerini öğrenin.</p>
                    </a>

                    <a href="/educations/matwork-1" className="service-card">
                        <i className="bi bi-activity"></i>
                        <h3>Matwork-1</h3>
                        <p>Mat Pilates'te güçlü bir başlangıç.</p>
                    </a>

                    <a href="/educations/reformer-1" className="service-card">
                        <i className="bi bi-gem"></i>
                        <h3>Reformer-1</h3>
                        <p>Aletli Pilates uzmanlığına giriş.</p>
                    </a>

                    <a href="/educations/hamile-pilates-egitmenlik" className="service-card">
                        <i className="bi bi-heart-pulse"></i>
                        <h3>Hamile Pilatesi Eğitmenliği</h3>
                        <p>Hamilelik dönemine özel bilimsel eğitim.</p>
                    </a>
                </div>
            </section>

            <section className="services-cta container">
                <h2>📩 İletişime Geçin</h2>
                <p>
                    Eğitimler, kayıt süreci ve çalışma modelimiz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                </p>

                <div className="cta-buttons">
                    <a href="https://api.whatsapp.com/send?phone=905465683996" className="btn-primary">
                        <i className="bi bi-whatsapp"></i> WhatsApp
                    </a>
                    <a href="mailto:reformakademi@gmail.com" className="btn-outline">
                        <i className="bi bi-envelope"></i> E-posta
                    </a>
                </div>
            </section>

        </motion.section>
    );
};

export default Services;
