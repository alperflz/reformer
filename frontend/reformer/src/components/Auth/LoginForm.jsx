// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login(form).unwrap();

            dispatch(setCredentials({
                user: res.user,
                accessToken: res.accessToken
            }));

            window.location.href = "/dashboard";
        } catch (err) {
            alert("Giriş yapılamadı!", err);
        }
    };

    return (
        <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="auth-form"
        >
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
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
        </motion.form>
    );
};

export default LoginForm;
