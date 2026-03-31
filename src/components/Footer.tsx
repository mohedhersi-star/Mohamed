import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              Mohamed<span className="text-[#FFD700]">Hersi</span>
            </Link>
            <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
              Exploring the intersections of history, knowledge, and personal growth. 
              Sharing book summaries, deep dives, and insights to help you build a better mind.
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="#" className="text-gray-500 hover:text-[#e74c3c] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#e74c3c] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#e74c3c] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#e74c3c] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/category/Books" className="text-gray-400 hover:text-[#FFD700] transition-colors">Book Summaries</Link></li>
              <li><Link to="/category/Knowledge" className="text-gray-400 hover:text-[#FFD700] transition-colors">Knowledge</Link></li>
              <li><Link to="/category/History" className="text-gray-400 hover:text-[#FFD700] transition-colors">History</Link></li>
              <li><Link to="/category/Articles" className="text-gray-400 hover:text-[#FFD700] transition-colors">Articles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest articles and insights delivered to your inbox.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c] transition-all"
              />
              <button 
                type="submit" 
                className="bg-[#e74c3c] hover:bg-[#c0392b] text-white font-medium py-2 px-4 rounded-md transition-colors text-sm uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mohamed Hersi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/admin/login" className="text-gray-500 hover:text-white text-sm transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
