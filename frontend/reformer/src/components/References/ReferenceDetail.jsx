import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { referencesData } from "./referencesData";
import "./ReferenceDetail.css";
import { useMemo } from "react";
import { useSeo } from "../../seo/Seo";

export default function ReferenceDetail() {
  const { slug } = useParams();

  const ref = referencesData.find(r => r.slug === slug);

  const seo = useMemo(() => {
    if (!ref) return null;

    return {
      title: `${ref.name}`,
      description: ref.description?.slice(0, 155),
      canonical: `/references/${slug}`,
      image: ref.gallery?.[0] || "/og-default.jpg",
      type: "article",
    };
  }, [ref, slug]);

  useSeo(seo || {});

  if (!ref) return <h2>Referans bulunamadı.</h2>;

  return (
    <motion.section
      className="reference-detail-page"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO */}
      <header className="references-hero premium-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-badge"><i className={ref.icon}></i> Resmi Partner</span>

            <h1>{ref.name}</h1>
            <p>{ref.tagline}</p>

            <div className="references-mini-info">
              <div><i className="bi bi-geo-alt-fill"></i> {ref.location}</div>
              <div><i className="bi bi-instagram"></i> Instagram</div>
              <div><i className="bi bi-globe"></i> Web Site</div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="reference-detail container">

        <p className="reference-description">{ref.description}</p>

        {ref.details.map((d, index) => (
          <div key={index} className="reference-section">
            <h2>{d.title}</h2>

            <ul>
              {d.items.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* GALLERY */}
        <div className="reference-gallery">
          <h2>📸 Galeri</h2>

          <div className="gallery-grid">
            {ref.gallery.map((img, index) => (
              <img key={index} src={img} alt={ref.name} />
            ))}
          </div>
        </div>

        {/* INSTAGRAM */}
        <div className="reference-social">
          <a href={ref.instagram} target="_blank" className="insta-btn">
            <i className="bi bi-instagram"></i> Instagram Sayfasını Aç
          </a>
        </div>

      </section>
    </motion.section>
  );
}
