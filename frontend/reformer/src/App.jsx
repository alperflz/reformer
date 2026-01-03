import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./layouts/AdminRoute";

import HomaPage from "./pages/HomaPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetails from "./components/Blogs/BlogDetails";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import EducationPage from "./pages/EducationPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import EducationDetailPage from "./pages/EducationDetailPage";
import EducationCalendarPage from "./pages/EducationCalendarPage";
import ServicesPage from "./pages/ServicesPage";
import ReferencesPage from "./pages/ReferencesPage";
import ReferenceDetail from "./components/References/ReferenceDetail";

import Dashboard from "./pages/admin/Dashboard";
import Enrollments from "./pages/admin/Enrollments/EnrollmentList";
import ProgramEdit from "./pages/admin/Programs/ProgramEdit";
import Programs from "./pages/admin/Programs/ProgramList";
import ProgramCreate from "./pages/admin/Programs/ProgramCreate";

import Categories from "./pages/admin/Category/CategoryList";
import CategoryCreate from "./pages/admin/Category/CategoryCreate";
import CategoryEdit from "./pages/admin/Category/CategoryUpdate";
import ProgramCourses from "./pages/admin/Programs/ProgramCourses";
import CourseEdit from "./pages/admin/Programs/CourseEdit";
import CourseCreate from "./pages/admin/Programs/CourseCreate";
import AdminBlogList from "./pages/admin/Blogs/AdminBlogList";
import AdminBlogCreate from "./pages/admin/Blogs/AdminBlogCreate";
import AdminBlogEdit from "./pages/admin/Blogs/AdminBlogEdit";
import PrivateRoute from "./PrivatedRoute";

export default function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomaPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/educations" element={<EducationPage />} />
        <Route path="/educations/:slug" element={<EducationDetailPage />} />
        <Route path="/education-calendar" element={<EducationCalendarPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/references/:slug" element={<ReferenceDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="programs" element={<Programs />} />
        <Route path="programs/:id/edit" element={<ProgramEdit />} />
        <Route path="programs/new" element={<ProgramCreate />} />

        <Route path="programs/:id/courses" element={<ProgramCourses />} />
        <Route path="programs/:id/courses/new" element={<CourseCreate />} />
        <Route path="courses/:courseId/edit" element={<CourseEdit />} />


        <Route path="categories" element={<Categories />} />
        <Route path="categories/new" element={<CategoryCreate />} />
        <Route path="categories/:id" element={<CategoryEdit />} />

        <Route path="blogs" element={<AdminBlogList />} />
        <Route path="blogs/new" element={<AdminBlogCreate />} />
        <Route path="blogs/:id/edit" element={<AdminBlogEdit />} />


        <Route path="enrollments" element={<Enrollments />} />
      </Route>

    </Routes>
  );
}
