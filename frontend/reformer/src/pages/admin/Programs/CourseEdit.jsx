import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

export default function CourseEdit() {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.error(err);
      alert("Kurs bilgisi alınamadı");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const update = (field, value) =>
    setCourse((prev) => ({ ...prev, [field]: value }));

  const save = async () => {
    try {
      setSaving(true);
      await axios.put(`/course/${id}`, {
        startDate: course.startDate,
        endDate: course.endDate,
        time: course.time,
        location: course.location,
        capacity: Number(course.capacity),
        price: course.price === null ? null : Number(course.price),
        isActive: course.isActive,
        isOpenForApply: course.isOpenForApply,
      });

      alert("Kurs güncellendi");
      if (course.program?.slug) {
        navigate(`/admin/programs/${course.program.slug}/courses`);
      }
    } catch (err) {
      console.error(err);
      alert("Kurs güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  if (!course) return <div className="admin-courses-loading">Yükleniyor...</div>;

  return (
    <div className="admin-courses-form">
      <h1>Kurs Düzenle — {course.program?.title}</h1>

      <label>Başlangıç Tarihi</label>
      <input
        className="admin-courses-input"
        type="date"
        value={course.startDate?.slice(0, 10) || ""}
        onChange={(e) => update("startDate", e.target.value)}
      />

      <label>Bitiş Tarihi</label>
      <input
        className="admin-courses-input"
        type="date"
        value={course.endDate?.slice(0, 10) || ""}
        onChange={(e) => update("endDate", e.target.value)}
      />

      <label>Saat</label>
      <input
        className="admin-courses-input"
        value={course.time || ""}
        onChange={(e) => update("time", e.target.value)}
      />

      <label>Lokasyon</label>
      <input
        className="admin-courses-input"
        value={course.location || ""}
        onChange={(e) => update("location", e.target.value)}
      />

      <label>Kapasite</label>
      <input
        className="admin-courses-input"
        type="number"
        value={course.capacity || 0}
        onChange={(e) => update("capacity", e.target.value)}
      />

      <label>Fiyat</label>
      <input
        className="admin-courses-input"
        type="number"
        value={course.price ?? ""}
        onChange={(e) =>
          update("price", e.target.value === "" ? null : e.target.value)
        }
      />

      <label>Aktif mi?</label>
      <select
        className="admin-courses-input"
        value={course.isActive ? "true" : "false"}
        onChange={(e) => update("isActive", e.target.value === "true")}
      >
        <option value="true">Evet</option>
        <option value="false">Hayır</option>
      </select>

      <label>Başvuruya Açık mı?</label>
      <select
        className="admin-courses-input"
        value={course.isOpenForApply ? "true" : "false"}
        onChange={(e) => update("isOpenForApply", e.target.value === "true")}
      >
        <option value="true">Evet</option>
        <option value="false">Hayır</option>
      </select>

      <button
        className="admin-courses-btn-primary"
        onClick={save}
        disabled={saving}
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
