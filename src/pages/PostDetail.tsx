import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Post } from '../types';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL || ''}/api/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Failed to fetch post', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#FFD700] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold tracking-tighter text-white mb-6">404</h1>
        <p className="text-xl text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/" className="bg-[#FFD700] text-[#0f0f0f] font-bold py-3 px-8 rounded-sm uppercase tracking-wider hover:bg-white transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFD700] origin-left z-50"
        style={{ scaleX }}
      />
      <article className="w-full max-w-4xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#FFD700] text-[10px] uppercase tracking-widest font-bold transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link 
              to={`/category/${post.category}`}
              className="bg-[#FFD700] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-[0_0_10px_rgba(255,215,0,0.2)]"
            >
              {post.category}
            </Link>
            <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest gap-4">
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" />
                <time dateTime={post.created_at}>
                  {format(new Date(post.created_at), 'MMMM dd, yyyy')}
                </time>
              </span>
              <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> 8 MIN READ</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-8">
            {post.title}
          </h1>
        </motion.div>

        {post.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16 rounded-xl overflow-hidden border border-white/5 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-50 z-10"></div>
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-auto object-cover aspect-[21/9]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FFD700] hover:prose-a:text-white prose-a:transition-colors prose-img:rounded-xl prose-hr:border-white/10 font-serif leading-relaxed text-gray-300 prose-p:mb-8 prose-blockquote:border-l-[#FFD700] prose-blockquote:bg-[#141414] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:shadow-md"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>
        
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 sm:mb-0">
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Share this article:</span>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:bg-white/10 transition-all border border-white/5 hover:border-[#1DA1F2]/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:bg-white/10 transition-all border border-white/5 hover:border-[#0A66C2]/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </button>
            </div>
          </div>
          <Link to={`/category/${post.category}`} className="inline-flex items-center text-[10px] font-bold text-gray-400 hover:text-[#FFD700] uppercase tracking-widest transition-colors">
            More in {post.category} <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
          </Link>
        </div>
      </article>
    </>
  );
}
