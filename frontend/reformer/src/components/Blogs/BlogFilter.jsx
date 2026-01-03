import React from "react";
import "./BlogFilter.css";

const BlogFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="blog-filter">
      {["Tümü", ...categories].map((cat, i) => (
        <button
          key={`${cat}-${i}`}
          className={`filter-btn ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};


export default BlogFilter;
