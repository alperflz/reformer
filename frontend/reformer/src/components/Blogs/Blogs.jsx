import { useEffect, useState } from "react";
import axios from "../../api/axios";
import BlogList from "./BlogList";
import BlogFilter from "./BlogFilter";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Blogs.css";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/blogs", {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            })
            .then((res) => {
                console.log("BLOG RESPONSE:", res.data);
                const published = (res.data || []).filter(b => b.isPublished);
                setBlogs(published);
            })
            .catch((err) => {
                console.error("Bloglar yüklenemedi:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const categories = Array.from(
        new Set(
            blogs
                .map((b) => b.category?.trim())
                .filter(Boolean)
        )
    );


    const filteredBlogs =
        selectedCategory === "Tümü"
            ? blogs
            : blogs.filter((b) => b.category === selectedCategory);

    if (loading) {
        return <div className="container">Yükleniyor...</div>;
    }

    return (
        <motion.section
            className="blogs-page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* HERO */}
            <header className="blogs-hero premium-hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-journal-richtext"></i> Blog & Haberler
                        </span>

                        <h1>Pilates, Anatomi ve Eğitmenlik Üzerine Güncel Yazılar</h1>

                        <p>
                            Bilim temelli Pilates eğitimleri, hareket analizi, eğitmenlik püf noktaları
                            ve Re:Form Akademi’den güncel içerikler.
                        </p>

                        <div className="hero-mini-info">
                            <div><i className="bi bi-lightning-charge-fill"></i> Haftalık yeni içerik</div>
                            <div><i className="bi bi-bookmark-star-fill"></i> Eğitmenlere özel ipuçları</div>
                            <div><i className="bi bi-globe2"></i> SEO optimize bilgi merkezi</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <div className="container">
                <BlogFilter
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <BlogList blogs={filteredBlogs} />
            </div>
        </motion.section>
    );
};

export default Blogs;
