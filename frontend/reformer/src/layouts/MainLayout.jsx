import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import { ThemeProvider } from "../context/ThemeContext";

export default function MainLayout() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}
