import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://bnllshvkxxmjizaqrbpw.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGxzaHZreHhtaml6YXFyYnB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg1NjY2MCwiZXhwIjoyMDg3NDMyNjYwfQ.ZKKebkj23cFag2Fcg9k_izq9LD2h2pT2wQtHscsdwUU';

const HEADERS = {
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

// IDs from DB
const ANA_SANTOS_ID    = '7e737a97-a299-44d9-836f-349df203e5dc';
const CAT_BRANDING_ID  = 'a39f6a84-10a3-4808-ba9f-d5580c45b503';
const CAT_STRATEGY_ID  = '70ce5d38-4d35-4244-be43-044770ec8bd5';
const CAT_MARKETING_ID = 'e5aa39ab-5b90-4748-9210-ab7e7fe023f1';

function readPost(filename) {
  const raw = readFileSync(`content/blog/${filename}`, 'utf8');
  return raw.replace(/<!--[\s\S]*?-->/g, '').trim();
}

const posts = [
  {
    title: 'Identidade Visual vs Branding: Por Que Sua Empresa Precisa de Ambos',
    slug: 'identidade-visual-vs-branding',
    excerpt: 'Ter um logo bonito não é o mesmo que ter uma marca forte. Entenda a diferença entre identidade visual e branding — e por que confundi-los custa caro.',
    category_id: CAT_BRANDING_ID,
    author_id: ANA_SANTOS_ID,
    meta_title: 'Identidade Visual vs Branding: Diferenças | Source',
    meta_description: 'Descubra a diferença real entre identidade visual e branding estratégico e por que sua empresa precisa dos dois para crescer com consistência.',
    keywords: ['identidade visual vs branding', 'branding estratégico', 'identidade visual empresa', 'o que é branding', 'diferença identidade visual branding'],
    featured_image_url: '/blog/hero-identidade-visual-vs-branding.svg',
    content: readPost('post-01-identidade-visual-vs-branding.html')
  },
  {
    title: 'Diagnóstico de Marketing 360°: Por Que Sua Estratégia Isolada Não Funciona',
    slug: 'diagnostico-marketing-360',
    excerpt: 'Investir em marketing sem diagnóstico é como tomar remédio sem exame. Entenda por que estratégias isoladas drenam orçamento e como o 360° muda esse jogo.',
    category_id: CAT_STRATEGY_ID,
    author_id: null,
    meta_title: 'Diagnóstico de Marketing 360° | Source',
    meta_description: 'Descubra por que estratégias isoladas (só Meta Ads, só SEO) desperdiçam verba e como o diagnóstico marketing 360° reorganiza sua operação para gerar resultado.',
    keywords: ['diagnóstico marketing 360', 'consultoria estratégica marketing', 'marketing 360 graus', 'estratégia de marketing integrada', 'análise marketing empresa'],
    featured_image_url: '/blog/hero-diagnostico-marketing-360.svg',
    content: readPost('post-02-diagnostico-marketing-360.html')
  },
  {
    title: 'Gestão de Redes Sociais para Pequenas Empresas em 2026: Guia Completo',
    slug: 'gestao-redes-sociais-pequenas-empresas-2026',
    excerpt: 'Dados, erros e estratégias práticas para PMEs que querem transformar redes sociais em canal de vendas — não apenas de curtidas.',
    category_id: CAT_MARKETING_ID,
    author_id: ANA_SANTOS_ID,
    meta_title: 'Redes Sociais para PMEs em 2026: Guia Completo | Source',
    meta_description: 'Guia prático de gestão de redes sociais para pequenas empresas em 2026: plataformas, erros, ferramentas e quando contratar uma agência.',
    keywords: ['gestão redes sociais pequenas empresas', 'redes sociais PME', 'como gerenciar redes sociais empresa', 'gestão redes sociais 2026', 'marketing redes sociais pequena empresa'],
    featured_image_url: '/blog/hero-gestao-redes-sociais-2026.svg',
    content: readPost('post-03-gestao-redes-sociais-pequenas-empresas-2026.html')
  },
  {
    title: 'As 7 Dores de Marketing que Impedem o Crescimento da Sua PME',
    slug: '7-dores-marketing-pme',
    excerpt: '71% das empresas brasileiras não bateram suas metas de marketing em 2024. O problema raramente é o canal — é a ausência de diagnóstico estratégico.',
    category_id: CAT_STRATEGY_ID,
    author_id: null,
    meta_title: 'As 7 Dores de Marketing que Travam Sua PME | Source',
    meta_description: '71% das PMEs não bateram metas em 2024. Descubra as 7 dores de marketing que impedem o crescimento e como resolvê-las com diagnóstico estratégico.',
    keywords: ['dores marketing PME', 'problemas marketing pequenas empresas', 'por que marketing não funciona PME', 'desafios marketing empresas', 'erros marketing digital PME'],
    featured_image_url: '/blog/hero-7-dores-marketing-pme.svg',
    content: readPost('post-04-7-dores-marketing-pme.html')
  }
];

async function upsertPost(post) {
  const body = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image_url: post.featured_image_url,
    category_id: post.category_id,
    author_id: post.author_id,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    keywords: post.keywords,
    status: 'published',
    published_at: new Date().toISOString()
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?on_conflict=slug`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  const text = await res.text();
  return { ok: res.ok, status: res.status, slug: post.slug, body: text };
}

for (const post of posts) {
  const result = await upsertPost(post);
  if (result.ok) {
    console.log(`✓ Publicado: ${result.slug}`);
  } else {
    console.log(`✗ Erro [${result.slug}] ${result.status}: ${result.body.substring(0, 300)}`);
  }
}
