import React from 'react';
import { Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-8 md:p-10 absolute top-0 z-20">

      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-brand-text tracking-tight">AyurVision</span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-dark">
        <a href="#" className="hover:text-brand-accent transition-colors">About</a>
        <a href="#" className="hover:text-brand-accent transition-colors">Reviews</a>
        <a href="#" className="hover:text-brand-accent transition-colors">Blog</a>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/login" className="flex items-center gap-2 bg-brand-light rounded-full pl-1 pr-4 py-1 shadow-sm hover:shadow-md transition-all">
           <div className="w-7 h-7 bg-brand-dark rounded-full flex items-center justify-center text-white">
             <User size={14} fill="white" />
           </div>
           <span className="text-xs font-semibold text-brand-darker">{localStorage.getItem('token') ? "Dashboard" : "Enter"}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
