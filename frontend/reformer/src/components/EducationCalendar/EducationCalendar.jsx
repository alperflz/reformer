import { useMemo, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../api/axios";
import "./EducationCalendar.css";


const getMonthKey = (dateStr) => dateStr.slice(0, 7);

const formatMonth = (monthKey) => {
    const d = new Date(`${monthKey}-01`);
    return d.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
};

const formatDay = (dateStr) =>
    new Date(dateStr).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
    });

const buildCalendarGrid = (monthKey, events) => {
    const base = new Date(`${monthKey}-01`);
    const year = base.getFullYear();
    const month = base.getMonth();

    const firstDay = new Date(year, month, 1);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
        const dayStr = String(d).padStart(2, "0");
        const iso = `${monthKey}-${dayStr}`;
        const dayEvents = events.filter((e) => e.date === iso);
        cells.push({ day: d, iso, events: dayEvents });
    }

    return cells;
};


export default function EducationCalendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = useMemo(() => new Date(), []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("/course");
                const list = res.data.courses || [];

                const mapped = list.map((c) => {
                    const start = c.startDate.slice(0, 10);
                    const end = c.endDate.slice(0, 10);

                    return {
                        title: c.program?.title || "Eğitim",
                        slug: c.program?.slug || "",
                        category: c.program?.categoryName || "",
                        level: c.program?.level || "",
                        date: start,
                        end: end,
                        time: c.time || "",
                        location: c.location || "",
                        price: c.price,
                        badge: c.program?.badgeText || null,
                        isPast: new Date(end) < today
                    };
                });

                setEvents(mapped);
            } catch (err) {
                console.error(err);
                alert("Eğitim takvimi yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [today]);

    const futureEvents = useMemo(
        () => events.filter(e => new Date(e.end) >= today),
        [events, today]
    );

    const pastEvents = useMemo(
        () => events.filter(e => new Date(e.end) < today),
        [events, today]
    );

    const upcoming = useMemo(
        () => events.filter((e) => new Date(e.date) >= today),
        [events, today]
    );

    const months = useMemo(() => {
        const allMonths = [...new Set(events.map(e => getMonthKey(e.date)))];

        return allMonths.filter(m => {
            const monthEnd = new Date(m + "-31");
            const diff = (monthEnd - today) / (1000 * 60 * 60 * 24);
            return diff >= -5;
        }).sort();
    }, [events, today]);


    const [selectedMonth, setSelectedMonth] = useState("");

    useEffect(() => {
        if (!selectedMonth && months.length) {
            setSelectedMonth(months[0]);
        }
    }, [months, selectedMonth]);

    const [view, setView] = useState("list");
    const [category, setCategory] = useState("Tümü");
    const [level, setLevel] = useState("Tümü");

    const categories = useMemo(
        () => ["Tümü", ...new Set(upcoming.map((e) => e.category))],
        [upcoming]
    );

    const levels = useMemo(
        () => ["Tümü", ...new Set(upcoming.map((e) => e.level))],
        [upcoming]
    );

    const filtered = useMemo(() => {
        if (!selectedMonth) return [];
        return upcoming.filter((e) => {
            const inMonth = getMonthKey(e.date) === selectedMonth;
            const inCat = category === "Tümü" || e.category === category;
            const inLvl = level === "Tümü" || e.level === level;
            return inMonth && inCat && inLvl;
        });
    }, [upcoming, selectedMonth, category, level]);

    const gridCells = useMemo(
        () => (selectedMonth ? buildCalendarGrid(
            selectedMonth,
            [...futureEvents, ...pastEvents]
        ) : []),
        [selectedMonth, futureEvents, pastEvents]
    );

    const monthStats = useMemo(() => {
        const count = filtered.length;
        const nearest =
            filtered
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;
        return { count, nearest };
    }, [filtered]);

    if (loading) {
        return <div className="loading-page">Yükleniyor...</div>;
    }

    if (!months.length) {
        return (
            <section className="calendar-page">
                <div className="calendar-header">
                    <h1>Eğitim Takvimi</h1>
                    <p>Şu anda yaklaşan eğitim bulunmuyor.</p>
                </div>
                <div className="calendar-empty">
                    <i className="bi bi-calendar-x"></i>
                    <h3>Yeni dönemler yakında açılacak</h3>
                    <p>Duyurular için blog ve Instagram hesabımızı takip edebilirsin.</p>
                    <a className="btn-primary" href="/blogs">
                        Bloga Git
                    </a>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            className="calendar-page"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <header className="calendar-header premium-hero">
                <div className="calendar-hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-calendar-event-fill" /> Yaklaşan Eğitimler
                        </span>
                        <h1>Eğitim Takvimi</h1>
                        <p>
                            Yaklaşan eğitim dönemlerini ay bazında görüntüleyin, program
                            detaylarına hızlıca geçiş yapın ve ön kayıt formuna ulaşın.
                        </p>

                        <div className="calendar-mini-info">
                            <div>
                                <i className="bi bi-lightning-charge-fill" />
                                Güncel dönemler otomatik listelenir
                            </div>
                            <div>
                                <i className="bi bi-eye-fill" />
                                Geçmiş aylar gizlenir
                            </div>
                            <div>
                                <i className="bi bi-shield-check" />
                                Güvenli ön kayıt süreci
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="calendar-toolbar">
                    <div className="calendar-month-tabs">
                        {months.map((m) => (
                            <button
                                key={m}
                                className={m === selectedMonth ? "active" : ""}
                                onClick={() => setSelectedMonth(m)}
                                type="button"
                            >
                                {formatMonth(m)}
                                {m === selectedMonth && <span className="tab-dot" />}
                            </button>
                        ))}
                    </div>

                    <div className="calendar-filters">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select value={level} onChange={(e) => setLevel(e.target.value)}>
                            {levels.map((l) => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>

                        <div className="view-toggle">
                            <button
                                className={view === "list" ? "active" : ""}
                                onClick={() => setView("list")}
                                aria-label="Liste görünümü"
                                type="button"
                            >
                                <i className="bi bi-list-ul" />
                            </button>
                            <button
                                className={view === "grid" ? "active" : ""}
                                onClick={() => setView("grid")}
                                aria-label="Takvim görünümü"
                                type="button"
                            >
                                <i className="bi bi-grid-3x3-gap" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="calendar-stats">
                    <div className="stat-card">
                        <span className="stat-label">Bu ay toplam</span>
                        <span className="stat-value">{monthStats.count} eğitim</span>
                    </div>
                    {monthStats.nearest && (
                        <div className="stat-card">
                            <span className="stat-label">En yakın eğitim</span>
                            <span className="stat-value">
                                {monthStats.nearest.title} •{" "}
                                {formatDay(monthStats.nearest.date)} - {formatDay(monthStats.nearest.end)}
                            </span>
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {view === "list" ? (
                        <motion.div
                            key="list"
                            className="calendar-list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                        >
                            {!filtered.length ? (
                                <div className="calendar-empty small">
                                    <i className="bi bi-filter-circle" />
                                    <p>Seçtiğiniz filtrelerde eğitim bulunamadı.</p>
                                    <button
                                        className="btn-outline"
                                        type="button"
                                        onClick={() => {
                                            setCategory("Tümü");
                                            setLevel("Tümü");
                                        }}
                                    >
                                        Filtreleri Sıfırla
                                    </button>
                                </div>
                            ) : (
                                filtered.map((item, idx) => (
                                    <motion.article
                                        key={item.slug + item.date}
                                        className="calendar-card"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.06 }}
                                    >
                                        <div className="calendar-date">
                                            <span className="day">
                                                {new Date(item.date).getDate()}
                                            </span>
                                            <span className="month">
                                                {new Date(item.date).toLocaleDateString("tr-TR", {
                                                    month: "short",
                                                })}
                                            </span>
                                        </div>

                                        <div className="calendar-info">
                                            <div className="calendar-title-row">
                                                <h3>{item.title}</h3>
                                                {item.badge && (
                                                    <span className="badge">{item.badge}</span>
                                                )}
                                            </div>

                                            <div className="calendar-meta">
                                                <span>
                                                    <i className="bi bi-calendar-range" />
                                                    {formatDay(item.date)} - {formatDay(item.end)}
                                                </span>
                                                <span>
                                                    <i className="bi bi-clock" /> {item.time}
                                                </span>
                                                <span>
                                                    <i className="bi bi-geo-alt" /> {item.location}
                                                </span>
                                                <span>
                                                    <i className="bi bi-layers" /> {item.level}
                                                </span>
                                                <span>
                                                    <i className="bi bi-tags" /> {item.category}
                                                </span>
                                            </div>

                                            <div className="calendar-actions">
                                                <a
                                                    className="calendar-link"
                                                    href={`/educations/${item.slug}`}
                                                >
                                                    Detayları Gör <i className="bi bi-arrow-right" />
                                                </a>
                                                <a
                                                    className="btn-primary small"
                                                    href={`/educations/${item.slug}#apply`}
                                                >
                                                    Ön Kayıt
                                                </a>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            className="calendar-grid-wrap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="calendar-weekdays">
                                {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((w) => (
                                    <div key={w}>{w}</div>
                                ))}
                            </div>

                            <div className="calendar-grid">
                                {gridCells.map((cell, idx) => (
                                    <div
                                        key={idx}
                                        className={`grid-cell ${cell?.events?.some(ev => !ev.isPast) ? "has-event" : ""
                                            } ${cell?.events?.every(ev => ev.isPast) ? "past-event" : ""}`}

                                    >
                                        {cell && (
                                            <>
                                                <div className="grid-day">{cell.day}</div>
                                                {!!cell.events.length && (
                                                    <div className="grid-events">
                                                        {cell.events.map((ev) => (
                                                            <a
                                                                key={ev.slug + ev.date}
                                                                href={`/educations/${ev.slug}`}
                                                                className={`grid-event-pill ${ev.isPast ? "past" : ""}`}
                                                                title={`${ev.title}
                                                                📅 ${formatDay(ev.date)} → ${formatDay(ev.end)}
                                                                🕒 ${ev.time}
                                                                📍 ${ev.location}`}

                                                            >
                                                                {ev.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}
