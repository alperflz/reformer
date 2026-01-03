import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useUpdatePasswordMutation } from "../../features/auth/authApi";

const UpdatePasswordForm = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      return setMessage({
        type: "error",
        text: "Yeni şifre ve şifre tekrarı eşleşmiyor.",
      });
    }

    try {
      const res = await updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }).unwrap();

      setMessage({
        type: "success",
        text: res?.message || "Şifre başarıyla güncellendi.",
      });

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Şifre güncelleme hatası:", err);
      setMessage({
        type: "error",
        text: err?.data?.message || "Şifre güncellenirken hata oluştu.",
      });
    }
  };

  return (
    <motion.form
      className="password-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0.9, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="profile-form-group">
        <label>Mevcut Şifre</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Mevcut şifreniz"
          required
        />
      </div>

      <div className="profile-form-row">
        <div className="profile-form-group">
          <label>Yeni Şifre</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Yeni şifre"
            required
          />
        </div>

        <div className="profile-form-group">
          <label>Yeni Şifre (Tekrar)</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Yeni şifre tekrar"
            required
          />
        </div>
      </div>

      <button className="btn-save" type="submit" disabled={isLoading}>
        {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
      </button>

      {message && (
        <p
          className={`profile-message ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </p>
      )}
    </motion.form>
  );
};

export default UpdatePasswordForm;
