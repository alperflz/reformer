// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./Toast.css";

export default function Toast({ show, message, type = "success" }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className={`toast ${type}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.35 }}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
