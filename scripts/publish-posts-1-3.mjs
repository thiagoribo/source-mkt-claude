/**
 * Republica apenas os posts 01, 02, 03 com o espaçamento adicionado.
 * Post 04 é excluído pois foi editado manualmente pelo usuário no admin.
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

const posts = [
  {
    slug: 'identidade-visual-vs-branding',
    content: readPost('post-01-identidade-visual-vs-branding.html')
  },
  {
    slug: 'diagnostico-marketing-360',
    content: readPost('post-02-diagnostico-marketing-360.html')
  },
  {
    slug: 'gestao-redes-sociais-pequenas-empresas-2026',
    content: readPost('post-03-gestao-redes-sociais-pequenas-empresas-2026.html')
  },
];

for (const post of posts) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${post.slug}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ content: post.content, updated_at: new Date().toISOString() })
  });
  const text = await res.text();
  if (res.ok) {
    console.log(`✓ Atualizado: ${post.slug}`);
  } else {
    console.log(`✗ Erro [${post.slug}] ${res.status}: ${text.substring(0, 200)}`);
  }
}
