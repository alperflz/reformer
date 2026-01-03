import { useEffect, useState } from "react";
import axios from "../../api/axios";

const CoursesList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDateTR = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  const fetchMyEnrollments = async () => {
    try {
      const res = await axios.get("/enrollments/me");
      setItems(res.data.enrollments || []);
    } catch (err) {
      console.error(err);
      alert("Eğitimler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  if (loading)
    return <div className="courses-loading">Yükleniyor...</div>;

  if (items.length === 0) {
    return (
      <div className="courses-wrapper">
        <h3 className="section-title">Alınan Eğitimler</h3>
        <p className="section-subtitle">
          Henüz bir eğitime başvuruda bulunmadınız.
        </p>
      </div>
    );
  }

  return (
    <div className="courses-wrapper">
      <h3 className="section-title">Alınan Eğitimler</h3>
      <p className="section-subtitle">
        Başvurduğunuz ve katıldığınız programlar burada listelenir.
      </p>

      <div className="courses-grid">
        {items.map((e) => {
          const courseStatus =
            e.status === "approved"
              ? "tamamlandı"
              : e.status === "pending"
                ? "basvuru"
                : "reddedildi";

          return (
            <div key={e._id} className="course-card">

              <div className="course-header">
                <h4>{e.program?.title}</h4>

                <span className={`course-status ${courseStatus}`}>
                  {e.status === "approved" && "Onaylandı"}
                  {e.status === "pending" && "Beklemede"}
                  {e.status === "rejected" && "Reddedildi"}
                </span>
              </div>

              <p className="course-instructor">
                {e.program?.instructor || "Eğitmen bilgisi yakında"}
              </p>

              <div className="course-dates">
                <span>
                  <i className="bi bi-calendar-event"></i>{" "}
                  {formatDateTR(e.course?.startDate)}
                  {e.course?.endDate
                    ? ` – ${formatDateTR(e.course.endDate)}`
                    : ""}
                </span>
              </div>

              {e.status === "approved" && (
                <button className="course-btn">
                  <i className="bi bi-patch-check-fill"></i> Sertifikayı Görüntüle
                </button>
              )}

              {e.status === "pending" && (
                <button className="course-btn secondary">
                  <i className="bi bi-hourglass-split"></i> Başvuru Detayı
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesList;
