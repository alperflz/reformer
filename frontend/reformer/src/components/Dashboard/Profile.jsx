import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import AvatarUploader from "./AvatarUploader";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import CoursesList from "./CoursesList";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="profile-container">

      {/* ==== HEADER CARD ==== */}
      <div className="profile-header-card">
        <div className="profile-header-left">
          <AvatarUploader />

          <div>
            <h2>{user?.name}</h2>
            <p className="email">{user?.email}</p>

            <span className={`role-badge ${user?.roles[0]}`}>
              {user?.roles[0] === "admin"
                ? "Admin"
                : user?.roles[0] === "instructor"
                  ? "Eğitmen"
                  : "Öğrenci"}
            </span>
          </div>
        </div>

        <div className="profile-header-right">
          <button
            onClick={() => setActiveTab("profile")}
            className="edit-btn"
          >
            <i className="bi bi-pencil-square"></i> Profili Düzenle
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-label">Toplam Başvuru</span>
          <strong className="stat-value">
            {user?.stats?.totalEnrollments ?? 0}
          </strong>
        </div>

        <div className="stat-card success">
          <span className="stat-label">Onaylanan</span>
          <strong className="stat-value">
            {user?.stats?.approvedEnrollments ?? 0}
          </strong>
        </div>

        <div className="stat-card warning">
          <span className="stat-label">Bekleyen</span>
          <strong className="stat-value">
            {user?.stats?.pendingEnrollments ?? 0}
          </strong>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <i className="bi bi-person-lines-fill" /> Profil
        </button>

        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          <i className="bi bi-mortarboard-fill" /> Eğitimlerim
        </button>

        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          <i className="bi bi-shield-lock-fill" /> Güvenlik
        </button>
      </div>

      {/* ==== TAB CONTENT ==== */}
      <div className="profile-content">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <UpdateProfileForm />
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <CoursesList />
            </motion.div>
          )}

          {activeTab === "password" && (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <UpdatePasswordForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Profile;
