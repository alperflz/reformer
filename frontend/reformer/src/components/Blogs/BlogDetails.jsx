import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./BlogDetails.css";
import { useSeo } from "../../seo/Seo";

const API_URL = import.meta.env.VITE_BASE_URL;

const BlogDetails = () => {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    const seo = useMemo(() => {
        if (!blog) return null;

        return {
            title: blog.title,
            description: blog.excerpt || blog.content?.replace(/<[^>]+>/g, "").slice(0, 155),
            canonical: `/blog/${slug}`,
            image: blog.image
                ? `${API_URL}${blog.image}`
                : "/og-default.jpg",
        };
    }, [blog, slug]);

    useSeo(seo || {});

    /* =========================
       BLOG + RELATED + COMMENTS
    ========================= */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRes = await axios.get(`/blogs/${slug}`);
                setBlog(blogRes.data);

                const relatedRes = await axios.get(`/blogs/${slug}/related`);
                setRelated(relatedRes.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);


    /* =========================
       STATES
    ========================= */
    if (loading) {
        return <div className="container">Yükleniyor...</div>;
    }

    if (!blog) {
        return (
            <div className="blog-not-found container">
                <h2>🧐 İçerik Bulunamadı</h2>
                <Link to="/blogs" className="back-btn">
                    ← Bloglara Dön
                </Link>
            </div>
        );
    }

    /* =========================
       RENDER
    ========================= */

    const imageUrl = blog.image
        ? `${API_URL}${blog.image}`
        : "/images/blog-placeholder.jpg";

    return (
        <motion.section
            className="blog-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* === HERO === */}
            <div className="blog-hero">
                <img src={imageUrl} alt={blog.title} crossOrigin="anonymous" className="blog-hero-img" />
                <div className="blog-hero-overlay"></div>
                <div className="blog-hero-text">
                    <span className="category">{blog.category}</span>
                    <h1>{blog.title}</h1>
                    <p>{blog.excerpt}</p>
                    <div className="meta">
                        <span>
                            <i className="bi bi-person"></i> {blog.author}
                        </span>
                        <span>
                            <i className="bi bi-calendar"></i>{" "}
                            {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                        </span>
                    </div>
                </div>
            </div>

            {/* === CONTENT === */}
            <div className="blog-details container">
                <div
                    className="blog-body"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* === RELATED === */}
                {related.length > 0 && (
                    <div className="related-blogs">
                        <h3>Benzer Yazılar</h3>
                        <div className="related-grid">
                            {related.map((b) => (
                                <Link
                                    key={b._id}
                                    to={`/blog/${b.slug}`}
                                    className="related-card"
                                >
                                    <img
                                        src={
                                            b.image
                                                ? `${API_URL}${b.image}`
                                                : "/images/blog-placeholder.jpg"
                                        }
                                        alt={b.title}
                                    />
                                    <div className="related-info">
                                        <h4>{b.title}</h4>
                                        <span>
                                            {new Date(b.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </motion.section>
    );
};

export default BlogDetails;
