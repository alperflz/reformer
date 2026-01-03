import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./BlogCard.css";
const API_URL = import.meta.env.VITE_BASE_URL;

const BlogCard = ({ blog }) => {
  const imageUrl = blog.image
    ? `${API_URL}${blog.image}`
    : "/images/blog-placeholder.jpg";
  return (
    <motion.article
      className="blog-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* IMAGE */}
      <div className="blog-image">
    <img
          src={imageUrl}
          alt={blog.title}
          loading="lazy"
          crossOrigin="anonymous"
        />
      </div>

      {/* CONTENT */}
      <div className="blog-content">
        <span className="blog-category">{blog.category}</span>

        <h3 className="blog-title">{blog.title}</h3>

        {blog.excerpt && (
          <p className="blog-excerpt">{blog.excerpt}</p>
        )}

        <div className="blog-meta">
          <span>{blog.author || "Re:Form Akademi"}</span>
          <span>•</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
          </span>
        </div>

        {/* SPA LINK */}
        <Link to={`/blog/${blog.slug}`} className="read-more">
          Devamını Oku →
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
