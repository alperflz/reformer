import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import "./CategoryPage.css"

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        const res = await axios.get("/categories");
        setCategories(res.data);
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Bu kategoriyi silmek istediğine emin misin?")) return;

        try {
            await axios.delete(`/categories/${id}`);
            fetchData();
        } catch (err) {
            alert("Kategori silinemedi!");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-container">
            <div className="category-header">
                <h1 className="admin-title">Kategoriler</h1>

                <Link to="/admin/categories/new" className="btn-primary">
                    Yeni Kategori
                </Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Sıra</th>
                        <th>Ad</th>
                        <th>Slug</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat._id}>
                            <td>{cat.order}</td>
                            <td>{cat.name}</td>
                            <td>{cat.slug}</td>
                            <td className="admin-action-buttons">
                                <a style={{ background: "#149b0a" }} href={`/admin/categories/${cat._id}`} className="admin-action-button">
                                    Düzenle
                                </a>
                                <button style={{ background: "#b91c1c" }} className="admin-action-button" onClick={() => deleteCategory(cat._id)}>
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
