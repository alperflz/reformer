
import ProgramItem from '../Programs/ProgramItem'
import './Education.css'

const Education = () => {

    return (
        <section className="education-page-section" id="programlar">
            <header className="calendar-header premium-hero">
                <div className="calendar-hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-mortarboard-fill" /> Eğitim Programlarımız
                        </span>

                        <h1>Profesyonel Pilates Eğitimleri</h1>

                        <p>
                            Re:Form Akademi’de tüm eğitimler bilim temelli içerik, uygulamalı
                            modüller ve profesyonel eğitmenlik hedefiyle tasarlanır.
                            Size uygun programı keşfedin ve kariyerinize güçlü bir adım atın.
                        </p>

                        <div className="calendar-mini-info">
                            <div>
                                <i className="bi bi-patch-check-fill" />
                                Sertifikalı ve güncel müfredat
                            </div>
                            <div>
                                <i className="bi bi-people-fill" />
                                Uzman eğitmen kadrosu
                            </div>
                            <div>
                                <i className="bi bi-send-check-fill" />
                                Kolay ve güvenli ön kayıt
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <ProgramItem />
            </div>
        </section>
    )
}

export default Education