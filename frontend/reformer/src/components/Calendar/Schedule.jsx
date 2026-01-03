import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Schedule.css";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  const formatDateRange = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);

    return `${d1.toLocaleDateString("tr-TR")} – ${d2.toLocaleDateString("tr-TR")}`;
  };

  const fetchUpcomingCourses = async () => {
    try {
      const res = await axios.get("/course"); // ➜ tüm kursları çekiyoruz
      const courses = res.data.courses || res.data || [];

      const now = new Date();

      const upcoming = courses
        .filter(c => new Date(c.startDate) >= now) 
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) 
        .slice(0, 4);

      setSchedule(upcoming);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUpcomingCourses();
  }, []);

  return (
    <section className="schedule-section" id="takvim">
      <div className="container">
        <div className="schedule-header">
          <h2>📅 Eğitim Takvimi</h2>
          <p>
            Re:Form Akademi’de yaklaşan eğitim tarihlerini aşağıda bulabilirsiniz.
            Detaylı bilgi veya ön kayıt için tıklayın.
          </p>
        </div>

        <div className="schedule-table">
          <div className="schedule-row schedule-head">
            <div>Modül</div>
            <div>Tarih</div>
            <div>Konum</div>
            <div>Format</div>
            <div>Kayıt</div>
          </div>

          {schedule.length === 0 && (
            <div className="schedule-row">
              <div style={{ gridColumn: "1 / 6", opacity: 0.6 }}>
                Yaklaşan bir eğitim bulunmuyor.
              </div>
            </div>
          )}

          {schedule.map((item) => (
            <div className="schedule-row" key={item._id}>
              <div className="module">{item.program?.title}</div>

              <div>{formatDateRange(item.startDate, item.endDate)}</div>

              <div>{item.location || "—"}</div>

              <div>{item.format || "Yüz Yüze"}</div>

              <div>
                <a
                  href={`/educations/${item.program?.slug}#apply`}
                  className="btn-small"
                >
                  Ön Kayıt
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
