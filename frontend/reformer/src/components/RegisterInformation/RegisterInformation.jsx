
import "./RegistrationInfo.css";

const RegistrationInfo = () => {
  return (
    <section className="registration-section" id="kayit-bilgi">
      <div className="container">
        <div className="registration-box">
          <h2>💰 Kayıt Süreci ve Ücret Bilgisi</h2>
          <p>
            Re:Form Akademi’de eğitim sürecine katılmak için aşağıdaki adımları takip edebilirsiniz.
          </p>

          <div className="registration-steps">
            <div className="step">
              <span className="step-icon">📝</span>
              <h4>1. Ön Kayıt Formu</h4>
              <p>Formu doldurarak kayıt talebinizi iletin. Ekibimiz kısa sürede sizinle iletişime geçecektir.</p>
            </div>
            <div className="step">
              <span className="step-icon">💬</span>
              <h4>2. Görüşme & Onay</h4>
              <p>Program danışmanımız sizinle iletişime geçip detayları paylaşır ve uygun tarihleri onaylar.</p>
            </div>
            <div className="step">
              <span className="step-icon">💳</span>
              <h4>3. Ödeme</h4>
              <p>Eğitim ücreti her eğitim grubunda farklı olup, nakit, kart veya havale ile ödenebilir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationInfo;
