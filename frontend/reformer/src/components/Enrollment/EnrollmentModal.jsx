// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import Toast from "../Toast";
import { registerRoboto } from "../../utils/pdfFonts/Roboto";
import "./EnrollmentModal.css";
import { useNavigate } from "react-router-dom";

export default function EnrollmentModal({ open, onClose, courses = [], program, user }) {
    const navigate = useNavigate();

    const emptyForm = { name: "", email: "", phone: "", note: "" };
    const [form, setForm] = useState(emptyForm);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "error") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type }), 2500);
    };

    const [myEnrollments, setMyEnrollments] = useState([]);

    useEffect(() => {
        if (!user || !open) return;

        axios.get("/enrollments/me").then((res) => {
            setMyEnrollments(res.data.enrollments || []);
        });
    }, [user, open]);

    const isApplied = (courseId) =>
        myEnrollments.some((e) => e.course?._id === courseId);

    useEffect(() => {
        if (open) {
            setStep(1);
            if (user) {
                setForm({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone ? user.phone.slice(0) : "",
                    note: "",
                });
            } else {
                setForm(emptyForm);
            }
        }
    }, [open, user]);

    const formatDateExtended = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("tr-TR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNameValid = (name) => /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{2,40}$/.test(name);
    const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);

    const update = (field, value) => {
        if (field === "phone") {
            const clean = value.replace(/\D/g, "");
            if (clean.length <= 10) setForm({ ...form, phone: clean });
            return;
        }
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const loadImageAsBase64 = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = reject;
            img.src = src;
        });


    const downloadPdf = async () => {
        try {
            const { jsPDF } = await import("jspdf");

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            registerRoboto(doc);

            const marginX = 16;
            let y = 20;

            try {
                const logoBase64 = await loadImageAsBase64("/images/logo-light.png");
                doc.addImage(logoBase64, "PNG", marginX, y, 40, 14);
            } catch {
                // logo yüklenemezse sessiz geç
            }

            doc.setFontSize(18);
            doc.setTextColor(40);
            doc.text("Ön Kayıt Belgesi", 200 - marginX, y + 10, { align: "right" });

            y += 22;

            doc.setFillColor(245, 246, 250);
            doc.roundedRect(marginX, y, 178, 90, 6, 6, "F");

            y += 10;

            doc.setFontSize(14);
            doc.setTextColor(97, 50, 173);
            doc.text("Eğitim Bilgileri", marginX + 6, y);

            y += 8;
            doc.setFontSize(11);
            doc.setTextColor(0);

            doc.text(`Program: ${program?.title || "-"}`, marginX + 6, y);
            y += 6;

            doc.text(
                `Tarih: ${selectedCourse?.startDate
                    ? formatDateExtended(selectedCourse.startDate)
                    : "-"
                }`,
                marginX + 6,
                y
            );
            y += 6;

            doc.text(`Saat: ${selectedCourse?.time || "-"}`, marginX + 6, y);
            y += 6;

            doc.text(`Lokasyon: ${selectedCourse?.location || "-"}`, marginX + 6, y);
            y += 6;

            doc.text(
                `Ücret: ${selectedCourse?.price ? selectedCourse.price + " ₺" : "-"}`,
                marginX + 6,
                y
            );

            y += 16;
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(marginX, y, 178, 60, 6, 6, "F");

            y += 10;
            doc.setFontSize(14);
            doc.setTextColor(97, 50, 173);
            doc.text("Katılımcı Bilgileri", marginX + 6, y);

            y += 8;
            doc.setFontSize(11);
            doc.setTextColor(0);

            doc.text(`Ad Soyad: ${form.name}`, marginX + 6, y);
            y += 6;

            doc.text(`E-posta: ${form.email}`, marginX + 6, y);
            y += 6;

            doc.text(`Telefon: +90 ${form.phone}`, marginX + 6, y);

            if (form.note) {
                y += 8;
                doc.setTextColor(120);
                doc.text("Not:", marginX + 6, y);
                y += 6;
                doc.setTextColor(0);
                doc.text(doc.splitTextToSize(form.note, 160), marginX + 6, y);
            }

            // FOOTER
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text(
                "Bu belge Re:Form Akademi tarafından otomatik oluşturulmuştur.",
                105,
                287,
                { align: "center" }
            );

            doc.save("reform-akademi-on-kayit.pdf");
        } catch (err) {
            console.error(err);
            showToast("PDF oluşturulamadı.", "error");
        }
    };


    const submit = async () => {
        if (!selectedCourse) {
            return showToast("Lütfen bir kurs seçin.");
        }

        if (submitting) return;

        if (!isNameValid(form.name)) return showToast("Ad soyad hatalı.");
        if (!isEmailValid(form.email)) return showToast("E-posta geçersiz.");
        if (!isPhoneValid(form.phone)) return showToast("Telefon 10 haneli olmalıdır.");

        try {

            setSubmitting(true);

            await axios.post("/enrollments", {
                courseId: selectedCourse._id,
                name: form.name,
                email: form.email,
                phone: "+90" + form.phone,
                note: form.note,
            });

            setStep(3);
        } catch (err) {
            console.error(err);
            showToast(
                err?.response?.data?.message || "Başvuru oluşturulamadı.",
                "error"
            );
        }
    };

    useEffect(() => {
        if (open) {
            setStep(1);
            setSelectedCourse(null);
        }
    }, [open]);


    if (open && !user) {
        return (
            <AnimatePresence>
                <motion.div
                    className="enrollment-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="center-modal"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="modal-title">🔐 Giriş Yapmanız Gerekiyor</h2>
                        <p className="modal-subtext">
                            Ön kayıt oluşturabilmek için hesabınızla giriş yapmalısınız.
                        </p>

                        <div className="modal-actions-center">
                            <button
                                className="enrollment-btn-primary"
                                onClick={() => navigate("/auth")}
                            >
                                Giriş Yap
                            </button>
                            <button className="enrollment-btn-outline" onClick={onClose}>
                                İptal
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <Toast show={toast.show} message={toast.message} type={toast.type} />

                    <motion.div
                        className="enrollment-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            className="center-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ConfettiCanvas active={step === 3} />

                            <div className="modal-steps">
                                <div className="modal-steps-labels">
                                    <div
                                        className={`modal-step-item ${step >= 1 ? "is-active" : ""
                                            } ${step > 1 ? "is-done" : ""}`}
                                    >
                                        <span className="modal-step-circle">1</span>
                                        <span className="modal-step-text">Eğitim</span>
                                    </div>
                                    <div
                                        className={`modal-step-item ${step >= 2 ? "is-active" : ""
                                            } ${step > 2 ? "is-done" : ""}`}
                                    >
                                        <span className="modal-step-circle">2</span>
                                        <span className="modal-step-text">Bilgiler</span>
                                    </div>
                                    <div
                                        className={`modal-step-item ${step === 3 ? "is-active" : ""}`}
                                    >
                                        <span className="modal-step-circle">3</span>
                                        <span className="modal-step-text">Onay</span>
                                    </div>
                                </div>

                                <div className="modal-steps-bar">
                                    <div
                                        className={`modal-steps-bar-fill step-${step}`}
                                    ></div>
                                </div>
                            </div>

                            {step === 1 && (
                                <>
                                    <h2 className="modal-title">📘 Eğitim & Tarih Seçimi</h2>
                                    <p className="modal-subtext">
                                        Lütfen katılmak istediğiniz eğitim tarihini seçin.
                                    </p>

                           
                                    <div className="course-premium-info">
                                        <div className="info-row">
                                            <i className="bi bi-book"></i>
                                            <div>
                                                <strong>{program?.title}</strong>
                                                <span>{program?.subtitle}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-picker">
                                        {courses.length === 0 && (
                                            <p className="muted">Yaklaşan kurs bulunmuyor.</p>
                                        )}

                                        {courses.map((c) => {
                                            const applied = isApplied(c._id);

                                            return (
                                                <button
                                                    key={c._id}
                                                    type="button"
                                                    disabled={applied}
                                                    className={`course-option 
                                                    ${selectedCourse?._id === c._id ? "selected" : ""} 
                                                    ${applied ? "disabled" : ""}`
                                                    }
                                                    onClick={() => {
                                                        if (applied) {
                                                            showToast("Bu kursa daha önce başvurdunuz.", "error");
                                                            return;
                                                        }
                                                        setSelectedCourse(c);
                                                    }}
                                                >
                                                    <div>
                                                        <strong>{formatDateExtended(c.startDate)}</strong>
                                                        <span>
                                                            {applied
                                                                ? "❌ Daha önce başvuruldu"
                                                                : `${c.time} · ${c.location}`}
                                                        </span>
                                                    </div>

                                                    <span className="price">{c.price} ₺</span>
                                                </button>
                                            );
                                        })}

                                    </div>

                                    <div className="modal-actions-center">
                                        <button
                                            className="enrollment-btn-primary"
                                            disabled={!selectedCourse}
                                            onClick={() => setStep(2)}
                                        >
                                            Devam Et →
                                        </button>
                                        <button
                                            className="enrollment-btn-outline"
                                            onClick={onClose}
                                        >
                                            Kapat
                                        </button>
                                    </div>
                                </>
                            )}


                            {step === 2 && (
                                <>
                                    <h2 className="modal-title">📝 Başvuru Formu</h2>

                                    <label>Ad Soyad</label>
                                    <input
                                        className="modal-input"
                                        value={form.name}
                                        onChange={(e) => update("name", e.target.value)}
                                    />

                                    <label>E-posta</label>
                                    <input
                                        className="modal-input"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                    />

                                    <label>Telefon</label>
                                    <div className="phone-row">
                                        <input className="phone-prefix" value="+90" disabled />
                                        <input
                                            className="modal-input phone-main"
                                            value={form.phone}
                                            maxLength={10}
                                            onChange={(e) => update("phone", e.target.value)}
                                        />
                                    </div>

                                    <label>Not (Opsiyonel)</label>
                                    <textarea
                                        className="modal-textarea"
                                        value={form.note}
                                        onChange={(e) => update("note", e.target.value)}
                                    />

                                    <div className="modal-actions-center">
                                        <button
                                            className="enrollment-btn-outline"
                                            onClick={() => setStep(1)}
                                        >
                                            ← Geri
                                        </button>
                                        <button
                                            className="enrollment-btn-primary"
                                            disabled={submitting}
                                            onClick={submit}
                                        >
                                            {submitting ? "Gönderiliyor…" : "Başvuruyu Gönder"}
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <div className="success-box">
                                    <div className="success-icon">🎉</div>
                                    <h2 className="modal-title">Başvurunuz Alındı!</h2>
                                    <p className="modal-subtext">
                                        Eğitim koordinatörümüz en kısa sürede sizinle iletişime geçecek.
                                        E-posta adresinizi ve telefon numaranızı kontrol etmeyi unutmayın.
                                    </p>

                                    <div className="modal-actions-center">
                                        <button
                                            className="enrollment-btn-outline"
                                            onClick={downloadPdf}
                                        >
                                            Başvuru Özetini PDF İndir
                                        </button>
                                        <button
                                            className="enrollment-btn-primary"
                                            onClick={onClose}
                                        >
                                            Kapat
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function ConfettiCanvas({ active }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;

        canvas.width = width * 2;
        canvas.height = height * 2;
        ctx.scale(2, 2);

        const colors = [
            "rgba(97,50,173,0.9)",  
            "rgba(86,180,211,0.9)", 
            "rgba(244,162,97,0.85)",  
            "rgba(255,255,255,0.9)", 
        ];

        const centerX = width / 2;
        const centerY = height / 2;

        const pieces = Array.from({ length: 14 }).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;

            return {
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: 5 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

        let frame;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            pieces.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.015; 

                ctx.globalAlpha = Math.max(p.alpha, 0);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            if (pieces.some((p) => p.alpha > 0)) {
                frame = requestAnimationFrame(draw);
            }
        };

        draw();

        return () => cancelAnimationFrame(frame);
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            className="confetti-layer"
            style={{ pointerEvents: "none" }}
        />
    );
}
