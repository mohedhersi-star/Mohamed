import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL || ''}/api/posts?category=${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchPosts();
    }
  }, [category]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-[5rem] font-black tracking-tighter text-white uppercase mb-8 leading-none">
          {category} <span className="text-[#FFD700]">ARCHIVE</span>
        </h1>

        <div className="bg-[#141414] p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-end border border-white/5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#e74c3c] opacity-50"></div>
          <div className="w-full lg:w-1/2">
            <label className="block text-[10px] font-bold text-[#FFD700] uppercase tracking-widest mb-3">Search the Archives</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
              <input
                type="text"
                placeholder="Keywords, titles, or authors..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/?q=${e.currentTarget.value}`);
                  }
                }}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-wrap gap-2">
            <button 
              onClick={() => navigate('/')}
              className="px-5 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all bg-[#1a1a1a] text-gray-400 hover:text-white"
            >
              All
            </button>
            {['Books', 'Knowledge', 'History', 'Articles'].map(cat => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className={clsx(
                  "px-4 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 border border-transparent",
                  category === cat 
                    ? "bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.3)]" 
                    : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10"
                )}
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
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No posts found in this category</h3>
          <p className="text-gray-400 max-w-md mx-auto">Check back later for new content or explore other categories.</p>
        </div>
      )}
    </div>
  );
}
