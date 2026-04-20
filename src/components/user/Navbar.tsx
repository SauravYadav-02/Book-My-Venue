import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 md:py-5 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-serif italic tracking-wide text-brand-text">
          Book My Venue.
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text">
        <Link to="/" className="hover:text-brand-primary transition-colors">Discover</Link>
        <Link to="/" className="hover:text-brand-primary transition-colors">Planning Tools</Link>
        <Link to="/" className="hover:text-brand-primary transition-colors">Inspiration</Link>
      </nav>

      <div className="flex items-center gap-6 text-sm font-medium text-brand-text">
        <Link to="/login" className="flex items-center gap-2 hover:text-[#5C614D] transition-colors">
          <LogIn size={18} />
          Sign In
        </Link>
      </div>
    </header>
  );
}
