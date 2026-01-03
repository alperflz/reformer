
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./ContactPage.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    education: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="container hero-inner">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="hero-badge">
              <i className="bi bi-chat-dots-fill" /> Re:Form Akademi
            </span>
            <h1>İletişime Geç</h1>
            <p>
              Hamile Pilatesi Eğitmenlik Eğitimi ve tüm eğitim programlarımız hakkında
              detaylı bilgi almak için bize yazabilir, WhatsApp’tan hızlıca ulaşabilirsiniz.
            </p>

            <div className="hero-actions">
              <a
                href="https://api.whatsapp.com/send/?phone=905465683996"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <i className="bi bi-whatsapp" /> WhatsApp’tan Yaz
              </a>
              <a href="mailto:reformakademi@gmail.com" className="btn-outline">
                <i className="bi bi-envelope" /> Mail Gönder
              </a>
            </div>

            <div className="hero-mini-info">
              <div><i className="bi bi-clock-history" /> 24 saat içinde dönüş</div>
              <div><i className="bi bi-geo-alt-fill" /> Kadıköy / İstanbul</div>
              <div><i className="bi bi-shield-check" /> Güvenli kayıt süreci</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="contact-content container">
        {/* LEFT SIDE - INFO */}
        <div className="contact-left">
          <h2>Re:Form Akademi İletişim Bilgileri</h2>
          <p className="muted">
            Eğitim takvimi, kontenjan durumu, ücret bilgisi veya eğitmenlik kariyeriniz için
            tüm sorularınızı buradan iletebilirsiniz.
          </p>

          <div className="info-grid">
            <a className="info-card" href="tel:+905465683996">
              <div className="info-icon">
                <i className="bi bi-telephone-fill" />
              </div>
              <div>
                <h3>Telefon / WhatsApp</h3>
                <p>+90 546 568 39 96</p>
                <span>Hızlı dönüş için WhatsApp</span>
              </div>
            </a>

            <a className="info-card" href="mailto:reformakademi@gmail.com">
              <div className="info-icon">
                <i className="bi bi-envelope-fill" />
              </div>
              <div>
                <h3>E-Posta</h3>
                <p>reformakademi@gmail.com</p>
                <span>Detaylı bilgi & ön kayıt</span>
              </div>
            </a>

            <a
              className="info-card"
              href="https://instagram.com/re.form_akademi"
              target="_blank"
              rel="noreferrer"
            >
              <div className="info-icon">
                <i className="bi bi-instagram" />
              </div>
              <div>
                <h3>Instagram</h3>
                <p>@re.form_akademi</p>
                <span>Güncel duyurular</span>
              </div>
            </a>

            <div className="info-card static">
              <div className="info-icon">
                <i className="bi bi-geo-alt-fill" />
              </div>
              <div>
                <h3>Adres</h3>
                <p>Kadıköy – İstanbul</p>
                <span>Online + yüz yüze pratik</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="map-card">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Kadikoy%20Istanbul&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="form-card">
            <h2>Bize Mesaj Gönder</h2>
            <p className="muted">
              Formu doldurun, uzman ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="field">
                <label>Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Örn: Ayşe Yılmaz"
                  value={form.name}
                  onChange={update}
                  required
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>E-Posta</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ornek@mail.com"
                    value={form.email}
                    onChange={update}
                    required
                  />
                </div>

                <div className="field">
                  <label>Telefon</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+90..."
                    value={form.phone}
                    onChange={update}
                  />
                </div>
              </div>

              <div className="field">
                <label>Katılmak istediğiniz eğitim</label>
                <select
                  name="education"
                  value={form.education}
                  onChange={update}
                  required
                >
                  <option value="">Eğitim seçin</option>
                  <option value="Hamile Pilatesi Eğitimi">Hamile Pilatesi Eğitimi</option>
                  <option value="Anatomi & Pilates">Anatomi & Pilates Prensipleri</option>
                  <option value="Matwork-1">Matwork-1</option>
                  <option value="Reformer-1">Reformer-1</option>
                </select>
              </div>

              <div className="field">
                <label>Mesajınız</label>
                <textarea
                  name="message"
                  placeholder="Sorunuzu buraya yazabilirsiniz..."
                  rows="5"
                  value={form.message}
                  onChange={update}
                />
              </div>

              <button type="submit" className="btn-primary full">
                Gönder <i className="bi bi-send-fill" />
              </button>

              <p className="form-note">
                Form gönderimi KVKK kapsamında güvenli şekilde saklanır.
              </p>
            </form>
          </div>
        </motion.div>
      </section>

      {/* SEO / Extra Info */}
      <section className="contact-seo container">
        <h2>Re:Form Akademi ile Pilates Eğitmenliğine Güvenle Başlayın</h2>
        <p>
          Re:Form Akademi, fizyoterapist ve master eğitmenler tarafından oluşturulan bilim temelli
          Pilates eğitimleri sunar. Eğitim programlarımız Türkiye standartlarında profesyonel
          eğitmen yetiştirmeyi hedefler. Hamile Pilatesi Eğitmenlik Eğitimi gibi özel modüllerle
          anne adaylarına güvenli egzersiz rehberliği sağlayabilecek uzmanlar yetiştiriyoruz.
        </p>
      </section>
    </main>
  );
}
