/**
 * Prerender script — gera HTML estático por rota após vite build
 *
 * Por que isso importa:
 *   Bots do WhatsApp, LinkedIn e Facebook fazem GET simples sem executar JS.
 *   O rewrite do Vercel retorna index.html (homepage) para TODAS as rotas.
 *   Este script cria dist/[rota]/index.html com as OG tags corretas de cada página,
 *   que o Vercel serve diretamente (arquivos estáticos têm prioridade sobre rewrites).
 *
 *   Rotas do blog são geradas dinamicamente buscando posts publicados do Supabase.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "../dist");
const SITE_URL = "https://sourcemkt.com.br";

// Lê variáveis do .env.local para uso em Node.js (Vite não expõe import.meta.env aqui)
async function loadEnv() {
  const envPath = join(__dirname, "../.env.local");
  try {
    const content = await readFile(envPath, "utf8");
    const vars = {};
    for (const line of content.split("\n")) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        let val = match[2].trim();
        // Remove aspas simples ou duplas ao redor do valor
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        vars[match[1].trim()] = val;
      }
    }
    return vars;
  } catch {
    return {};
  }
}

// Busca todos os posts publicados do Supabase via REST API
async function fetchPublishedPosts(supabaseUrl, anonKey) {
  const url = `${supabaseUrl}/rest/v1/blog_posts?status=eq.published&select=slug,title,excerpt,meta_title,meta_description,featured_image_url`;
  const res = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });
  if (!res.ok) {
    console.warn(`⚠ Supabase retornou ${res.status} — pulando prerender do blog`);
    return [];
  }
  return res.json();
}

const routes = [
  {
    path: "branding-empresarial",
    title: "Branding Empresarial Estratégico | SM Agency",
    description:
      "Transforme sua empresa em uma marca reconhecida. Posicionamento, proposta de valor, tom de voz e manual de marca completo para empresas que querem dominar seu mercado.",
    ogDescription:
      "Transforme sua empresa em uma marca reconhecida. Posicionamento, proposta de valor, tom de voz e manual de marca completo.",
    url: "https://sourcemkt.com.br/branding-empresarial",
  },
  {
    path: "branding-pessoal",
    title: "Branding Pessoal para Líderes e Especialistas | SM Agency",
    description:
      "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes que querem ser reconhecidos pelo que representam.",
    ogDescription:
      "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes.",
    url: "https://sourcemkt.com.br/branding-pessoal",
  },
  {
    path: "identidade-visual",
    title: "Identidade Visual Profissional para Empresas | SM Agency",
    description:
      "Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico alinhado ao posicionamento do seu negócio.",
    ogDescription:
      "Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico.",
    url: "https://sourcemkt.com.br/identidade-visual",
  },
  {
    path: "gestao-redes-sociais",
    title: "Gestão de Redes Sociais Estratégica | SM Agency",
    description:
      "Gestão profissional de redes sociais com calendário editorial, criação de conteúdo, gestão de comunidade e relatórios de performance mensais.",
    ogDescription:
      "Gestão profissional de redes sociais com calendário editorial, criação de conteúdo e relatórios de performance mensais.",
    url: "https://sourcemkt.com.br/gestao-redes-sociais",
  },
  {
    path: "naming",
    title: "Naming Estratégico para Marcas e Produtos | SM Agency",
    description:
      "Criação de nomes estratégicos para marcas e produtos. Análise fonética, semântica, verificação de domínios disponíveis e pesquisa no INPI. Nomes construídos para durar.",
    ogDescription:
      "Criação de nomes estratégicos para marcas e produtos com verificação de domínios e pesquisa no INPI.",
    url: "https://sourcemkt.com.br/naming",
  },
  {
    path: "consultoria-estrategica",
    title: "Consultoria de Marketing Estratégico | SM Agency",
    description:
      "Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas. Identifique os gargalos que impedem seu crescimento.",
    ogDescription:
      "Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas.",
    url: "https://sourcemkt.com.br/consultoria-estrategica",
  },
  {
    path: "quem-somos",
    title: "Quem Somos | SM Agency — Agência de Branding e Marketing",
    description:
      "Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado. Branding e consultoria estratégica.",
    ogDescription:
      "Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado.",
    url: "https://sourcemkt.com.br/quem-somos",
  },
];

function escapeHtmlAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectMeta(html, route) {
  const title = escapeHtmlAttr(route.title);
  const desc = escapeHtmlAttr(route.description);
  const ogDesc = escapeHtmlAttr(route.ogDescription);
  const url = route.url;

  let result = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${desc}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${ogDesc}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`
    );

  if (route.ogImage) {
    const img = escapeHtmlAttr(route.ogImage);
    result = result
      .replace(
        /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
        `$1${img}$2`
      )
      .replace(
        /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
        `$1${img}$2`
      );
  }

  return result;
}

const template = await readFile(join(DIST, "index.html"), "utf8");
let generated = 0;

// Rotas estáticas
for (const route of routes) {
  const html = injectMeta(template, route);
  const dir = join(DIST, route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html, "utf8");
  console.log(`✓ dist/${route.path}/index.html — "${route.title}"`);
  generated++;
}

// Rotas dinâmicas — posts do blog
console.log("\nBuscando posts publicados do Supabase...");
const env = await loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.warn("⚠ VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontrados — prerender do blog ignorado.");
} else {
  const posts = await fetchPublishedPosts(supabaseUrl, anonKey);
  console.log(`  ${posts.length} posts encontrados.`);

  for (const post of posts) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const title = post.meta_title || `${post.title} | SM Agency Blog`;
    const description = post.meta_description || post.excerpt || "";

    // Garante URL absoluta para a imagem
    let ogImage = `${SITE_URL}/og-image.png`;
    if (post.featured_image_url) {
      ogImage = post.featured_image_url.startsWith("http")
        ? post.featured_image_url
        : `${SITE_URL}${post.featured_image_url}`;
    }

    const html = injectMeta(template, {
      title,
      description,
      ogDescription: description,
      url: postUrl,
      ogImage,
    });

    const dir = join(DIST, "blog", post.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), html, "utf8");
    console.log(`✓ dist/blog/${post.slug}/index.html — "${title}"`);
    generated++;
  }
}

console.log(`\nPrerender: ${generated} rotas geradas.`);
