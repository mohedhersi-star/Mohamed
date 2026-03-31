import { Link, useLocation } from 'react-router-dom';
import { FileText, Layers, Archive, Mail, User, Twitter, Linkedin, Github } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Recent Posts', path: '/', icon: FileText },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Archives', path: '/archives', icon: Archive },
    { name: 'Newsletter', path: '/newsletter', icon: Mail },
    { name: 'About', path: '/about', icon: User },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#0f0f0f] border-r border-white/5 flex flex-col py-8 px-6 shrink-0 hidden md:flex">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="relative w-28 h-28 mb-5 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700] to-[#e74c3c] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#1a1a1a] bg-[#141414]">
            <img 
              src="/profile.jpg" 
              alt="Mohamed Hersi" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Mohamed+Hersi&background=FFD700&color=000&size=200`;
              }}
            />
          </div>
        </div>
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-white hover:text-[#FFD700] transition-colors">
          Mohamed<span className="text-[#FFD700]">Hersi</span>
        </Link>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Writer & Thinker</p>
        
        <div className="flex items-center gap-3 mt-4">
          <a href="#" className="w-8 h-8 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest mb-1">Editorial Feed</h3>
        <div className="h-[1px] w-8 bg-white/10 mt-2 mb-4"></div>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path || (link.name === 'Categories' && location.pathname.includes('/category'));
          return (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                "flex items-center px-4 py-3 rounded-md text-sm font-bold transition-colors group",
                isActive ? "bg-[#1a1a1a] text-[#FFD700]" : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className={clsx(
                "w-4 h-4 mr-4 transition-transform duration-300",
                isActive ? "text-[#FFD700]" : "text-gray-500 group-hover:scale-110 group-hover:text-[#FFD700]"
              )} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="border-l-2 border-[#FFD700] pl-4 py-3 bg-gradient-to-r from-[#141414] to-transparent rounded-r-md p-4 group cursor-pointer hover:from-[#1a1a1a] transition-all">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 group-hover:text-[#FFD700] transition-colors flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e74c3c] mr-2 animate-pulse"></span>
            Editor's Pick
          </h4>
          <p className="text-sm font-bold text-white leading-tight group-hover:text-gray-200 transition-colors">The Stoic Guide to Modern Productivity</p>
        </div>
      </div>
    </aside>
  );
}
