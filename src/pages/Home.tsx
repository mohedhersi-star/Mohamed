import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { motion } from 'motion/react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_APP_URL || ''}/api/posts?`;
        if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearchParams({ q: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {!searchQuery && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-8 md:p-14 rounded-2xl border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#e74c3c]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
          
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-[#1a1a1a] shadow-[0_0_30px_rgba(255,215,0,0.15)] relative z-10 md:hidden">
            <img 
              src="/profile.jpg" 
              alt="Mohamed Hersi" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Mohamed+Hersi&background=FFD700&color=000&size=200`;
              }}
            />
          </div>
          
          <div className="flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              <Sparkles className="w-3 h-3 mr-2" />
              Welcome to my digital garden
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              Hi, I'm Mohamed Hersi.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl font-serif leading-relaxed">
              I explore the intersections of history, knowledge, and personal growth. 
              Join me as I share book summaries, deep dives, and insights to help you build a better mind.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/category/Articles')}
                className="px-8 py-4 bg-[#FFD700] text-black text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                Read Articles <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/category/Books')}
                className="px-8 py-4 bg-[#1a1a1a] text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                Book Summaries
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <h2 className="text-5xl md:text-[5rem] font-black tracking-tighter text-white uppercase leading-none">
            KNOWLEDGE <span className="text-[#FFD700]">HUB</span>
          </h2>
          {searchQuery && (
            <p className="text-gray-400 font-serif italic">
              Showing results for <span className="text-[#FFD700] font-bold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="bg-[#141414] p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-end border border-white/5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#e74c3c] opacity-50"></div>
          <div className="w-full lg:w-1/2">
            <label className="block text-[10px] font-bold text-[#FFD700] uppercase tracking-widest mb-3">Search the Archives</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
              <input
                type="text"
                placeholder="Keywords, titles, or authors..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-wrap gap-2">
            <button 
              onClick={() => setSearchParams({})}
              className={clsx(
                "px-5 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                !searchQuery ? "bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.3)]" : "bg-[#1a1a1a] text-gray-400 hover:text-white"
              )}
            >
              All
            </button>
            {['Books', 'Knowledge', 'History', 'Articles'].map(cat => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className="px-4 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                {cat === 'Books' && <span>📚</span>}
                {cat === 'Knowledge' && <span>🧠</span>}
                {cat === 'History' && <span>🏛</span>}
                {cat === 'Articles' && <span>✍️</span>}
                {cat === 'Books' ? 'Book Summaries' : cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-12 h-12 border-4 border-white/10 border-t-[#FFD700] rounded-full animate-spin" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-[#141414] rounded-2xl border border-white/5 shadow-lg">
          <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No posts found</h3>
          <p className="text-gray-400 max-w-md mx-auto">We couldn't find any articles matching your search. Try adjusting your keywords or browse by category.</p>
          {searchQuery && (
            <button 
              onClick={() => setSearchParams({})}
              className="mt-8 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
