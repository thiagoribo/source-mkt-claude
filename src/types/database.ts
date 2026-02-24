export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string | null;
          image_url: string | null;
          is_founder: boolean;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          bio?: string | null;
          image_url?: string | null;
          is_founder?: boolean;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          bio?: string | null;
          image_url?: string | null;
          is_founder?: boolean;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          price_starting: string | null;
          highlights: string[] | null;
          sections: Json | null;
          display_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          price_starting?: string | null;
          highlights?: string[] | null;
          sections?: Json | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          price_starting?: string | null;
          highlights?: string[] | null;
          sections?: Json | null;
          display_order?: number;
          is_active?: boolean;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          company: string | null;
          quote: string;
          result: string | null;
          image_url: string | null;
          service_slugs: string[] | null;
          is_featured: boolean;
          display_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          company?: string | null;
          quote: string;
          result?: string | null;
          image_url?: string | null;
          service_slugs?: string[] | null;
          is_featured?: boolean;
          display_order?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          company?: string | null;
          quote?: string;
          result?: string | null;
          image_url?: string | null;
          service_slugs?: string[] | null;
          is_featured?: boolean;
          display_order?: number;
          is_active?: boolean;
        };
      };
      cases: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          challenge: string | null;
          result: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          challenge?: string | null;
          result?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string | null;
          challenge?: string | null;
          result?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
      };
      page_content: {
        Row: {
          id: string;
          page_slug: string;
          section_key: string;
          content: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_slug: string;
          section_key: string;
          content: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_slug?: string;
          section_key?: string;
          content?: Json;
          updated_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          filename: string;
          public_url: string;
          alt_text: string | null;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          public_url: string;
          alt_text?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          public_url?: string;
          alt_text?: string | null;
          category?: string | null;
          created_at?: string;
        };
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          display_order?: number;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image_url: string | null;
          category_id: string | null;
          author_id: string | null;
          meta_title: string | null;
          meta_description: string | null;
          keywords: string[] | null;
          canonical_url: string | null;
          status: 'draft' | 'published' | 'scheduled';
          published_at: string | null;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          featured_image_url?: string | null;
          category_id?: string | null;
          author_id?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          keywords?: string[] | null;
          canonical_url?: string | null;
          status?: 'draft' | 'published' | 'scheduled';
          published_at?: string | null;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          featured_image_url?: string | null;
          category_id?: string | null;
          author_id?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          keywords?: string[] | null;
          canonical_url?: string | null;
          status?: 'draft' | 'published' | 'scheduled';
          published_at?: string | null;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      blog_post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Specific table types
export type SiteSetting = Tables<'site_settings'>;
export type TeamMember = Tables<'team_members'>;
export type Service = Tables<'services'>;
export type Testimonial = Tables<'testimonials'>;
export type Case = Tables<'cases'>;
export type PageContent = Tables<'page_content'>;
export type Media = Tables<'media'>;
export type BlogCategory = Tables<'blog_categories'>;
export type BlogPost = Tables<'blog_posts'>;
export type BlogTag = Tables<'blog_tags'>;

// Insert types
export type InsertTeamMember = InsertTables<'team_members'>;
export type InsertTestimonial = InsertTables<'testimonials'>;
export type InsertCase = InsertTables<'cases'>;
export type InsertBlogPost = InsertTables<'blog_posts'>;
export type InsertBlogCategory = InsertTables<'blog_categories'>;
export type InsertBlogTag = InsertTables<'blog_tags'>;
export type InsertMedia = InsertTables<'media'>;

// Blog post with relations
export interface BlogPostWithRelations extends BlogPost {
  category?: BlogCategory | null;
  author?: TeamMember | null;
  tags?: BlogTag[];
}
