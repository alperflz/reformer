import axios from "../../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ICON_MAP = {
    "Anatomi & Pilates Prensipleri Eğitimi": "bi bi-body-text",
    "Matwork-1 Pilates Eğitmenlik Eğitimi": "bi bi-activity",
    "Reformer-1 Pilates Eğitmenlik Eğitimi": "bi bi-gem",
    "Hamile Pilatesi Eğitmenlik Eğitimi": "bi bi-heart-pulse",
};

const DEFAULT_ICON = "bi bi-clipboard2-check";

const ProgramItem = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPrograms = async () => {
        try {
            const res = await axios.get("/programs");

            const raw = res.data?.programs ?? res.data;
            const list = Array.isArray(raw)
                ? raw
                : Array.isArray(raw?.items)
                    ? raw.items
                    : [];

            const mapped = list
                .filter((p) => p.isPublished)
                .map((p, index) => ({
                    title: p.title,
                    desc: p.desc,
                    slug: p.slug,
                    icon: ICON_MAP[p.title] || DEFAULT_ICON,
                    delay: 0.1 * (index + 1),
                }));

            setPrograms(mapped);
        } catch (error) {
            console.error("Programlar alınırken hata:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPrograms();
    }, []);

    if (loading) {
        return (
            <section className="programs-section">
                <div className="container">Yükleniyor...</div>
            </section>
        );
    }

    return (
        <div className="programs-grid">
            {programs.map((program, index) => (
                <motion.div
                    className="program-card"
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: program.delay }}
                    viewport={{ once: true }}
                >
                    <div className="program-icon">
                        <i className={program.icon}></i>
                    </div>

                    <h3>{program.title}</h3>
                    <p>{program.desc}</p>

                    <a href={`/educations/${program.slug}`} className="program-link">
                        Detaylı İncele <i className="bi bi-arrow-right"></i>
                    </a>
                </motion.div>
            ))}
        </div>
    )
}

export default ProgramItem