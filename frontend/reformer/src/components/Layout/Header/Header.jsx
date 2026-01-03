import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice.js";
import { useLogoutMutation } from "../../../features/auth/authApi";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [logoutRequest] = useLogoutMutation();
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className={`site-header ${isScrolled ? "shrink" : ""}`}>
      <div className="header-wrapper">

        <div className="header-top-bg">
          <div className="container">
            <div className="header-top">
              <div className="header-social-media">
                <a
                  href="https://instagram.com/re.form_akademi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=905465683996"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
                <p>Pilates eğitmenliğinde profesyonelliğe giden yol burada başlıyor.</p>
              </div>

              <div className="header-quick-menu">
                <ul className="quick-menu-list">
                  <li className="quick-menu-item"><span className="quick-menu-circle"></span><a href="/blogs">Blog</a></li>
                  <li className="quick-menu-item"><span className="quick-menu-circle"></span><a href="/help-center">Yardım Merkezi</a></li>
                  <li className="quick-menu-item"><span className="quick-menu-circle"></span><a href="/contact">İletişim</a></li>
                  <li className="quick-menu-item"><span className="quick-menu-circle"></span><a href="/policy">Kurumsal</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-center-bg">
          <div className="container">
            <div className="header-center">

              <a href="/" className="header-logo">
                <img
                  src={theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"}
                  alt="Re:Form Akademi Logo"
                />
              </a>

              <nav className="main-nav desktop-nav">
                <ul className="nav-list">
                  <li><a href="/">Ana Sayfa</a></li>
                  <li><a href="/educations">Eğitimler</a></li>
                  <li><a href="/education-calendar">Takvim</a></li>
                  <li><a href="/services">Tanıtım</a></li>
                  <li><a href="/references">Referanslar</a></li>
                </ul>
              </nav>

              <div className="header-user">
                <button
                  className="theme-toggle-btn"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <i className="bi bi-sun-fill" /> : <i className="bi bi-moon-stars-fill" />}
                </button>

                {!isAuthenticated && (
                  <div className="auth-buttons">
                    <a className="btn-outline" href="/auth">
                      <i className="bi bi-box-arrow-in-right"></i> Giriş
                    </a>
                    <a className="btn-primary" href="/auth?register=true">
                      <i className="bi bi-person-plus-fill"></i> Kayıt
                    </a>
                  </div>
                )}

                {isAuthenticated && (
                  <div className={`profile-menu ${profileOpen ? "open" : ""}`}>
                    <button
                      className="profile-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileOpen((prev) => !prev);
                      }}
                    >
                      <i className="bi bi-person-circle"></i>
                      <span>{user?.name}</span>
                      <i className="bi bi-caret-down-fill"></i>
                    </button>


                    <div className={`profile-dropdown ${profileOpen ? "open" : ""}`}>
                      <a href="/dashboard"><i className="bi bi-speedometer2" /> Profil</a>

                      {user?.role === "admin" && (
                        <a href="/admin"><i className="bi bi-shield-lock-fill" /> Admin Panel</a>
                      )}

                      <button onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right" /> Çıkış
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
            <button
              className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="bi bi-list" />
            </button>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.nav
              className="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
            >
              <div className="mobile-nav-header">
                <img
                  src={theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"}
                  alt="Re:Form Akademi Logo"
                />
                <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <ul className="nav-list">
                  <li><a href="/">Ana Sayfa</a></li>
                  <li><a href="/educations">Eğitimler</a></li>
                  <li><a href="/education-calendar">Takvim</a></li>
                  <li><a href="/services">Tanıtım</a></li>
                  <li><a href="/references">Referanslar</a></li>
              </ul>

              <ul className="quick-list">
                  <li><span className="quick-menu-circle"></span><a href="/blogs">Blog</a></li>
                  <li><span className="quick-menu-circle"></span><a href="/help-center">Yardım Merkezi</a></li>
                  <li><span className="quick-menu-circle"></span><a href="/contact">İletişim</a></li>
                  <li><span className="quick-menu-circle"></span><a href="/policy">Kurumsal</a></li>
              </ul>

              <div className="mobile-nav-auth">
                {!isAuthenticated ? (
                  <>
                    <a className="btn-primary" href="/auth">Giriş Yap</a>
                    <a className="btn-outline" href="/auth?register=true">Kayıt Ol</a>
                  </>
                ) : (
                  <>
                    <p className="mobile-user">Merhaba, {user?.name}</p>
                    <button className="btn-outline" onClick={handleLogout}>Çıkış Yap</button>
                  </>
                )}
              </div>
            </motion.nav>

            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
