import express from 'express';
import { db } from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Get all posts (with optional search and category filters)
router.get('/', async (req, res) => {
  try {
    const { search, category, featured } = req.query;
    let query = 'SELECT * FROM posts WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true') {
      query += ' AND is_featured = 1';
    }

    query += ' ORDER BY created_at DESC';

    const posts = await db.all(query, params);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await db.get('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new post (Admin only)
router.post('/', authenticateToken, async (req: any, res: any) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  const { title, content, category, image_url, is_featured } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Title, content, and category are required' });
  }

  let slug = generateSlug(title);
  
  try {
    // Check if slug exists
    const existing = await db.get('SELECT id FROM posts WHERE slug = ?', [slug]);
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await db.run(
      'INSERT INTO posts (title, slug, content, category, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, content, category, image_url, is_featured ? 1 : 0]
    );

    const newPost = await db.get('SELECT * FROM posts WHERE id = ?', [result.lastID]);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a post (Admin only)
router.put('/:id', authenticateToken, async (req: any, res: any) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  const { title, content, category, image_url, is_featured } = req.body;
  const id = req.params.id;

  try {
    let slug = generateSlug(title);
    const existing = await db.get('SELECT id FROM posts WHERE slug = ? AND id != ?', [slug, id]);
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    await db.run(
      'UPDATE posts SET title = ?, slug = ?, content = ?, category = ?, image_url = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, slug, content, category, image_url, is_featured ? 1 : 0, id]
    );

    const updatedPost = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a post (Admin only)
router.delete('/:id', authenticateToken, async (req: any, res: any) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);

  try {
    await db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
