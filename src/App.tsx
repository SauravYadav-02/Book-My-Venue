import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts & Dashboard
import Layout from "./components/layouts/Layout";
import MainLayout from "./components/layouts/MainLayout";

// Public / Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import VendorRegistrationForm from "./pages/user/VendorRegistration/VendorRegistrationForm";

// Public User Layout & Pages
import UserLayout from "./components/layouts/UserLayout";
import Home from "./pages/user/Home";

// Vendor Venue Pages
import AddVenue from "./pages/vendor/AddVenue";
import VenueList from "./pages/vendor/AddVenue/VenueList";
import EditVenue from "./pages/vendor/EditVenues/EditVenue";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<VendorRegistrationForm />} />

        {/* Public / User End */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Vendor Dashboard */}
        <Route path="/dashboard" element={<MainLayout />} />

        {/* Vendor Venue Management (Wrapped in Layout for Sidebar/Navbar) */}
        <Route path="/venues" element={<Layout><VenueList /></Layout>} />
        <Route path="/venues/add" element={<Layout><AddVenue /></Layout>} />
        <Route path="/venues/edit/:id" element={<Layout><EditVenue /></Layout>} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}