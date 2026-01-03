import React, { useEffect, useState } from "react";
import "./Instructors.css";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // mock data (backend'e hazır yapı)
    const mockData = [
      {
        id: 1,
        name: "Uzm. Fzt. Ayşe Demir",
        title: "Fizyoterapist & Pilates Master Eğitmeni",
        img: "/images/person.jpg",
      },
      {
        id: 2,
        name: "Fzt. Mert Kaya",
        title: "Reformer & Matwork Uzmanı",
        img: "/images/person.jpg",
      },
      {
        id: 3,
        name: "Dr. Elif Aksoy",
        title: "Anatomi & Hareket Analizi Eğitmeni",
        img: "/images/person.jpg",
      },
    ];
    setInstructors(mockData);
  }, []);

  return (
    <section className="instructors-section" id="egitmenler">
      <div className="container">
        <div className="instructors-header">
          <h2>👩‍🏫 Eğitmenlerimiz</h2>
          <p>
            Re:Form Akademi, alanında uzman fizyoterapist ve master eğitmenlerden oluşan bir kadroya sahiptir.
            Eğitmenlerimiz, bilimin ışığında modern ve güvenli Pilates eğitimleri sunar.
          </p>
        </div>

        <div className="instructors-grid">
          {instructors.map((inst) => (
            <div className="instructor-card" key={inst.id}>
              <div className="instructor-img">
                <img src={inst.img} alt={inst.name} />
              </div>
              <div className="instructor-info">
                <h4>{inst.name}</h4>
                <p>{inst.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
