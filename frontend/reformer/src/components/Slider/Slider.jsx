import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Slider.css";

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "🎓 Re:Form Akademi’ye Hoş Geldiniz",
      subtitle: "Pilates eğitmenliğinde profesyonelliğe giden yol burada başlıyor.",
      description:
        "Türkiye’nin önde gelen fizyoterapist ve master eğitmenlerinden oluşan ekibimizle, bilim temelli ve modern yaklaşımla sizi profesyonel eğitmenliğe hazırlıyoruz.",
      img: "/images/slider1.png",
      buttonText: "Eğitimleri Keşfet",
      buttonLink: "/egitimler",
    },
    {
      id: 2,
      title: "💫 Profesyonel Eğitmenlik Yolculuğu",
      subtitle: "Anatomi, Reformer ve Matwork eğitimleriyle güçlü bir temel oluştur.",
      description:
        "Teoriyi pratiğe dönüştür, mentorluk ve staj desteğiyle sektöre hazır hale gel.",
      img: "/images/slider2.png",
      buttonText: "Programları İncele",
      buttonLink: "/programlar",
    },
    {
      id: 3,
      title: "🌙 Bilimin Işığında Hareket",
      subtitle: "Bedenin dilini yeniden yazıyoruz.",
      description:
        "Re:Form Akademi ile yalnızca hareket etmeyi değil, bedeni anlamayı ve öğretmeyi öğren.",
      img: "/images/slider3.png",
      buttonText: "Ön Kayıt Oluştur",
      buttonLink: "https://forms.gle/49Vryt6WDbL9stsU7",
    },
  ];

  const features = [
    {
      icon: "bi bi-lightbulb-fill",
      text: "Bilim Temelli Eğitim",
    },
    {
      icon: "bi bi-activity",
      text: "Uygulamalı Öğrenim",
    },
    {
      icon: "bi bi-mortarboard-fill",
      text: "Kariyer & Mentorluk",
    },
  ];

  return (
    <section className="reform-slider">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        speed={1200}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} slider-progress"></span>`,
        }}
        className="reformSwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slider-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="slider-overlay"></div>
              <div className="slider-container">
                <motion.div
                  className="slider-text"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1>{slide.title}</h1>
                  <h3>{slide.subtitle}</h3>
                  <p>{slide.description}</p>
                  <a href={slide.buttonLink} className="btn-slider-primary">
                    {slide.buttonText}
                  </a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-bottom-bar">
        <div className="slider-features">
          {features.map((item, i) => (
            <div className="feature-item" key={i}>
              <i className={item.icon}></i>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
