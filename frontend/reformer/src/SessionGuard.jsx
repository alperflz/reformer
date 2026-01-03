import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "./api/axios";
import { hardLogout, setCredentials } from "./features/auth/authSlice";

function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export default function SessionGuard() {
    const dispatch = useDispatch();
    const timerRef = useRef(null);

    useEffect(() => {
        const refreshFlow = async () => {
            const res = await axios.post(
                "/auth/refresh",
                {},
                { withCredentials: true }
            );

            if (!res.data?.accessToken || !res.data?.user) {
                throw new Error("Refresh failed");
            }

            dispatch(
                setCredentials({
                    user: res.data.user,
                    accessToken: res.data.accessToken,
                })
            );
        };

        const check = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            const decoded = decodeJwt(token);
            const now = Math.floor(Date.now() / 1000);

            if (!decoded?.exp || decoded.exp <= now + 10) {
                try {
                    await refreshFlow();
                } catch {
                    dispatch(hardLogout());
                    window.location.assign("/auth");
                }
            }
        };

        check();
        timerRef.current = setInterval(check, 30000);

        return () => clearInterval(timerRef.current);
    }, [dispatch]);

    return null;
}
