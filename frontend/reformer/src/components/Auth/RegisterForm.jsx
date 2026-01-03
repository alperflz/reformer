// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const RegisterForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await register(form).unwrap();
            dispatch(setCredentials(res));

            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Kayıt hatası:", err);
            alert("Kayıt yapılamadı!");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="auth-form"
        >
            <div className="auth-group">
                <label>Ad Soyad</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Adınız"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <div className="auth-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="auth-group">
                <label>Şifre</label>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
            </button>
        </motion.form>
    );
};

export default RegisterForm;
