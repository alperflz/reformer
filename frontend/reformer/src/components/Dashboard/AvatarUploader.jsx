import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateAvatarMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const AvatarUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_BASE_URL;

  const { user, token } = useSelector((state) => state.auth);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await updateAvatar(formData).unwrap();
      dispatch(setCredentials({ user: res.user, token }));
    } catch (err) {
      console.error("Avatar güncellenemedi:", err);
      alert("Avatar yüklenirken hata oluştu");
    }
  };

  return (
    <div className="avatar-section">
      <div
        className={`avatar-wrapper ${isLoading ? "loading" : ""}`}
        onClick={() => fileInputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            user?.avatar
              ? `${API_URL}${user?.avatar}`
              : "/images/blog-placeholder.jpg"
          }
          alt="Profil fotoğrafı"
          className="avatar-preview"
        />

        {isLoading && <div className="avatar-overlay">Yükleniyor…</div>}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUploader;
