import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../api/axios";

export default function ProgramCourses() {
    const { id } = useParams();

    const [program, setProgram] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const pRes = await axios.get(`/programs/${id}`);
            const programData = pRes.data.program;
            setProgram(programData);

            const cRes = await axios.get(`/course/program/${programData._id}`);
            const coursesData = cRes.data.courses || cRes.data;
            setCourses(coursesData || []);
        } catch (err) {
            console.error(err);
            alert("Program veya kurslar yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const deleteCourse = async (id) => {
        if (!window.confirm("Bu kursu silmek istediğinize emin misiniz?")) return;

        try {
            await axios.delete(`/course/${id}`);
            setCourses((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            console.error(err);
            alert("Kurs silinemedi");
        }
    };

    if (loading) return <div className="admin-courses-loading">Yükleniyor...</div>;
    if (!program) return <div>Program bulunamadı</div>;

    return (
        <div className="admin-courses-page">
            <div className="admin-courses-header">
                <div>
                    <h1>{program.title} — Kurs Tarihleri</h1>
                </div>
                <Link
                    to={`/admin/programs/${program._id}/courses/new`}
                    className="admin-courses-btn-primary"
                >
                    + Yeni Kurs / Tarih
                </Link>
            </div>

            <table className="admin-courses-table">
                <thead>
                    <tr>
                        <th>Başlangıç</th>
                        <th>Bitiş</th>
                        <th>Saat</th>
                        <th>Lokasyon</th>
                        <th>Kapasite</th>
                        <th>Fiyat</th>
                        <th>Başvuru</th>
                        <th>Aktif</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((c) => (
                        <tr key={c._id}>
                            <td>{c.startDate?.slice(0, 10)}</td>
                            <td>{c.endDate?.slice(0, 10)}</td>
                            <td>{c.time || "-"}</td>
                            <td>{c.location}</td>
                            <td>{c.capacity}</td>
                            <td>{c.price ?? program.price}₺</td>
                            <td>{c.isOpenForApply ? "Açık" : "Kapalı"}</td>
                            <td>{c.isActive ? "Aktif" : "Pasif"}</td>
                            <td>
                                <div className="admin-courses-actions">
                                    <Link
                                        to={`/admin/courses/${c._id}/edit`}
                                        className="admin-courses-btn-small"
                                    >
                                        Düzenle
                                    </Link>
                                    <button
                                        className="admin-courses-btn-small admin-courses-btn-danger"
                                        onClick={() => deleteCourse(c._id)}
                                    >
                                        Sil
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {courses.length === 0 && (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center", opacity: 0.7 }}>
                                Bu programa ait kurs/tarih bulunmuyor.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
