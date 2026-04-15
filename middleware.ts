/**
 * Vercel Edge Middleware — OG tags dinâmicas para posts do blog
 *
 * Bots sociais (LinkedIn, WhatsApp, Facebook, etc.) não executam JS.
 * Este middleware intercepta requests de bots para /blog/* e retorna
 * um HTML mínimo com as OG tags corretas buscadas diretamente do Supabase.
 * Usuários comuns passam direto para o SPA sem impacto de performance.
 *
 * Funciona automaticamente para qualquer post, incluindo os futuros —
 * não requer novo deploy quando um post é publicado.
 */

const SITE_URL = "https://sourcemkt.com.br";

const BOT_PATTERN =
  /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Discordbot|TelegramBot|Applebot|Googlebot|bingbot|DuckDuckBot|crawler|spider|bot/i;

export const config = {
  matcher: "/blog/:slug+",
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  const userAgent = request.headers.get("user-agent") || "";

  if (!BOT_PATTERN.test(userAgent)) {
    return undefined; // passa para o SPA normalmente
  }

  const url = new URL(request.url);
  // Remove /blog/ do início para obter o slug
  const slug = url.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");

  if (!slug) return undefined;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) return undefined;

  try {
    const apiUrl =
      `${supabaseUrl}/rest/v1/blog_posts` +
      `?slug=eq.${encodeURIComponent(slug)}` +
      `&status=eq.published` +
      `&select=slug,title,excerpt,meta_title,meta_description,featured_image_url` +
      `&limit=1`;

    const res = await fetch(apiUrl, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (!res.ok) return undefined;

    const posts = await res.json();
    if (!posts.length) return undefined;

    const post = posts[0];
    const postUrl = `${SITE_URL}/blog/${slug}`;
    const title = post.meta_title || `${post.title} | SM Agency Blog`;
    const description = post.meta_description || post.excerpt || "";

    let ogImage = `${SITE_URL}/og-image.png`;
    if (post.featured_image_url) {
      ogImage = post.featured_image_url.startsWith("http")
        ? post.featured_image_url
        : `${SITE_URL}${post.featured_image_url}`;
    }

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="SM Agency" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${postUrl}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sourcemarketing" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
  <link rel="canonical" href="${postUrl}" />
  <meta http-equiv="refresh" content="0;url=${postUrl}" />
</head>
<body>
  <p><a href="${postUrl}">Clique aqui se não for redirecionado</a></p>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return undefined;
  }
}
