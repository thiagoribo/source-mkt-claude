import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogPost, useBlogPosts } from '@/hooks/queries/useBlogPosts';
import Layout from '@/components/layout/Layout';
import RevealSection from '@/components/shared/RevealSection';
import { Calendar, User, ArrowLeft, Tag, Clock, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useBlogPost(slug);
  const { data: allPosts = [] } = useBlogPosts({ status: 'published', limit: 4 });

  // Related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.id !== post?.id && p.category_id === post?.category_id)
    .slice(0, 3);

  // Reading time estimate
  const readingTime = post
    ? Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)
    : 0;

  // Share URL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-foreground/60">Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-serif mb-4">Post não encontrado</h1>
            <Link to="/blog" className="text-primary hover:underline">
              Voltar para o blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* SEO */}
      <Helmet>
        <title>{post.meta_title || post.title} | SM Agency Blog</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt || ''}
        />
        {post.keywords && (
          <meta name="keywords" content={post.keywords.join(', ')} />
        )}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta
          property="og:description"
          content={post.meta_description || post.excerpt || ''}
        />
        {post.featured_image_url && (
          <meta property="og:image" content={post.featured_image_url} />
        )}
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={post.published_at || post.created_at}
        />
        {post.author && (
          <meta property="article:author" content={post.author.name} />
        )}
        <link rel="canonical" href={post.canonical_url || shareUrl} />

        {/* Schema.org Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.featured_image_url,
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at,
            author: post.author
              ? {
                  '@type': 'Person',
                  name: post.author.name,
                }
              : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'SM Agency',
            },
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-sm">
          <RevealSection>
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o blog
            </Link>

            {/* Category */}
            {post.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 opacity-60" />
                <span className="text-sm font-mono uppercase tracking-wider opacity-70">
                  {post.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-[1.15] mb-6 max-w-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/60">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image_url && (
                    <img
                      src={post.author.image_url}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de leitura</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image_url && (
        <section className="-mt-8 mb-12">
          <div className="container-sm">
            <RevealSection>
              <div className="aspect-[21/9] overflow-hidden border-2 border-border">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container-sm">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <RevealSection>
                <div
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-img:border-2 prose-img:border-border"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </RevealSection>

              {/* Share */}
              <RevealSection delay={200}>
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground/60 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </span>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </RevealSection>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author */}
                {post.author && (
                  <RevealSection>
                    <div className="bg-secondary p-6">
                      <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mb-4">
                        Escrito por
                      </p>
                      <div className="flex items-center gap-4">
                        {post.author.image_url && (
                          <img
                            src={post.author.image_url}
                            alt={post.author.name}
                            className="w-12 h-12 object-cover"
                          />
                        )}
                        <div>
                          <p className="font-bold font-serif">{post.author.name}</p>
                          <p className="text-xs text-foreground/60">{post.author.role}</p>
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                )}

                {/* Related */}
                {relatedPosts.length > 0 && (
                  <RevealSection delay={100}>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mb-4">
                        Relacionados
                      </p>
                      <ul className="space-y-4">
                        {relatedPosts.map((p) => (
                          <li key={p.id}>
                            <Link
                              to={`/blog/${p.slug}`}
                              className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealSection>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
