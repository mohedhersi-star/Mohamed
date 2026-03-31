import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Post } from '../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-[#141414] rounded-xl border border-white/5 overflow-hidden shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(255,215,0,0.1)] hover:border-white/10 transition-all duration-500 h-full"
    >
      <Link to={`/post/${post.slug}`} className="block relative aspect-[1.6/1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10 opacity-80"></div>
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
            <span className="text-gray-600 font-medium tracking-widest uppercase">{post.category}</span>
          </div>
        )}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#FFD700] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-grow p-6 md:p-8 relative">
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <Link to={`/post/${post.slug}`} className="block group-hover:text-[#FFD700] transition-colors duration-300">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-base font-serif italic line-clamp-3 mb-8 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors">
          {post.content.replace(/[#*`_~>]/g, '').substring(0, 150)}...
        </p>

        <div className="mt-auto flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-4 border-t border-white/5">
          <div className="flex items-center space-x-3">
            <span className="text-[#FFD700]">8 MIN READ</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), 'MMM dd, yyyy')}
            </time>
          </div>
          <ArrowRight className="w-5 h-5 text-[#e74c3c] group-hover:translate-x-2 group-hover:text-[#FFD700] transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
