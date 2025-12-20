import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { apiClient } from './lib/apiClient'


import ProductDetailPage from './pages/ProductDetail'
import ServiceDetailPage from './pages/ServiceDetail'
import BlogDetailPage from './pages/BlogDetail'
// Pages
import ProductsPage from './pages/Products'
import ServicesPage from './pages/Services'
import BlogPage from './pages/Blog'
import ContactForm from './components/ContactForm'

// Admin Pages
import LoginPage from './pages/admin/pages/LoginPage'
import AdminDashboard from './pages/admin/pages/AdminDashboard'
import ThemeEditor from './pages/admin/pages/ThemeEditor'
import AdminLayout from './pages/admin/components/AdminLayout'
import ProtectedRoute from './pages/admin/components/ProtectedRoute'

// NEW: Admin Manager Pages
import ProductManager from './pages/admin/pages/ProductManager'
import ProductForm from './pages/admin/pages/ProductForm'
import ServiceManager from './pages/admin/pages/ServiceManager'
import ServiceForm from './pages/admin/pages/ServiceForm'
import BlogManager from './pages/admin/pages/BlogManager'
import BlogForm from './pages/admin/pages/BlogForm'

// Home Page (existing or placeholder)
function HomePage() {
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await apiClient.getCompanyInfo()
        if (res.success) {
          setCompanyInfo(res.data)
        }
      } catch (err) {
        console.error('Error fetching company info:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchInfo()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Paradeep Online</h1>
          <p className="text-xl text-blue-100 mb-8">Your premier destination for quality products and services</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">Premium selection of products curated for you</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
            <p className="text-gray-600">Quick delivery and responsive customer support</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing without compromising quality</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Contact us today for more information about our products and services</p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

// Contact Page
function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm mb-12">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">We'd love to hear from you. Get in touch with us today!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">📍 Address</h3>
                <p className="text-gray-600">Paradeep, Odisha, India</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📞 Phone</h3>
                <p className="text-gray-600">+91 (Your Phone)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📧 Email</h3>
                <p className="text-gray-600">info@paradeep-online.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">⏰ Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                <p className="text-gray-600">Saturday: 10 AM - 4 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

// Header/Navigation Component
function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🏨 Paradeep Online
        </Link>
        <nav className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
            Products
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
            Contact
          </Link>
          {/* Admin Login Link */}
          <Link to="/admin/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            🔐 Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Paradeep Online</h3>
            <p className="text-gray-400">Your trusted partner for quality products and services in Paradeep.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Customer Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">📍 Paradeep, Odisha</p>
            <p className="text-gray-400 mb-2">📞 +91 (Your Phone)</p>
            <p className="text-gray-400">📧 info@paradeep-online.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; {currentYear} Paradeep Online. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              {/* Admin Login Route (unprotected) */}
              <Route path="/admin/login" element={<LoginPage />} />

              {/* Admin Routes (protected) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                {/* Existing Routes */}
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="theme" element={<ThemeEditor />} />
                
                {/* NEW: Product Manager Routes */}
                <Route path="products" element={<ProductManager />} />
                <Route path="products/create" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                
                {/* NEW: Service Manager Routes */}
                <Route path="services" element={<ServiceManager />} />
                <Route path="services/create" element={<ServiceForm />} />
                <Route path="services/edit/:id" element={<ServiceForm />} />
                
                {/* NEW: Blog Manager Routes */}
                <Route path="blog" element={<BlogManager />} />
                <Route path="blog/create" element={<BlogForm />} />
                <Route path="blog/edit/:id" element={<BlogForm />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
