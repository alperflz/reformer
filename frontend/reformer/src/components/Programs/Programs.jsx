// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Programs.css";
import ProgramItem from "./ProgramItem";

const Programs = () => {
  return (
    <section className="programs-section" id="programlar">
      <div className="container">
        <motion.div
          className="programs-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>🧠 Eğitim Programlarımız</h2>
          <p>
            Re:Form Akademi'de her modül bilim temelli, uygulamalı ve profesyonel gelişimi destekleyecek biçimde tasarlanmıştır.
          </p>
        </motion.div>

        <ProgramItem/>
      </div>
    </section>
  );
};

export default Programs;
