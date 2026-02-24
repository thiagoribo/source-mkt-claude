-- SM Agency Admin Panel - Database Setup
-- Execute this SQL in your Supabase SQL Editor

-- =====================
-- TABLES
-- =====================

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url TEXT,
  is_founder BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  company VARCHAR(255),
  quote TEXT NOT NULL,
  result VARCHAR(255),
  image_url TEXT,
  service_slugs TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Cases/Portfolio
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  challenge TEXT,
  result VARCHAR(255),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Media Library
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  public_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  keywords TEXT[],
  canonical_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL
);

-- Blog Post Tags (junction table)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cases" ON cases FOR SELECT USING (is_active = true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read blog_tags" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "Public read blog_post_tags" ON blog_post_tags FOR SELECT USING (true);

-- Admin full access policies (for authenticated users)
CREATE POLICY "Admin all site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all cases" ON cases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog_categories" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog_tags" ON blog_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog_post_tags" ON blog_post_tags FOR ALL USING (auth.role() = 'authenticated');

-- =====================
-- STORAGE BUCKET
-- =====================

-- Create storage bucket for uploads (run this in SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'site-media');
CREATE POLICY "Admin upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'site-media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'site-media' AND auth.role() = 'authenticated');

-- =====================
-- HELPER FUNCTIONS
-- =====================

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================
-- INDEXES
-- =====================

CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_cases_active ON cases(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- =====================
-- SAMPLE DATA (Optional)
-- =====================

-- Insert sample blog category
INSERT INTO blog_categories (name, slug, description, display_order)
VALUES
  ('Branding', 'branding', 'Artigos sobre construção e gestão de marca', 1),
  ('Estratégia', 'estrategia', 'Conteúdo sobre planejamento estratégico', 2),
  ('Marketing', 'marketing', 'Dicas e tendências de marketing', 3)
ON CONFLICT (slug) DO NOTHING;
