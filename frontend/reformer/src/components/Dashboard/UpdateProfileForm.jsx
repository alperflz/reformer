import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await updateProfile(form).unwrap();
      const updatedUser = res.user || res; // backend'e göre

      dispatch(setCredentials({ user: updatedUser, token }));
      setMessage({ type: "success", text: "Profil başarıyla güncellendi." });
    } catch (err) {
      console.error("Profil güncelleme hatası:", err);
      setMessage({
        type: "error",
        text: err?.data?.message || "Profil güncellenirken hata oluştu.",
      });
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-row">
        <div className="profile-form-group">
          <label>Ad Soyad</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Adınız Soyadınız"
            required
          />
        </div>

        <div className="profile-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </div>
      </div>

      <div className="profile-form-row">
        <div className="profile-form-group">
          <label>Telefon</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="5xx xxx xx xx"
          />
        </div>
      </div>

      <div className="profile-form-group">
        <label>Hakkında (Bio)</label>
        <textarea
          name="bio"
          rows="4"
          value={form.bio}
          onChange={handleChange}
          placeholder="Kısaca kendinizi anlatın, deneyimleriniz, eğitime bakış açınız..."
        />
      </div>

      <div className="profile-form-actions">
        <button className="btn-save" type="submit" disabled={isLoading}>
          {isLoading ? "Kaydediliyor..." : "Bilgileri Kaydet"}
        </button>
      </div>

      {message && (
        <p
          className={`profile-message ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

export default UpdateProfileForm;
