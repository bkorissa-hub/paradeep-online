-- ============================================
-- PARADEEP ONLINE - DATABASE SCHEMA
-- PostgreSQL Complete Database Initialization
-- ============================================

-- ============================================
-- CORE SETTINGS & CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS company_settings (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255),
  company_description TEXT,
  phone_primary VARCHAR(20),
  phone_secondary VARCHAR(20),
  email_primary VARCHAR(255),
  email_secondary VARCHAR(255),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  whatsapp_number VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  business_type VARCHAR(100),
  established_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- THEME & STYLING CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS theme_settings (
  id SERIAL PRIMARY KEY,
  -- Primary Colors
  color_primary VARCHAR(7),
  color_primary_hover VARCHAR(7),
  color_primary_active VARCHAR(7),
  -- Secondary Colors
  color_secondary VARCHAR(7),
  color_secondary_hover VARCHAR(7),
  -- Backgrounds
  color_bg_primary VARCHAR(7),
  color_bg_secondary VARCHAR(7),
  color_surface VARCHAR(7),
  -- Text Colors
  color_text_primary VARCHAR(7),
  color_text_secondary VARCHAR(7),
  color_text_light VARCHAR(7),
  -- Status Colors
  color_success VARCHAR(7),
  color_warning VARCHAR(7),
  color_error VARCHAR(7),
  color_info VARCHAR(7),
  -- Typography
  font_family_base VARCHAR(100),
  font_family_heading VARCHAR(100),
  font_family_mono VARCHAR(100),
  font_size_base INT,
  font_size_lg INT,
  font_size_xl INT,
  font_size_2xl INT,
  font_size_3xl INT,
  -- Spacing
  spacing_xs INT,
  spacing_sm INT,
  spacing_md INT,
  spacing_lg INT,
  spacing_xl INT,
  -- Border Radius
  radius_sm INT,
  radius_md INT,
  radius_lg INT,
  radius_full INT,
  -- Logo & Images
  logo_light_url VARCHAR(500),
  logo_dark_url VARCHAR(500),
  favicon_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- SOCIAL LINKS
-- ============================================

CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50),
  url VARCHAR(500),
  icon_name VARCHAR(100),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_platform (platform)
);

-- ============================================
-- HEADER CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS header_config (
  id SERIAL PRIMARY KEY,
  logo_text VARCHAR(100),
  logo_image_url VARCHAR(500),
  show_phone BOOLEAN DEFAULT TRUE,
  show_email BOOLEAN DEFAULT TRUE,
  show_search BOOLEAN DEFAULT FALSE,
  header_background_color VARCHAR(7),
  header_text_color VARCHAR(7),
  sticky_header BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- NAVIGATION MENU
-- ============================================

CREATE TABLE IF NOT EXISTS navigation_menu (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100),
  url VARCHAR(500),
  icon_name VARCHAR(100),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  has_submenu BOOLEAN DEFAULT FALSE,
  parent_id INT REFERENCES navigation_menu(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- HERO SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS hero_section (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(100),
  title VARCHAR(255),
  subtitle VARCHAR(500),
  description TEXT,
  background_image_url VARCHAR(500),
  background_color VARCHAR(7),
  text_color VARCHAR(7),
  cta_button_1_text VARCHAR(100),
  cta_button_1_link VARCHAR(500),
  cta_button_1_style VARCHAR(50),
  cta_button_2_text VARCHAR(100),
  cta_button_2_link VARCHAR(500),
  cta_button_2_style VARCHAR(50),
  show_breadcrumb BOOLEAN DEFAULT TRUE,
  height_type VARCHAR(50),
  animation_type VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_page_hero (page_slug)
);

-- ============================================
-- PRODUCT CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS product_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100),
  category_slug VARCHAR(100),
  category_description TEXT,
  category_image_url VARCHAR(500),
  icon_url VARCHAR(500),
  display_order INT,
  parent_category_id INT REFERENCES product_categories(id),
  is_active BOOLEAN DEFAULT TRUE,
  seo_title VARCHAR(160),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_category_slug (category_slug)
);

-- ============================================
-- PRODUCTS
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255),
  product_slug VARCHAR(255),
  category_id INT REFERENCES product_categories(id),
  product_description TEXT,
  product_image_url VARCHAR(500),
  product_images LONGTEXT,
  specifications LONGTEXT,
  display_price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  show_call_button BOOLEAN DEFAULT TRUE,
  show_whatsapp_button BOOLEAN DEFAULT TRUE,
  show_enquiry_form BOOLEAN DEFAULT TRUE,
  stock_status VARCHAR(50),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  seo_title VARCHAR(160),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_product_slug (product_slug),
  INDEX idx_category (category_id),
  INDEX idx_active (is_active),
  INDEX idx_featured (is_featured)
);

-- ============================================
-- SERVICE CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS service_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100),
  category_slug VARCHAR(100),
  description TEXT,
  icon_url VARCHAR(500),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_service_category_slug (category_slug)
);

-- ============================================
-- SERVICES
-- ============================================

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR(255),
  service_slug VARCHAR(255),
  category_id INT REFERENCES service_categories(id),
  description TEXT,
  detailed_description TEXT,
  service_image_url VARCHAR(500),
  icon_url VARCHAR(500),
  base_rate DECIMAL(10, 2),
  rate_unit VARCHAR(50),
  available_monday BOOLEAN DEFAULT TRUE,
  available_tuesday BOOLEAN DEFAULT TRUE,
  available_wednesday BOOLEAN DEFAULT TRUE,
  available_thursday BOOLEAN DEFAULT TRUE,
  available_friday BOOLEAN DEFAULT TRUE,
  available_saturday BOOLEAN DEFAULT TRUE,
  available_sunday BOOLEAN DEFAULT FALSE,
  opening_time TIME,
  closing_time TIME,
  turnaround_days INT,
  show_booking_button BOOLEAN DEFAULT TRUE,
  show_call_button BOOLEAN DEFAULT TRUE,
  show_whatsapp_button BOOLEAN DEFAULT TRUE,
  available_locations LONGTEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  seo_title VARCHAR(160),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_service_slug (service_slug),
  INDEX idx_category (category_id),
  INDEX idx_active (is_active),
  INDEX idx_featured (is_featured)
);

-- ============================================
-- BLOG CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100),
  category_slug VARCHAR(100),
  description TEXT,
  color VARCHAR(7),
  icon_url VARCHAR(500),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_blog_category_slug (category_slug)
);

-- ============================================
-- BLOG POSTS
-- ============================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255),
  category_id INT REFERENCES blog_categories(id),
  author_name VARCHAR(100),
  featured_image_url VARCHAR(500),
  content LONGTEXT,
  excerpt VARCHAR(500),
  is_published BOOLEAN DEFAULT FALSE,
  published_date TIMESTAMP,
  scheduled_date TIMESTAMP,
  views_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  reading_time_minutes INT,
  tags LONGTEXT,
  seo_title VARCHAR(160),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_blog_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_published (is_published),
  INDEX idx_published_date (published_date)
);

-- ============================================
-- BLOG COMMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS blog_comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES blog_posts(id),
  commenter_name VARCHAR(100),
  commenter_email VARCHAR(255),
  comment_text TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_post (post_id),
  INDEX idx_approved (is_approved)
);

-- ============================================
-- PAGES
-- ============================================

CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(100),
  page_slug VARCHAR(100),
  hero_section_id INT REFERENCES hero_section(id),
  content_blocks LONGTEXT,
  show_sidebar BOOLEAN DEFAULT FALSE,
  sidebar_widgets LONGTEXT,
  is_published BOOLEAN DEFAULT TRUE,
  is_homepage BOOLEAN DEFAULT FALSE,
  show_in_menu BOOLEAN DEFAULT TRUE,
  menu_position INT,
  seo_title VARCHAR(160),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_page_slug (page_slug),
  INDEX idx_published (is_published),
  INDEX idx_homepage (is_homepage)
);

-- ============================================
-- BANNERS
-- ============================================

CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  banner_title VARCHAR(255),
  banner_description TEXT,
  banner_image_url VARCHAR(500),
  background_color VARCHAR(7),
  text_color VARCHAR(7),
  cta_text VARCHAR(100),
  cta_link VARCHAR(500),
  cta_style VARCHAR(50),
  banner_type VARCHAR(50),
  display_location VARCHAR(100),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  animation_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_display_location (display_location)
);

-- ============================================
-- FOOTER CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS footer_config (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255),
  company_description TEXT,
  footer_logo_url VARCHAR(500),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  column_1_title VARCHAR(100),
  column_1_links LONGTEXT,
  column_2_title VARCHAR(100),
  column_2_links LONGTEXT,
  column_3_title VARCHAR(100),
  column_3_links LONGTEXT,
  show_newsletter BOOLEAN DEFAULT TRUE,
  newsletter_title VARCHAR(255),
  newsletter_placeholder VARCHAR(100),
  show_social_links BOOLEAN DEFAULT TRUE,
  show_payment_methods BOOLEAN DEFAULT FALSE,
  copyright_text VARCHAR(500),
  background_color VARCHAR(7),
  text_color VARCHAR(7),
  link_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- CONTACT ENQUIRIES
-- ============================================

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT,
  enquiry_type VARCHAR(50),
  related_product_id INT REFERENCES products(id),
  related_service_id INT REFERENCES services(id),
  status VARCHAR(50),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email)
);

-- ============================================
-- TESTIMONIALS
-- ============================================

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100),
  customer_title VARCHAR(100),
  customer_image_url VARCHAR(500),
  testimonial_text TEXT,
  rating INT,
  related_service_id INT REFERENCES services(id),
  related_product_id INT REFERENCES products(id),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_featured (is_featured)
);

-- ============================================
-- SEO REDIRECTS
-- ============================================

CREATE TABLE IF NOT EXISTS seo_redirects (
  id SERIAL PRIMARY KEY,
  old_url VARCHAR(500),
  new_url VARCHAR(500),
  redirect_type VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_old_url (old_url)
);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

INSERT INTO company_settings (company_name, company_description, phone_primary, email_primary, address_line1, city, state, country, business_type, established_year) VALUES
('Paradeep Online Computer Services', 'Your trusted partner for all computer sales, service, and repair needs. Quality service since 2010.', '+91 1234567890', 'info@paradiponline.com', '123 Tech Street', 'Paradeep', 'Odisha', 'India', 'Computer Sales/Service/Repair', 2010);

INSERT INTO theme_settings (
  color_primary, color_primary_hover, color_primary_active,
  color_secondary, color_secondary_hover,
  color_bg_primary, color_bg_secondary, color_surface,
  color_text_primary, color_text_secondary, color_text_light,
  color_success, color_warning, color_error, color_info,
  font_family_base, font_family_heading, font_family_mono,
  font_size_base, font_size_lg, font_size_xl, font_size_2xl, font_size_3xl,
  spacing_xs, spacing_sm, spacing_md, spacing_lg, spacing_xl,
  radius_sm, radius_md, radius_lg, radius_full
) VALUES (
  '#2080B8', '#1A5FA8', '#0D3F78',
  '#6C757D', '#5A6268',
  '#FFFFFF', '#F9FAFB', '#F3F4F6',
  '#1F2937', '#6B7280', '#9CA3AF',
  '#10B981', '#F59E0B', '#EF4444', '#3B82F6',
  'Inter, sans-serif', 'Poppins, sans-serif', 'Menlo, monospace',
  16, 18, 20, 24, 30,
  4, 8, 12, 16, 24,
  4, 8, 12, 9999
);

INSERT INTO header_config (logo_text, show_phone, show_email, sticky_header) VALUES
('Paradeep Online', TRUE, TRUE, TRUE);

INSERT INTO footer_config (company_name, company_description, phone, email, address, copyright_text, show_newsletter, show_social_links) VALUES
('Paradeep Online Computer Services', 'Trusted computer sales, service, and repair partner', '+91 1234567890', 'info@paradiponline.com', '123 Tech Street, Paradeep, Odisha', '© 2024 Paradeep Online. All rights reserved.', TRUE, TRUE);

INSERT INTO navigation_menu (label, url, display_order, is_active) VALUES
('Home', '/', 1, TRUE),
('Products', '/products', 2, TRUE),
('Services', '/services', 3, TRUE),
('Blog', '/blog', 4, TRUE),
('About Us', '/about', 5, TRUE),
('Contact', '/contact', 6, TRUE);

INSERT INTO blog_categories (category_name, category_slug, display_order, is_active) VALUES
('Technology Tips', 'tech-tips', 1, TRUE),
('Product Reviews', 'product-reviews', 2, TRUE),
('How-To Guides', 'how-to-guides', 3, TRUE),
('News & Updates', 'news-updates', 4, TRUE);

INSERT INTO product_categories (category_name, category_slug, display_order, is_active) VALUES
('Laptops', 'laptops', 1, TRUE),
('Desktops', 'desktops', 2, TRUE),
('Components', 'components', 3, TRUE),
('Peripherals', 'peripherals', 4, TRUE),
('Accessories', 'accessories', 5, TRUE);

INSERT INTO service_categories (category_name, category_slug, display_order, is_active) VALUES
('Hardware Repair', 'hardware-repair', 1, TRUE),
('Software Installation', 'software-installation', 2, TRUE),
('Data Recovery', 'data-recovery', 3, TRUE),
('System Optimization', 'system-optimization', 4, TRUE),
('Networking', 'networking', 5, TRUE);

INSERT INTO social_links (platform, url, icon_name, display_order, is_active) VALUES
('Facebook', 'https://facebook.com/paradiponline', 'facebook', 1, TRUE),
('Twitter', 'https://twitter.com/paradiponline', 'twitter', 2, TRUE),
('Instagram', 'https://instagram.com/paradiponline', 'instagram', 3, TRUE),
('WhatsApp', 'https://wa.me/911234567890', 'whatsapp', 4, TRUE),
('LinkedIn', 'https://linkedin.com/company/paradiponline', 'linkedin', 5, TRUE);
