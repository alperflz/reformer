import { useState, useEffect } from "react";
import "./Policy.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const sections = [
    { id: "kvkk", label: "KVKK Aydınlatma Metni", icon: "bi-shield-lock" },
    { id: "gizlilik", label: "Gizlilik Politikası", icon: "bi-incognito" },
    { id: "cerez", label: "Çerez Politikası", icon: "bi-cookie" },
    { id: "kullanim", label: "Kullanım Koşulları", icon: "bi-book" },
    { id: "iade", label: "İptal & İade Politikası", icon: "bi-arrow-counterclockwise" },
    { id: "mesafeli", label: "Mesafeli Satış Sözleşmesi", icon: "bi-file-text" },
    { id: "iletisim", label: "İletişim", icon: "bi-envelope" },
];

export default function Policy() {
    const [active, setActive] = useState("kvkk");

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
            let current = active;
            sections.forEach((sec) => {
                const el = document.getElementById(sec.id);
                if (el && el.getBoundingClientRect().top < 150) {
                    current = sec.id;
                }
            });
            setActive(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [active]);

    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setActive(id);
    };

    return (
        <motion.section
            className="policy-page"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="policy-hero premium-hero">
                <div className="policy-hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-shield-fill-check"></i> Resmi Belgeler
                        </span>

                        <h1>Kurumsal Politikalar & Yasal Bilgilendirme</h1>

                        <p>
                            Gizlilik, veri koruma, kullanım şartları ve tüketici haklarına dair tüm resmi metinleri
                            burada bulabilirsiniz. Re:Form Akademi olarak şeffaflık ve güven ilkesiyle çalışıyoruz.
                        </p>
                    </div>
                    <div className="policy-mini-info hero-mini-info">
                        <div><i className="bi bi-clock-history"></i> Güncel mevzuata uygun</div>
                        <div><i className="bi bi-shield-lock"></i> Veri güvenliği garantisi</div>
                        <div><i className="bi bi-geo-alt"></i> Kadıköy / İstanbul</div>
                    </div>
                </div>
            </header>

            <div className="policy-layout container">

                {/* SIDEBAR – NOTION TARZI */}
                <aside className="policy-sidebar">
                    <nav className="sidebar-nav">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                className={`sidebar-link ${active === s.id ? "active" : ""}`}
                                onClick={() => scrollTo(s.id)}
                            >
                                <i className={`bi ${s.icon}`}></i>
                                {s.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="policy-content">

                    {/* --- KVKK --- */}
                    <section id="kvkk" className="policy-card section-banner">
                        <h2><i className="bi bi-file-earmark-lock"></i> KVKK Aydınlatma Metni</h2>
                        <p>
                            Re:Form Akademi, kişisel verilerin korunmasına ilişkin 6698 sayılı Kanun kapsamında tüm
                            teknik ve idari tedbirleri almakla yükümlüdür. Veriler yalnızca açık rızanızla ve
                            hizmetin sağlanması amacıyla işlenir.
                        </p>

                        <div className="policy-list-box">
                            <ul>
                                <li>İşlenen Veriler: Kimlik, iletişim, kayıt, eğitim tercihleri.</li>
                                <li>İşleme Amaçları: Eğitim kaydı, iletişim, faturalandırma, güvenlik.</li>
                                <li>Haklarınız: Silme, düzeltme, itiraz, taşınabilirlik, rıza geri çekme.</li>
                            </ul>
                        </div>
                    </section>

                    {/* --- GİZLİLİK --- */}
                    <section id="gizlilik" className="policy-card">
                        <h2><i className="bi bi-incognito"></i> Gizlilik Politikası</h2>
                        <p>
                            Tüm kullanıcı bilgileriniz SSL şifreleme ile korunur. Üçüncü taraflarla paylaşım yapılmaz.
                            Veriler yalnızca hizmet işleyişini sağlamak için kullanılır.
                        </p>

                        <div className="policy-info-grid">
                            <div className="info-box">
                                <h4>🔒 Veri Güvenliği</h4>
                                <p>Sunucularımızda düzenli güvenlik taramaları yapılır.</p>
                            </div>

                            <div className="info-box">
                                <h4>💬 Gizlilik İlkeleri</h4>
                                <p>Kullanıcı verileri reklam amaçlı üçüncü kişilere aktarılmaz.</p>
                            </div>

                            <div className="info-box">
                                <h4>📁 Veri Saklama</h4>
                                <p>Gereğinden uzun süre veri saklanmaz.</p>
                            </div>
                        </div>
                    </section>

                    {/* --- ÇEREZ --- */}
                    <section id="cerez" className="policy-card">
                        <h2><i className="bi bi-cookie"></i> Çerez Politikası</h2>
                        <p>Web sitemiz kullanıcı deneyimini iyileştirmek için çerez kullanır.</p>

                        <div className="policy-list-box">
                            <ul>
                                <li>Zorunlu çerezler (oturum yönetimi)</li>
                                <li>Analitik çerezler (ziyaret istatistikleri)</li>
                                <li>Tercih çerezleri (tema, dil ayarı)</li>
                            </ul>
                        </div>
                    </section>

                    {/* --- KULLANIM --- */}
                    <section id="kullanim" className="policy-card">
                        <h2><i className="bi bi-book"></i> Kullanım Koşulları</h2>
                        <p>
                            Sitemizi kullanan tüm ziyaretçiler bu koşulları kabul etmiş sayılır.
                        </p>
                        <ul>
                            <li>Sitedeki içeriklerin izinsiz ticari kullanımı yasaktır.</li>
                            <li>Yanıltıcı bilgi paylaşımı durumunda üyelik kaldırılabilir.</li>
                            <li>Güvenlik için erişim kayıtları loglanabilir.</li>
                        </ul>
                    </section>

                    {/* --- İADE --- */}
                    <section id="iade" className="policy-card">
                        <h2><i className="bi bi-arrow-counterclockwise"></i> İptal & İade Politikası</h2>
                        <p>Eğitim ücret iade koşulları aşağıdaki gibidir:</p>

                        <div className="policy-list-box">
                            <ul>
                                <li>7 gün öncesine kadar %100 iade.</li>
                                <li>3–6 gün kala %50 iade.</li>
                                <li>48 saat kala iade yoktur.</li>
                                <li>Mücbir sebeplerde özel değerlendirme yapılır.</li>
                            </ul>
                        </div>
                    </section>

                    {/* --- MESAFELİ --- */}
                    <section id="mesafeli" className="policy-card">
                        <h2><i className="bi bi-file-text"></i> Mesafeli Satış Sözleşmesi</h2>
                        <p>
                            Eğitim kayıtları 6502 Sayılı Tüketicinin Korunması Kanunu’na uygun olarak yürütülür.
                            Dijital sözleşme onayı ile süreç başlatılmış olur.
                        </p>
                    </section>

                    {/* --- İLETİŞİM --- */}
                    <section id="iletisim" className="policy-card">
                        <h2><i className="bi bi-envelope"></i> İletişim</h2>
                        <ul className="contact-list">
                            <li><i className="bi bi-telephone-fill"></i> +90 546 568 39 96</li>
                            <li><i className="bi bi-envelope-fill"></i> reformakademi@gmail.com</li>
                            <li><i className="bi bi-instagram"></i> instagram.com/re.form_akademi</li>
                            <li><i className="bi bi-geo-alt-fill"></i> Kadıköy – İstanbul</li>
                        </ul>
                    </section>

                </main>
            </div>

        </motion.section>
    );
}
