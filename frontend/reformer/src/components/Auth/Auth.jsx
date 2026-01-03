import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Auth.css";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-info">
                    <div className="auth-info-inner">
                        <h3>Aramıza katıl!</h3>
                        <p className="auth-info-sub">
                            Re:Form Akademi’de bilim temelli Pilates eğitimi ile profesyonel
                            eğitmenlik yolculuğuna adım at.
                        </p>

                        <ul className="auth-benefits">
                            <li>
                                <i className="bi bi-mortarboard-fill" />
                                <div>
                                    <h4>Bilimsel içerik</h4>
                                    <p>Fizyoterapist ve master eğitmenlerden kapsamlı eğitimler.</p>
                                </div>
                            </li>
                            <li>
                                <i className="bi bi-activity" />
                                <div>
                                    <h4>Uygulamalı eğitim</h4>
                                    <p>Gerçek stüdyo ortamında pratik odaklı dersler.</p>
                                </div>
                            </li>
                            <li>
                                <i className="bi bi-briefcase-fill" />
                                <div>
                                    <h4>Kariyer desteği</h4>
                                    <p>Staj, mentorluk ve iş yönlendirmesi ile tam destek.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="auth-panel">
                    <div className="auth-panel-header">
                        <h2>Kayıt & Giriş</h2>
                        <p>
                            {isLogin
                                ? "Hesabınıza giriş yaparak eğitimlerinize devam edin."
                                : "Yeni bir hesap oluşturarak Re:Form Akademi’ye katılın."}
                        </p>
                    </div>

                    <div className="auth-panel-body">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <LoginForm />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <RegisterForm />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="auth-switch">
                            {isLogin ? (
                                <p>
                                    Henüz hesabın yok mu?{" "}
                                    <span onClick={() => setIsLogin(false)}>Hemen Kayıt Ol</span>
                                </p>
                            ) : (
                                <p>
                                    Zaten üyeliğin var mı?{" "}
                                    <span onClick={() => setIsLogin(true)}>Giriş Yap</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
