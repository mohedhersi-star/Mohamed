import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Post } from '../types';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL || ''}/api/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_URL || ''}/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post', error);
      alert('An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#FFD700] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your content and posts</p>
          </div>
          <div className="flex items-center space-x-4 mt-6 sm:mt-0">
            <Link 
              to="/admin/post/new" 
              className="bg-[#FFD700] hover:bg-white text-[#0f0f0f] font-bold py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wider text-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-white/5 hover:bg-[#e74c3c] text-white font-bold py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wider text-sm flex items-center border border-white/10 hover:border-[#e74c3c]"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Featured</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No posts found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <motion.tr 
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white mb-1 line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-500 font-mono">{post.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-sm uppercase tracking-wider">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400 font-mono">
                        {format(new Date(post.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="p-4">
                        {post.is_featured ? (
                          <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">Yes</span>
                        ) : (
                          <span className="text-gray-600 text-xs uppercase tracking-wider">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <Link 
                            to={`/admin/post/edit/${post.id}`}
                            className="text-gray-400 hover:text-[#FFD700] transition-colors p-2 bg-white/5 rounded-md hover:bg-white/10"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(post.id)}
                            className="text-gray-400 hover:text-[#e74c3c] transition-colors p-2 bg-white/5 rounded-md hover:bg-white/10"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
