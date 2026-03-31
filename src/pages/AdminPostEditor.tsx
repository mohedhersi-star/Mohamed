import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Articles');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      const fetchPost = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_APP_URL || ''}/api/posts`);
          const data = await res.json();
          const post = data.find((p: any) => p.id === parseInt(id));
          
          if (post) {
            setTitle(post.title);
            setContent(post.content);
            setCategory(post.category);
            setImageUrl(post.image_url || '');
            setIsFeatured(post.is_featured);
          } else {
            setError('Post not found');
          }
        } catch (err) {
          setError('Failed to fetch post');
        }
      };

      fetchPost();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('adminToken');
    const url = isEditing 
      ? `${import.meta.env.VITE_APP_URL || ''}/api/posts/${id}` 
      : `${import.meta.env.VITE_APP_URL || ''}/api/posts`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          category,
          image_url: imageUrl,
          is_featured: isFeatured
        })
      });

      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save post');
      }
    } catch (err) {
      setError('An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Books', 'Knowledge', 'History', 'Articles'];

  return (
    <div className="bg-[#0f0f0f] min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-[#FFD700] text-sm uppercase tracking-wider font-bold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-gray-400">Write and publish your content</p>
        </motion.div>

        {error && (
          <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/50 text-[#e74c3c] px-4 py-3 rounded-md mb-8 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white text-lg font-bold focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                  placeholder="Enter a compelling title..."
                  required
                />
              </div>

              <div className="bg-[#141414] p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">Content (Markdown)</label>
                  <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-xs text-[#FFD700] hover:underline">Markdown Guide</a>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-gray-300 font-mono text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                  placeholder="Write your content here using Markdown..."
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/10">
                <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">Publish Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 px-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all appearance-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-[#1a1a1a] text-white">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Featured Image URL</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-white text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {imageUrl && (
                      <div className="mt-3 rounded-md overflow-hidden border border-white/10 aspect-video bg-black/50">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${isFeatured ? 'bg-[#FFD700]' : 'bg-white/10 border border-white/20'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isFeatured ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        Feature this post
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Featured posts appear prominently on the homepage.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold py-4 px-4 rounded-md transition-colors uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#e74c3c]/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {isEditing ? 'Update Post' : 'Publish Post'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
