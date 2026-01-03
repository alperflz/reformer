import { useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./HelpCenter.css";

const FAQ_DATA = [
    {
        section: "Eğitim Programları",
        items: [
            {
                q: "Re:Form Akademi’de hangi eğitimler bulunuyor?",
                a: "Re:Form Akademi, Pilates eğitmenliği yolculuğunu adım adım takip edebilmeniz için üç temel modül sunar: (1) Anatomi & Pilates Prensipleri, (2) Matwork-1 (Mat Pilates Eğitimi), (3) Reformer-1 (Aletli Pilates Eğitimi). Tüm modüller fizyoterapist master eğitmenler tarafından bilimsel temelli olarak hazırlanır."
            },
            {
                q: "Modülleri hangi sırayla almalıyım?",
                a: "Önerilen öğrenim yolu şu şekildedir: 'Anatomi & Pilates Prensipleri → Matwork-1 → Reformer-1'. Bu sıra, bedeni anlamayı ve öğretme metodolojisini doğru temellerle öğrenmenizi sağlar. Ancak spor geçmişi olan katılımcılarımız için eğitmenlerimiz ön değerlendirme yaparak alternatif yol haritaları oluşturabilir."
            },
            {
                q: "Eğitim içerikleri bilimsel ve güncel mi?",
                a: "Evet. Tüm eğitim içerikleri fizyoterapist master eğitmen ekibimiz tarafından güncel bilimsel kaynaklar, klinik deneyimler, hareket analizi yaklaşımları ve modern öğretim metodolojileri ile hazırlanır. Her dönem yeni araştırmalar doğrultusunda güncellemeler yapılır."
            },
            {
                q: "Eğitim dili ve formatı nasıldır?",
                a: "Eğitim dili Türkçedir. Eğitimlerin teorik bölümleri bazı dönemlerde online olabilir; pratik uygulamalar ise tamamıyla yüz yüze stüdyo ortamında gerçekleşir. Her modül; sunumlar, uygulamalar, analizler, öğrenci pratikleri ve eğitmen geri bildirimleri ile yürütülür."
            }
        ]
    },

    {
        section: "Kayıt & Ücret",
        items: [
            {
                q: "Eğitime nasıl kayıt olabilirim?",
                a: "Ön kayıt formunu doldurmanız yeterlidir. Form tarafımıza ulaştıktan sonra eğitim danışmanlarımız sizinle iletişime geçerek kontenjan durumunu, eğitim tarihlerini ve uygunluğunuzu değerlendirir. Uygunluk sonrası kesin kayıt işleminiz tamamlanır."
            },
            {
                q: "Eğitim ücretleri nelerdir?",
                a: "Güncel eğitim ücretleri dönemsel olarak değişiklik gösterebilir. Eğitim sayfalarımızda güncel fiyatlar yer almaktadır. Ayrıca erken kayıt avantajları, çoklu modül indirimleri ve dönemsel kampanyalar sunulabilir."
            },
            {
                q: "Hangi ödeme yöntemleri mevcut?",
                a: "Ödeme yöntemleri: (1) Nakit, (2) Kredi/Banka kartı, (3) Taksit seçenekleri, (4) Havale/EFT. Bazı dönemlerde özel taksit kampanyaları sunulabilir."
            },
            {
                q: "Erken kayıt indirimi var mı?",
                a: "Evet, dönem başlangıcından önce belirli bir tarihe kadar geçerli erken kayıt indirimleri sunulur. Kampanyalar, duyurular bölümünde ve sosyal medya hesaplarımızda paylaşılır."
            }
        ]
    },

    {
        section: "Eğitim Süreci & Katılım",
        items: [
            {
                q: "Eğitimler nerede gerçekleştiriliyor?",
                a: "Pratik eğitimlerimiz Kadıköy – İstanbul’daki profesyonel Pilates stüdyomuzda yapılmaktadır. Teorik eğitimler ise dönem yoğunluğuna bağlı olarak online veya sınıf ortamında gerçekleştirilebilir."
            },
            {
                q: "Derslere devam zorunlu mu?",
                a: "Evet. Özellikle pratik uygulama derslerinde devam zorunludur çünkü eğitmenlik becerisi canlı uygulamalar üzerinden ölçülür. Sertifika verilebilmesi için minimum katılım oranı gereklidir."
            },
            {
                q: "Kaçırılan dersler için telafi imkanı var mı?",
                a: "Zorunlu sebepler ile katılamadığınız dersler için telafi imkanı sağlanabilir. Ancak telafinin içeriği ve şekli eğitim modülüne ve grup yoğunluğuna göre değişebilir."
            },
            {
                q: "Eğitim boyunca materyal sağlanıyor mu?",
                a: "Evet. Eğitim boyunca tüm sunumlara, notlara, örnek ders akışlarına, uygulama videolarına ve eğitim materyallerine dijital olarak erişim sağlanır."
            }
        ]
    },

    {
        section: "Sertifika & Kariyer",
        items: [
            {
                q: "Eğitim sonunda sertifika alacak mıyım?",
                a: "Evet. Her modülün sonunda gerekli teori ve pratik değerlendirmelerini başarıyla tamamlayan katılımcılara 'Re:Form Akademi Onaylı Pilates Eğitmenlik Sertifikası' verilir."
            },
            {
                q: "Bu sertifika ile stüdyolarda eğitmenlik yapabilir miyim?",
                a: "Re:Form Akademi sertifikaları sektörde kabul gören, kapsamlı pratik eğitime dayanan belgelerdir. Mezunlarımız Türkiye'nin birçok stüdyosunda aktif olarak çalışmaktadır. Süreç boyunca kariyer yönlendirmesi sağlanır."
            },
            {
                q: "Staj desteğiniz var mı?",
                a: "Evet. Uygun görülen öğrencilerimize mezuniyet sonrası staj imkânı tanıyoruz. Bu süreçte eğitmenlerimizin yanında gözlem, ders asistanlığı ve rehberlik fırsatı sunulur."
            },
            {
                q: "İş yönlendirmesi yapıyor musunuz?",
                a: "Evet. Mezunlarımızı sektördeki birçok partner stüdyo ile buluşturarak iş yönlendirme desteği sağlıyoruz. Başvuru aşamalarında CV–profil düzenleme desteği de sunulur."
            }
        ]
    },

    {
        section: "Online / Hibrit Eğitim",
        items: [
            {
                q: "Online eğitim ile yüz yüze eğitim farkı nedir?",
                a: "Teorik derslerin bazı bölümleri online yapılabilir; ancak pratik uygulamalar, öğretim metodolojisi ve hareket analizi dersleri mutlaka yüz yüze gerçekleştirilir. Böylece hem esneklik hem de ideal öğrenme verimi sağlanmış olur."
            },
            {
                q: "Online ders kayıtlarına erişim sağlanıyor mu?",
                a: "Evet. Teorik eğitimlerin kayıtları dönem şartlarına göre katılımcılarla paylaşılabilir. Pratik oturumlar kayıt altına alınmaz."
            },
            {
                q: "Hibrit eğitim modülü nedir?",
                a: "Hibrit modül, teorik derslerin online; pratik uygulamaların stüdyo ortamında yüz yüze yapıldığı bir eğitim modelidir. Özellikle şehir dışından katılan öğrenciler için büyük kolaylık sağlar."
            }
        ]
    },

    {
        section: "İptal, Değişiklik & İade",
        items: [
            {
                q: "Eğitim kaydımı iptal edersem ücret iadesi alabilir miyim?",
                a: "Eğitim başlangıç tarihine kalan süreye göre değişmekle birlikte belirli şartlarda iade mümkündür. Kayıt sırasında tarafınıza yazılı olarak iptal–iade politikası sunulur."
            },
            {
                q: "Kaydımı bir sonraki döneme erteleyebilir miyim?",
                a: "Evet, kontenjan uygunluğu olması durumunda kayıt erteleme yapılabilir. Bu süreç için eğitim danışmanlarımız size destek sağlar."
            },
            {
                q: "Eğitim tarihi değişirse bilgilendirme yapıyor musunuz?",
                a: "Elbette. Eğitim tarihlerinde plan değişikliği olduğunda katılımcılara SMS, e-mail ve WhatsApp üzerinden bilgilendirme yapılır."
            }
        ]
    },

    {
        section: "İletişim",
        items: [
            {
                q: "Sorularım için size nasıl ulaşabilirim?",
                a: "Bize Instagram DM, WhatsApp iletişim hattı veya web sitemizdeki iletişim formu üzerinden ulaşabilirsiniz. Tüm mesajlara genellikle aynı gün içerisinde dönüş yapılır."
            },
            {
                q: "Eğitim danışmanıyla birebir görüşebilir miyim?",
                a: "Evet. Kayıt öncesi ücretsiz bilgilendirme görüşmesi talep edebilirsiniz. Eğitmenlerimiz eğitim süreci, kariyer planlama ve seviye uygunluğu konusunda sizi yönlendirecektir."
            }
        ]
    }
];


export default function HelpCenter() {
    const [query, setQuery] = useState("");
    const [openKey, setOpenKey] = useState(null);

    const filtered = useMemo(() => {
        if (!query.trim()) return FAQ_DATA;
        const ql = query.toLowerCase();
        return FAQ_DATA
            .map(sec => ({
                ...sec,
                items: sec.items.filter(i =>
                    i.q.toLowerCase().includes(ql) || i.a.toLowerCase().includes(ql)
                )
            }))
            .filter(sec => sec.items.length);
    }, [query]);

    return (
        <section className="help-center">
            <header className="help-hero premium-hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">
                            <i className="bi bi-question-circle-fill"></i> S.S.S & Yardım Merkezi
                        </span>

                        <h1>Yardım Merkezi</h1>
                        <p>
                            Eğitim programları, kayıt süreci, sertifikasyon, staj ve eğitmenlik kariyeriyle ilgili en sık sorulan soruları burada bulabilirsiniz.
                        </p>

                        <div className="help-search large">
                            <i className="bi bi-search" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Bir konu ara: kayıt, reformer, sertifika..."
                                aria-label="Sık sorulan sorularda arama"
                            />
                        </div>

                        <div className="hero-mini-info">
                            <div><i className="bi bi-lightning-charge-fill"></i> Hızlı yanıt sistemi</div>
                            <div><i className="bi bi-clock-history"></i> 7/24 erişilebilir</div>
                            <div><i className="bi bi-info-circle-fill"></i> +80 detaylı açıklama</div>
                        </div>
                    </div>

                </div>
            </header>
            <div className="container">
                <div className="faq-grid">
                    {filtered.map((sec, si) => (
                        <div className="faq-section" key={si}>
                            <h2>{sec.section}</h2>

                            {sec.items.map((item, ii) => {
                                const key = `${si}-${ii}`;
                                const isOpen = openKey === key;
                                return (
                                    <div className={`faq-item ${isOpen ? "open" : ""}`} key={key}>
                                        <button
                                            className="faq-q"
                                            onClick={() => setOpenKey(isOpen ? null : key)}
                                            aria-expanded={isOpen}
                                        >
                                            <span>{item.q}</span>
                                            <i className={`bi ${isOpen ? "bi-dash-lg" : "bi-plus-lg"}`} />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    className="faq-a"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <p>{item.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {!filtered.length && (
                        <div className="faq-empty">
                            <p>Aradığın ifadeye uygun bir sonuç bulamadık. İstersen bizimle iletişime geçebilirsin.</p>
                            <a href="/iletisim" className="btn-primary">İletişime Geç</a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
