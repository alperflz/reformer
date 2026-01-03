import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

export default function CourseCreate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [program, setProgram] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        time: "",
        location: "Kadıköy / İstanbul",
        capacity: 20,
        price: "",
        isActive: true,
        isOpenForApply: true,
    });

    useEffect(() => {
        axios
            .get(`/programs/${id}`)
            .then((res) => setProgram(res.data.program))
            .catch((err) => {
                console.error(err);
                alert("Program bulunamadı");
            });
    }, [id]);

    const update = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const save = async () => {
        if (!form.startDate || !form.endDate) {
            return alert("Başlangıç ve bitiş tarihi zorunludur.");
        }
        if (!program?._id) return alert("Program bilgisi yüklenemedi");

        try {
            setSaving(true);
            await axios.post("/course", {
                program: program._id,
                ...form,
                capacity: Number(form.capacity),
                price: form.price === "" ? undefined : Number(form.price),
            });

            alert("Kurs oluşturuldu");
            navigate(`/admin/programs/${id}/courses`);
        } catch (err) {
            console.error(err);
            alert("Kurs oluşturulamadı");
        } finally {
            setSaving(false);
        }
    };

    if (!program) return <div className="admin-courses-loading">Program yükleniyor...</div>;

    return (
        <div className="admin-courses-form">
            <h1>{program.title} — Yeni Kurs / Tarih</h1>

            <label>Başlangıç Tarihi</label>
            <input
                className="admin-courses-input"
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
            />

            <label>Bitiş Tarihi</label>
            <input
                className="admin-courses-input"
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
            />

            <label>Saat</label>
            <input
                className="admin-courses-input"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                placeholder="10:00 – 17:00"
            />

            <label>Lokasyon</label>
            <input
                className="admin-courses-input"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
            />

            <label>Kapasite</label>
            <input
                className="admin-courses-input"
                type="number"
                value={form.capacity}
                onChange={(e) => update("capacity", e.target.value)}
            />

            <label>Fiyat (boş bırakılırsa program fiyatı kullanılır)</label>
            <input
                className="admin-courses-input"
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
            />

            <label>Aktif mi?</label>
            <select
                className="admin-courses-input"
                value={form.isActive ? "true" : "false"}
                onChange={(e) => update("isActive", e.target.value === "true")}
            >
                <option value="true">Evet</option>
                <option value="false">Hayır</option>
            </select>

            <label>Başvuruya Açık mı?</label>
            <select
                className="admin-courses-input"
                value={form.isOpenForApply ? "true" : "false"}
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
                {saving ? "Kaydediliyor..." : "Oluştur"}
            </button>
        </div>
    );
}
