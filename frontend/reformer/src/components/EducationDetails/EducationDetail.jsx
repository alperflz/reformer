import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "../../api/axios";
import { programsMock } from "./mockPrograms";
import "./EducationDetail.css";
import EnrollmentModal from "../Enrollment/EnrollmentModal";
import { useSelector } from "react-redux";
import { useSeo } from "../../seo/Seo";
const BASE = import.meta.env.VITE_BASE_URL;

export default function EducationDetail() {
    const { slug } = useParams();
    const [program, setProgram] = useState(null);
    const [nearestCourse, setNearestCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [upcomingCourses, setUpcomingCourses] = useState([]);
    const { user } = useSelector((state) => state.auth);


    const mockData = useMemo(
        () => programsMock.find((p) => p.slug === slug),
        [slug]
    );

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            weekday: "long",
        });
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`/programs/slug/${slug}`);
            const backendProgram = res.data.program;

            const cRes = await axios.get(`/course/program/${backendProgram._id}`);
            const courses = cRes.data.courses || [];

            const upcoming = courses
                .filter((c) => c?.startDate && new Date(c.startDate) >= new Date())
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            setUpcomingCourses(upcoming);
            setNearestCourse(upcoming[0] || null);

            const upcomingCourses = (courses || []).filter(
                c => new Date(c.startDate) >= new Date()
            );

            if (upcomingCourses.length > 0) {
                const nearest = [...upcomingCourses].sort(
                    (a, b) => new Date(a.startDate) - new Date(b.startDate)
                )[0];
                setNearestCourse(nearest);
            }

            const merged = {
                ...backendProgram,
                subtitle: backendProgram.desc || mockData?.subtitle || "",
                badge: mockData?.badge || { icon: "bi-star", label: backendProgram.badgeText || "" },
                miniInfo: mockData?.miniInfo || [],
                instructor: mockData?.instructor || null,
                cta: mockData?.cta || {
                    text: "Ön kayıt için bizimle iletişime geçebilirsiniz.",
                    formUrl: "#",
                    whatsappUrl: "#",
                },
            };

            setProgram(merged);

        } catch (err) {
            console.error(err);
            alert("Eğitim bilgileri yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [slug]);

    const seo = useMemo(() => {
        if (!program) return null;

        return {
            title: program.title,
            description: program.overview?.slice(0, 155),
            canonical: `/educations/${slug}`,
            image: program.gallery?.[0]
                ? `${BASE}${program.gallery[0].src}`
                : "/og-default.jpg",
        };
    }, [program, slug]);

    useSeo(seo || {});



    if (loading) return <div className="loading-page">Yükleniyor...</div>;
    if (!program) return <div className="error-page">Eğitim bulunamadı</div>;

    const {
        badge,
        title,
        subtitle,
        overview,
        outcomes,
        curriculum,
        whoCanJoin,
        faq,
        gallery,
        cta,
    } = program;

    return (
        <>
            <motion.section
                className="edu-detail-page"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* HERO */}
                <header className="edu-hero premium-hero">
                    <div className="edu-hero-inner">
                        <div className="hero-text">
                            {badge?.label && (
                                <span className="hero-badge">
                                    <i className={`bi ${badge.icon}`} /> {badge.label}
                                </span>
                            )}

                            <h1>{title}</h1>
                            <p>{subtitle}</p>

                            <div className="hero-actions">
                                <a
                                    onClick={() => setModalOpen(true)}
                                    className="btn-primary"
                                >
                                    <i className="bi bi-send-fill" /> Ön Kayıt
                                </a>
                                <Link to="/educations" className="btn-outline">
                                    <i className="bi bi-grid-3x3-gap" /> Tüm Eğitimler
                                </Link>
                            </div>

                            <div className="edu-mini-info">
                                {nearestCourse ? (
                                    <>
                                        <div>
                                            <i className="bi bi-calendar-event"></i>
                                            {formatDate(nearestCourse.startDate)}
                                        </div>

                                        <div>
                                            <i className="bi bi-clock"></i>
                                            {nearestCourse.time}
                                        </div>

                                        <div>
                                            <i className="bi bi-geo-alt-fill"></i>
                                            {nearestCourse.location}
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <i className="bi bi-exclamation-circle"></i>
                                        Yaklaşan tarih bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="edu-layout container">
                    <aside className="edu-sidebar">
                        <nav>
                            <a href="#overview">Genel Bakış</a>
                            <a href="#outcomes">Kazanımlar</a>
                            <a href="#curriculum">Eğitim İçeriği</a>
                            <a href="#who">Kimler Katılabilir?</a>
                            <a href="#info">Eğitim Bilgileri</a>
                            <a href="#faq">S.S.S.</a>
                            <a href="#apply" className="apply-btn">Ön Kayıt</a>
                        </nav>
                    </aside>

                    <main className="edu-content">
                        {/* GENEL BAKIŞ */}
                        <section id="overview" className="edu-card">
                            <h2>📌 Genel Bakış</h2>
                            <p>{overview}</p>
                        </section>

                        {/* KAZANIMLAR */}
                        <section id="outcomes" className="edu-card">
                            <h2>✅ Eğitim Sonunda Neler Kazanırsın?</h2>
                            <ul className="edu-checklist">
                                {outcomes?.map((o, idx) => (
                                    <li key={idx}>{o}</li>
                                ))}
                            </ul>
                        </section>

                        {/* GALERİ */}
                        {!!gallery?.length && (
                            <section className="edu-gallery">
                                {gallery.map((img, idx) => {

                                    const imageUrl = `${BASE}${img.src}`;

                                    return (
                                        <img
                                            key={idx}
                                            src={imageUrl}
                                            alt={img.alt || ""}
                                            crossOrigin="anonymous"
                                        />
                                    );
                                })}
                            </section>
                        )}

                        {/* CURRICULUM */}
                        <section id="curriculum" className="edu-card">
                            <h2>🎓 Eğitim İçeriği</h2>

                            <div className="curriculum-grid">
                                {curriculum?.map((c, idx) => (
                                    <div key={idx} className="curriculum-item">
                                        <div className="curriculum-icon">
                                            <i className="bi bi-check-circle" />
                                        </div>
                                        <div>
                                            <h3>{c.title}</h3>
                                            <p>{c.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* KİMLER KATILABİLİR */}
                        <section id="who" className="edu-card">
                            <h2>👩‍🏫 Kimler Katılabilir?</h2>
                            <ul className="edu-list">
                                {whoCanJoin?.map((w, idx) => (
                                    <li key={idx}>{w}</li>
                                ))}
                            </ul>
                        </section>

                        {/* EĞİTİM BİLGİLERİ (EN YAKIN KURS) */}
                        <section id="info" className="edu-card edu-info-card">
                            <h2>🗓 Eğitim Bilgileri</h2>

                            {!nearestCourse ? (
                                <p>Bu eğitim için yaklaşan tarih bulunmuyor.</p>
                            ) : (
                                <div className="edu-info-list">
                                    <div className="edu-info-item">
                                        <i className="bi bi-calendar-event"></i>
                                        <div>
                                            <strong>Tarih</strong>
                                            <span>{formatDate(nearestCourse.startDate)}</span>
                                        </div>
                                    </div>

                                    <div className="edu-info-item">
                                        <i className="bi bi-clock"></i>
                                        <div>
                                            <strong>Saat</strong>
                                            <span>{nearestCourse.time}</span>
                                        </div>
                                    </div>

                                    <div className="edu-info-item">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        <div>
                                            <strong>Lokasyon</strong>
                                            <span>{nearestCourse.location}</span>
                                        </div>
                                    </div>

                                    <div className="edu-info-item">
                                        <i className="bi bi-people-fill"></i>
                                        <div>
                                            <strong>Kontenjan</strong>
                                            <span>{nearestCourse.capacity} kişi</span>
                                        </div>
                                    </div>

                                    <div className="edu-info-item">
                                        <i className="bi bi-credit-card"></i>
                                        <div>
                                            <strong>Ücret</strong>
                                            <span>{nearestCourse.price} ₺</span>
                                        </div>
                                    </div>

                                    <div className="edu-info-item">
                                        <i className="bi bi-check-circle"></i>
                                        <div>
                                            <strong>Başvuru Durumu</strong>
                                            <span>{nearestCourse.isOpenForApply ? "Açık" : "Kapalı"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* SSS */}
                        <section id="faq" className="edu-card">
                            <h2>❓ Sık Sorulan Sorular</h2>
                            <div className="edu-faq">
                                {faq?.map((f, idx) => (
                                    <details key={idx}>
                                        <summary>{f.q}</summary>
                                        <p>{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <section id="apply" className="edu-cta-card">
                            <h2>📩 Ön Kayıt</h2>
                            <p>{cta.text}</p>

                            <div className="cta-buttons">
                                <a
                                    onClick={() => setModalOpen(true)}
                                    className="btn-primary"
                                >
                                    <i className="bi bi-send-fill" /> Ön Kayıt
                                </a>
                                <a href={cta.whatsappUrl} target="_blank" rel="noreferrer" className="btn-outline">
                                    <i className="bi bi-whatsapp" /> WhatsApp
                                </a>
                            </div>
                        </section>
                    </main>
                    <EnrollmentModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        courses={upcomingCourses}
                        program={program}
                        user={user}
                        onRequireLogin={() => setLoginPopup(true)}
                    />

                    {loginPopup && <LoginModal onClose={() => setLoginPopup(false)} />}
                </div>
            </motion.section>
        </>
    );
}
