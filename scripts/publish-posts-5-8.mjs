/**
 * Publica os posts 05, 06, 07, 08 (segunda leva) no Supabase.
 * Usa INSERT via upsert com todos os campos obrigatórios.
 */
import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://bnllshvkxxmjizaqrbpw.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGxzaHZreHhtaml6YXFyYnB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg1NjY2MCwiZXhwIjoyMDg3NDMyNjYwfQ.ZKKebkj23cFag2Fcg9k_izq9LD2h2pT2wQtHscsdwUU';

const HEADERS = {
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

const ANA_SANTOS_ID    = '7e737a97-a299-44d9-836f-349df203e5dc';
const CAT_BRANDING_ID  = 'a39f6a84-10a3-4808-ba9f-d5580c45b503';
const CAT_STRATEGY_ID  = '70ce5d38-4d35-4244-be43-044770ec8bd5';
const CAT_MARKETING_ID = 'e5aa39ab-5b90-4748-9210-ab7e7fe023f1';

function readPost(filename) {
  const raw = readFileSync(`content/blog/${filename}`, 'utf8');
  return raw.replace(/<!--[\s\S]*?-->/g, '').trim();
}

const now = new Date().toISOString();

const posts = [
  {
    slug: 'o-que-e-naming',
    title: 'O Que É Naming e Por Que o Nome Certo Vale Mais do Que Você Imagina',
    excerpt: 'Naming não é criatividade aleatória — é estratégia. Descubra como o nome certo posiciona sua marca, facilita vendas e se torna seu ativo mais durável.',
    content: readPost('post-05-o-que-e-naming.html'),
    featured_image_url: '/blog/hero-o-que-e-naming.svg',
    author_id: ANA_SANTOS_ID,
    category_id: CAT_BRANDING_ID,
    status: 'published',
    meta_title: 'O Que É Naming e Por Que o Nome da Marca Importa | Source',
    meta_description: 'Naming é a disciplina que cria o nome certo para sua marca. Entenda o processo, os critérios de um bom nome e por que o nome errado trava o crescimento.',
    keywords: ['o que é naming', 'naming de marca', 'criar nome de empresa', 'processo de naming', 'nomenclatura marca', 'naming agência'],
    published_at: now,
    created_at: now,
    updated_at: now,
  },
  {
    slug: 'como-calcular-roi-marketing-pme',
    title: 'Como Calcular o ROI de Marketing da Sua PME (e Por Que a Maioria Erra)',
    excerpt: 'A maioria das PMEs investe em marketing sem saber quanto retorna. Aprenda as fórmulas, os KPIs certos e como montar um painel de ROI que orienta decisões reais.',
    content: readPost('post-06-como-calcular-roi-marketing-pme.html'),
    featured_image_url: '/blog/hero-como-calcular-roi-marketing-pme.svg',
    author_id: null,
    category_id: CAT_STRATEGY_ID,
    status: 'published',
    meta_title: 'Como Calcular o ROI de Marketing da Sua PME | Source',
    meta_description: 'Aprenda a calcular o ROI de marketing com fórmulas práticas. Descubra os KPIs que toda PME deve acompanhar e por que a maioria erra na hora de medir resultado.',
    keywords: ['como calcular roi marketing', 'roi marketing pme', 'retorno sobre investimento marketing', 'kpis marketing', 'como medir resultado marketing', 'roi de campanhas'],
    published_at: now,
    created_at: now,
    updated_at: now,
  },
  {
    slug: 'instagram-para-empresas-2026',
    title: 'Instagram para Empresas em 2026: Algoritmo, Formatos e o Que Realmente Converte',
    excerpt: 'O Instagram deixou de ser vitrine e virou canal de vendas. Entenda como o algoritmo funciona em 2026, quais formatos performam e como PMEs brasileiras usam a plataforma para converter.',
    content: readPost('post-07-instagram-para-empresas-2026.html'),
    featured_image_url: '/blog/hero-instagram-para-empresas-2026.svg',
    author_id: ANA_SANTOS_ID,
    category_id: CAT_MARKETING_ID,
    status: 'published',
    meta_title: 'Instagram para Empresas 2026: o Que Converte | Source',
    meta_description: 'O algoritmo do Instagram mudou em 2026. Saiba quais formatos convertem mais, como PMEs brasileiras usam a plataforma para vender e o que fazer diferente.',
    keywords: ['instagram para empresas', 'instagram business 2026', 'algoritmo instagram 2026', 'instagram para PME', 'como vender pelo instagram', 'reels instagram empresas'],
    published_at: now,
    created_at: now,
    updated_at: now,
  },
  {
    slug: 'meta-ads-pequenas-empresas',
    title: 'Meta Ads para Pequenas Empresas: Quanto Investir e Como Escalar em 2026',
    excerpt: 'Meta Ads pode ser o canal de aquisição mais eficiente para PMEs — ou um dreno de orçamento sem retorno. A diferença está na estrutura. Veja quanto investir e como escalar com segurança.',
    content: readPost('post-08-meta-ads-pequenas-empresas.html'),
    featured_image_url: '/blog/hero-meta-ads-pequenas-empresas.svg',
    author_id: null,
    category_id: CAT_STRATEGY_ID,
    status: 'published',
    meta_title: 'Meta Ads para PMEs: Quanto Investir e Escalar | Source',
    meta_description: 'Quanto investir no Meta Ads sendo PME? Estrutura de campanhas, orçamento mínimo recomendado e como escalar sem desperdiçar verba em 2026.',
    keywords: ['meta ads pequenas empresas', 'facebook ads pequenas empresas', 'quanto investir meta ads', 'meta ads brasil 2026', 'facebook ads pme', 'anuncios instagram pequenas empresas'],
    published_at: now,
    created_at: now,
    updated_at: now,
  },
];

for (const post of posts) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?on_conflict=slug`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(post)
  });
  const text = await res.text();
  if (res.ok) {
    console.log(`✓ Publicado: ${post.slug}`);
  } else {
    console.log(`✗ Erro [${post.slug}] ${res.status}: ${text.substring(0, 300)}`);
  }
}
