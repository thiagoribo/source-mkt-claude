import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/queries/useBlogPosts';
import { useBlogCategories } from '@/hooks/queries/useBlogCategories';
import Layout from '@/components/layout/Layout';
import RevealSection from '@/components/shared/RevealSection';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPostWithRelations } from '@/types/database';

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: posts = [], isLoading } = useBlogPosts({ status: 'published' });
  const { data: categories = [] } = useBlogCategories();

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category_id === selectedCategory)
    : posts;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container-sm">
          <RevealSection>
            <p className="text-xs font-mono tracking-[0.3em] uppercase opacity-60 mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.1] mb-6">
              Insights de{' '}
              <span className="italic">Branding</span>
              <br />& Estratégia
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">
              Artigos, estudos de caso e reflexões sobre posicionamento, marca e crescimento de negócios.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-sm">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <RevealSection>
                <div className="sticky top-8">
                  <h3 className="font-bold font-serif text-lg mb-4">Categorias</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          'text-sm transition-colors',
                          !selectedCategory
                            ? 'text-primary font-medium'
                            : 'text-foreground/60 hover:text-primary'
                        )}
                      >
                        Todos os posts
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(cat.id)}
                          className={cn(
                            'text-sm transition-colors',
                            selectedCategory === cat.id
                              ? 'text-primary font-medium'
                              : 'text-foreground/60 hover:text-primary'
                          )}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            </aside>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12 text-foreground/60">
                  Carregando...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-foreground/60">
                  Nenhum post encontrado.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, i) => (
                    <RevealSection key={post.id} delay={i * 100}>
                      <PostCard post={post} />
                    </RevealSection>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PostCard({ post }: { post: BlogPostWithRelations }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-background border-2 border-border hover:border-primary transition-all duration-300"
    >
      {/* Image */}
      {post.featured_image_url && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {post.category && (
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-3 h-3 text-foreground/40" />
            <span className="text-xs font-mono uppercase tracking-wider text-foreground/50">
              {post.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-foreground/60 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-foreground/40">
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span>{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Read More */}
        <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Ler artigo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
