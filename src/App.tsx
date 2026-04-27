import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts & Dashboard
import Layout from "./components/layouts/Layout";
import MainLayout from "./components/layouts/MainLayout";

// Public / Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import VendorRegistrationForm from "./pages/user/VendorRegistration/VendorRegistrationForm";
import UserRegistration from "./pages/auth/UserRegistration";

// Public User Layout & Pages
import UserLayout from "./components/layouts/UserLayout";
import Home from "./pages/user/Home";

// Vendor Venue Pages
import AddVenue from "./pages/vendor/AddVenue";
import VenueList from "./pages/vendor/AddVenue/VenueList";
import EditVenue from "./pages/vendor/EditVenues/EditVenue";
import Discover from "./pages/user/Discover";
import VenueDetails from "./pages/user/VenueDetails";
import Profile from "./pages/user/Profile";
import Bookings from "./pages/vendor/Bookings";
import CalendarPage from "./pages/vendor/CalendarPage";

// Context
import { VenueProvider } from "./store/Venuecontext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<VendorRegistrationForm />} />
        <Route path="/user-register" element={<UserRegistration />} />

        {/* Public / User End */}
        <Route path="/" element={<VenueProvider><UserLayout /></VenueProvider>}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Vendor Dashboard */}
        <Route path="/dashboard" element={<MainLayout />} />

        {/* Vendor Venue Management (Wrapped in Layout for Sidebar/Navbar) */}
        <Route path="/venue" element={<Layout><VenueList /></Layout>} />
        <Route path="/venue/add" element={<Layout><AddVenue /></Layout>} />
        <Route path="/venue/edit/:id" element={<Layout><EditVenue /></Layout>} />
        <Route path="/booking" element={<Layout><Bookings /></Layout>} />
        <Route path="/calendar" element={<Layout><CalendarPage /></Layout>} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}