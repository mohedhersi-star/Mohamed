/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Category from './pages/Category';
import PostDetail from './pages/PostDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPostEditor from './pages/AdminPostEditor';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-[#0f0f0f] text-white font-sans selection:bg-[#FFD700] selection:text-black">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-grow px-4 md:px-12 pb-16 pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/post/new" element={<AdminPostEditor />} />
              <Route path="/admin/post/edit/:id" element={<AdminPostEditor />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
