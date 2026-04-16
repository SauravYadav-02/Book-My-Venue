import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts & Dashboard
import Layout from "./components/vendor/layout/Layout";
import MainLayout from "./components/vendor/layout/mainLayout/MainLayout";

// Public / Auth Pages
import LoginPage from "./components/common/LoginPage";
import VendorRegistrationForm from "./Page/User/vendors_Requestform/VendorRegistrationForm";

// Vendor Venue Pages
import AddVenue from "./Page/vendor/AddVenue";
import VenueList from "./Page/vendor/AddVenue/VenueList";
import EditVenue from "./Page/vendor/EditVenues/EditVenue";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<VendorRegistrationForm />} />

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