import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/category/Books' },
    { name: 'Knowledge', path: '/category/Knowledge' },
    { name: 'History', path: '/category/History' },
    { name: 'Articles', path: '/category/Articles' },
  ];

  return (
    <header className="flex items-center justify-between py-8 px-4 md:px-12 bg-[#0f0f0f] sticky top-0 z-40 border-b border-white/5 backdrop-blur-md bg-[#0f0f0f]/80">
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="flex items-center gap-4 md:hidden">
        <button className="text-white hover:text-[#FFD700] transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="text-xl font-black tracking-tighter uppercase text-white">
          Mohamed<span className="text-[#FFD700]">Hersi</span>
        </Link>
      </div>

      <nav className="hidden md:flex space-x-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || (location.pathname === '/' && link.name === 'Home');
          return (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                "text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all hover:-translate-y-0.5",
                isActive ? "border-[#FFD700] text-[#FFD700]" : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <button className="bg-[#FFD700] hover:bg-white text-black font-black text-[10px] px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105">
        Subscribe
      </button>
    </header>
  );
}
