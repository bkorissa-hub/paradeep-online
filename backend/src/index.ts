import express, { Express, Request, Response } from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'paradeep_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err)
  })

// ==================== FILE UPLOAD CONFIG ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type || 'products'
    const uploadPath = path.join(__dirname, `../uploads/${type}`)
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'))
    }
  }
})

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.post('/api/upload/:type', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const imageUrl = `${process.env.BACKEND_URL || `http://localhost:${PORT}`}/uploads/${req.params.type}/${req.file.filename}`

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload file', error: String(error) })
  }
})

app.delete('/api/upload/:type/:filename', (req: Request, res: Response) => {
  try {
    const { type, filename } = req.params
    const filePath = path.join(__dirname, `../uploads/${type}/${filename}`)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.json({ success: true, message: 'File deleted successfully' })
    } else {
      res.status(404).json({ success: false, message: 'File not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete file', error: String(error) })
  }
})

// ==================== AUTH ====================
const generateToken = () => Buffer.from(`admin:${Date.now()}`).toString('base64')

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin123') {
      return res.json({ success: true, token: generateToken(), message: 'Login successful' })
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: String(error) })
  }
})

// ==================== THEME ====================
app.get('/api/theme', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query('SELECT * FROM theme_settings LIMIT 1')
    connection.release()
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Theme not found' })
    res.json({ success: true, data: rows[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch theme', error: String(error) })
  }
})

app.put('/api/admin/theme', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { color_primary, color_secondary, font_family_base, spacing_unit } = req.body
    await connection.query(
      'UPDATE theme_settings SET color_primary = ?, color_secondary = ?, font_family_base = ?, spacing_unit = ?, updated_at = NOW()',
      [color_primary, color_secondary, font_family_base, spacing_unit]
    )
    connection.release()
    res.json({ success: true, message: 'Theme updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update theme', error: String(error) })
  }
})

// ==================== PRODUCTS ====================
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { category_id, featured, search } = req.query
    let query = 'SELECT * FROM products WHERE is_active = 1'
    const params: any[] = []

    if (category_id) {
      query += ' AND category_id = ?'
      params.push(category_id)
    }
    if (featured === 'true') query += ' AND is_featured = 1'
    if (search) {
      query += ' AND (product_name LIKE ? OR product_description LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }
    query += ' ORDER BY created_at DESC LIMIT 100'

    const [rows]: any = await connection.query(query, params)
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: String(error) })
  }
})

app.get('/api/products/:slug', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [products]: any = await connection.query('SELECT * FROM products WHERE product_slug = ?', [req.params.slug])
    if (products.length === 0) {
      connection.release()
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    const product = products[0]
    await connection.query('UPDATE products SET views_count = views_count + 1 WHERE id = ?', [product.id])
    const [related]: any = await connection.query('SELECT * FROM products WHERE category_id = ? AND id != ? AND is_active = 1 LIMIT 5', [product.category_id, product.id])
    connection.release()
    res.json({ success: true, data: { ...product, related_products: related } })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: String(error) })
  }
})

app.get('/api/product-categories', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query('SELECT * FROM product_categories WHERE is_active = 1 ORDER BY category_name')
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: String(error) })
  }
})

app.post('/api/admin/products', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { product_name, category_id, product_description, display_price, original_price, product_image_url, specifications, show_call_button, show_whatsapp_button, show_enquiry_form, stock_status, is_featured, badge, seo_title, seo_description, seo_keywords } = req.body
    const product_slug = product_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await connection.query(
      `INSERT INTO products (product_name, product_slug, category_id, product_description, product_image_url, specifications, display_price, original_price, show_call_button, show_whatsapp_button, show_enquiry_form, stock_status, is_featured, badge, seo_title, seo_description, seo_keywords, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
      [product_name, product_slug, category_id, product_description, product_image_url, specifications, display_price, original_price || null, show_call_button, show_whatsapp_button, show_enquiry_form, stock_status, is_featured, badge || null, seo_title, seo_description, seo_keywords]
    )
    connection.release()
    res.json({ success: true, message: 'Product created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error: String(error) })
  }
})

app.get('/api/admin/products/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [products]: any = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    connection.release()
    if (products.length === 0) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, data: products[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: String(error) })
  }
})

app.put('/api/admin/products/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { product_name, category_id, product_description, display_price, original_price, product_image_url, specifications, show_call_button, show_whatsapp_button, show_enquiry_form, stock_status, is_featured, badge, seo_title, seo_description, seo_keywords } = req.body
    const product_slug = product_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await connection.query(
      `UPDATE products SET product_name = ?, product_slug = ?, category_id = ?, product_description = ?, product_image_url = ?, specifications = ?, display_price = ?, original_price = ?, show_call_button = ?, show_whatsapp_button = ?, show_enquiry_form = ?, stock_status = ?, is_featured = ?, badge = ?, seo_title = ?, seo_description = ?, seo_keywords = ?, updated_at = NOW() WHERE id = ?`,
      [product_name, product_slug, category_id, product_description, product_image_url, specifications, display_price, original_price || null, show_call_button, show_whatsapp_button, show_enquiry_form, stock_status, is_featured, badge || null, seo_title, seo_description, seo_keywords, req.params.id]
    )
    connection.release()
    res.json({ success: true, message: 'Product updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: String(error) })
  }
})

app.delete('/api/admin/products/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('DELETE FROM products WHERE id = ?', [req.params.id])
    connection.release()
    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error: String(error) })
  }
})

// ==================== SERVICES ====================
app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { category_id, featured, search } = req.query
    let query = 'SELECT * FROM services WHERE is_active = 1'
    const params: any[] = []
    if (category_id) {
      query += ' AND category_id = ?'
      params.push(category_id)
    }
    if (featured === 'true') query += ' AND is_featured = 1'
    if (search) {
      query += ' AND (service_name LIKE ? OR description LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    query += ' ORDER BY created_at DESC LIMIT 100'
    const [rows]: any = await connection.query(query, params)
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services', error: String(error) })
  }
})

app.get('/api/services/:slug', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [services]: any = await connection.query('SELECT * FROM services WHERE service_slug = ?', [req.params.slug])
    if (services.length === 0) {
      connection.release()
      return res.status(404).json({ success: false, message: 'Service not found' })
    }
    await connection.query('UPDATE services SET views_count = views_count + 1 WHERE id = ?', [services[0].id])
    connection.release()
    res.json({ success: true, data: services[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch service', error: String(error) })
  }
})

app.get('/api/service-categories', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query('SELECT * FROM service_categories WHERE is_active = 1 ORDER BY category_name')
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: String(error) })
  }
})

app.post('/api/admin/services', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { service_name, category_id, description, detailed_description, base_rate, rate_unit, service_image_url, show_call_button, show_whatsapp_button, show_booking_button, is_featured, seo_title, seo_description } = req.body
    const service_slug = service_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await connection.query(
      `INSERT INTO services (service_name, service_slug, category_id, description, detailed_description, base_rate, rate_unit, service_image_url, show_call_button, show_whatsapp_button, show_booking_button, is_featured, seo_title, seo_description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
      [service_name, service_slug, category_id, description, detailed_description, base_rate, rate_unit, service_image_url, show_call_button, show_whatsapp_button, show_booking_button, is_featured, seo_title, seo_description]
    )
    connection.release()
    res.json({ success: true, message: 'Service created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create service', error: String(error) })
  }
})

app.get('/api/admin/services/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [services]: any = await connection.query('SELECT * FROM services WHERE id = ?', [req.params.id])
    connection.release()
    if (services.length === 0) return res.status(404).json({ success: false, message: 'Service not found' })
    res.json({ success: true, data: services[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch service', error: String(error) })
  }
})

app.put('/api/admin/services/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { service_name, category_id, description, detailed_description, base_rate, rate_unit, service_image_url, show_call_button, show_whatsapp_button, show_booking_button, is_featured, seo_title, seo_description } = req.body
    const service_slug = service_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await connection.query(
      `UPDATE services SET service_name = ?, service_slug = ?, category_id = ?, description = ?, detailed_description = ?, base_rate = ?, rate_unit = ?, service_image_url = ?, show_call_button = ?, show_whatsapp_button = ?, show_booking_button = ?, is_featured = ?, seo_title = ?, seo_description = ?, updated_at = NOW() WHERE id = ?`,
      [service_name, service_slug, category_id, description, detailed_description, base_rate, rate_unit, service_image_url, show_call_button, show_whatsapp_button, show_booking_button, is_featured, seo_title, seo_description, req.params.id]
    )
    connection.release()
    res.json({ success: true, message: 'Service updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update service', error: String(error) })
  }
})

app.delete('/api/admin/services/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('DELETE FROM services WHERE id = ?', [req.params.id])
    connection.release()
    res.json({ success: true, message: 'Service deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service', error: String(error) })
  }
})

// ==================== BLOG ====================
app.get('/api/blog', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { category_id, featured, search } = req.query
    let query = 'SELECT * FROM blog_posts WHERE is_published = 1'
    const params: any[] = []
    if (category_id) {
      query += ' AND category_id = ?'
      params.push(category_id)
    }
    if (featured === 'true') query += ' AND is_featured = 1'
    if (search) {
      query += ' AND (title LIKE ? OR excerpt LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    query += ' ORDER BY published_date DESC LIMIT 100'
    const [rows]: any = await connection.query(query, params)
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog posts', error: String(error) })
  }
})

app.get('/api/blog/:slug', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [posts]: any = await connection.query('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1', [req.params.slug])
    if (posts.length === 0) {
      connection.release()
      return res.status(404).json({ success: false, message: 'Blog post not found' })
    }
    const post = posts[0]
    await connection.query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [post.id])
    const [related]: any = await connection.query('SELECT * FROM blog_posts WHERE category_id = ? AND id != ? AND is_published = 1 LIMIT 3', [post.category_id, post.id])
    connection.release()
    res.json({ success: true, data: { ...post, related_posts: related } })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog post', error: String(error) })
  }
})

app.get('/api/blog-categories', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query('SELECT * FROM blog_categories WHERE is_active = 1 ORDER BY category_name')
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: String(error) })
  }
})

app.post('/api/admin/blog', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { title, category_id, author_name, featured_image_url, youtube_url, content, excerpt, is_published, is_featured, tags, seo_title, seo_description } = req.body
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const published_date = is_published ? new Date() : null
    await connection.query(
      `INSERT INTO blog_posts (title, slug, category_id, author_name, featured_image_url, youtube_url, content, excerpt, is_published, published_date, is_featured, tags, seo_title, seo_description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, slug, category_id, author_name, featured_image_url, youtube_url, content, excerpt, is_published, published_date, is_featured, tags, seo_title, seo_description]
    )
    connection.release()
    res.json({ success: true, message: 'Blog post created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog post', error: String(error) })
  }
})

app.get('/api/admin/blog/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [posts]: any = await connection.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id])
    connection.release()
    if (posts.length === 0) return res.status(404).json({ success: false, message: 'Blog post not found' })
    res.json({ success: true, data: posts[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog post', error: String(error) })
  }
})

app.put('/api/admin/blog/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { title, category_id, author_name, featured_image_url, youtube_url, content, excerpt, is_published, is_featured, tags, seo_title, seo_description } = req.body
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const published_date = is_published ? new Date() : null
    await connection.query(
      `UPDATE blog_posts SET title = ?, slug = ?, category_id = ?, author_name = ?, featured_image_url = ?, youtube_url = ?, content = ?, excerpt = ?, is_published = ?, published_date = ?, is_featured = ?, tags = ?, seo_title = ?, seo_description = ?, updated_at = NOW() WHERE id = ?`,
      [title, slug, category_id, author_name, featured_image_url, youtube_url, content, excerpt, is_published, published_date, is_featured, tags, seo_title, seo_description, req.params.id]
    )
    connection.release()
    res.json({ success: true, message: 'Blog post updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update blog post', error: String(error) })
  }
})

app.delete('/api/admin/blog/:id', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id])
    connection.release()
    res.json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog post', error: String(error) })
  }
})
//===================================================================
// GET /api/admin/blog - Get all blog posts for admin (including unpublished)
app.get('/api/admin/blog', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query(
      `SELECT b.*, bc.category_name 
       FROM blog_posts b 
       LEFT JOIN blog_categories bc ON b.category_id = bc.id 
       ORDER BY b.created_at DESC`
    )
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog posts', error: String(error) })
  }
})

// GET /api/admin/products - Get all products for admin
app.get('/api/admin/products', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query(
      `SELECT p.*, pc.category_name 
       FROM products p 
       LEFT JOIN product_categories pc ON p.category_id = pc.id 
       ORDER BY p.created_at DESC`
    )
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: String(error) })
  }
})

// GET /api/admin/services - Get all services for admin
app.get('/api/admin/services', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query(
      `SELECT s.*, sc.category_name 
       FROM services s 
       LEFT JOIN service_categories sc ON s.category_id = sc.id 
       ORDER BY s.created_at DESC`
    )
    connection.release()
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services', error: String(error) })
  }
})

// ==================== CONTACT ====================
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const { name, email, phone, subject, message } = req.body
    await connection.query(`INSERT INTO contact_enquiries (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())`, [name, email, phone, subject, message])
    connection.release()
    res.json({ success: true, message: 'Thank you for your enquiry. We will get back to you soon!' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit enquiry', error: String(error) })
  }
})

// ==================== COMPANY INFO ====================
app.get('/api/company-info', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [rows]: any = await connection.query('SELECT * FROM company_info LIMIT 1')
    connection.release()
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Company info not found' })
    res.json({ success: true, data: rows[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch company info', error: String(error) })
  }
})

// ==================== HEALTH ====================
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Backend is running', timestamp: new Date().toISOString() })
})

// ==================== 404 ====================
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.path })
})

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📦 Database: ${process.env.DB_NAME}`)
})
