# source-mkt-claude — Documentação do Projeto

> SM Agency — Site corporativo de agência de marketing com painel administrativo completo.

---

## Visão Geral

| Item | Detalhe |
|------|---------|
| Stack | React 18 + TypeScript 5.8 + Vite 5.4 + TailwindCSS 3.4 |
| Componentes UI | ShadCN/UI (Radix primitives) |
| Carrossel | Embla Carousel |
| Animações | Framer Motion + CSS custom |
| Formulários | React Hook Form + Zod |
| State/Data | TanStack React Query |
| Banco de dados | Supabase (PostgreSQL + Auth + Storage) |
| Editor | TipTap |
| Deploy | GitHub (`thiagoribo/source-mkt-claude`) → Vercel (auto-deploy) |
| Branch produção | `main` |
| Branch dev | `develop` |

---

## Estrutura de Pastas

```
src/
├── App.tsx                    # Roteamento (React Router 6)
├── index.css                  # Design tokens + CSS global
├── main.tsx                   # Entry point
│
├── assets/
│   ├── logo-header.svg / logo-footer.svg / logo-sm.png
│   ├── ana-*.jpeg/svg, thiago-*.png, team-*.png
│   ├── cases/
│   │   ├── branding/          (2 imagens: LIKE.Brand)
│   │   ├── branding-pessoal/  (4 cases)
│   │   ├── consultoria/       (2 imagens: START, STDI)
│   │   ├── identidade-visual/ (3 imagens)
│   │   ├── gestao-redes/
│   │   │   ├── like.png, jaqueline-vieira.png, lisia-heinen.png
│   │   │   └── depoimentos/   (dep-1.png … dep-9.png)
│   │   └── naming/            (3 imagens)
│   ├── clientes/              (23 fotos de clientes)
│   └── equipe/                (5 membros)
│
├── components/
│   ├── layout/
│   │   ├── Layout.tsx         # Header + main + Footer
│   │   ├── Header.tsx         # Nav fixa, scroll-hide/show, menus dropdown, CTA WhatsApp
│   │   └── Footer.tsx         # Grid 5-col, social links, CTA
│   ├── shared/
│   │   ├── AnimatedNumber.tsx # Números animados com IntersectionObserver
│   │   ├── CasesCarousel.tsx  # Carrossel Embla com nav prev/next
│   │   ├── ComparisonTable.tsx# Tabela antes/depois com ícones
│   │   ├── ResponsiveImage.tsx# Wrapper com lazy loading otimizado
│   │   ├── RevealSection.tsx  # Animação reveal ao scroll
│   │   └── ServiceMockupCard.tsx # Card de case com 5 temas, fit prop
│   ├── ui/                    # 43+ componentes ShadCN/UI
│   ├── admin/                 # AdminLayout, AdminSidebar, ProtectedRoute
│   └── blog/                  # (componentes inline nas páginas)
│
├── contexts/
│   └── AuthContext.tsx        # Supabase Auth context
│
├── data/
│   └── serviceMockups.ts      # Dados mockados de cases e serviços
│
├── hooks/
│   ├── use-mobile.tsx
│   ├── useScrollReveal.ts
│   ├── useSubmitLead.ts       # Submissão para CRM Supabase
│   ├── useMediaUpload.ts
│   └── queries/               # React Query hooks por entidade
│       ├── useCases.ts
│       ├── useTeamMembers.ts
│       ├── useTestimonials.ts
│       ├── useBlogPosts.ts
│       └── useBlogCategories.ts
│
├── lib/
│   ├── utils.ts               # cn() helper para Tailwind
│   ├── supabase.ts            # Cliente Supabase principal
│   └── supabase-crm.ts        # Cliente CRM separado
│
├── pages/
│   ├── Index.tsx              # Homepage
│   ├── ConsultoriaEstrategica.tsx
│   ├── BrandingEmpresarial.tsx
│   ├── BrandingPessoal.tsx
│   ├── IdentidadeVisual.tsx
│   ├── GestaoRedesSociais.tsx
│   ├── Naming.tsx
│   ├── QuemSomos.tsx
│   ├── NotFound.tsx
│   ├── admin/                 # Login, Dashboard, CRUD pages
│   └── blog/                  # BlogIndex, BlogPost
│
└── types/
    ├── database.ts            # Tipos do Supabase
    └── lead.ts                # Tipos de formulário/leads
```

---

## Rotas

```
/                              Homepage
/consultoria-estrategica       Consultoria Estratégica
/branding-empresarial          Branding Empresarial
/branding-pessoal              Branding Pessoal
/identidade-visual             Identidade Visual
/gestao-redes-sociais          Gestão de Redes Sociais
/naming                        Naming
/quem-somos                    Quem Somos
/blog                          Blog
/blog/:slug                    Post individual

/admin                         Login
/admin/dashboard               Dashboard
/admin/team                    Equipe
/admin/testimonials            Depoimentos
/admin/cases                   Cases
/admin/media                   Mídia
/admin/settings                Configurações
/admin/blog                    Posts
/admin/blog/new                Novo Post
/admin/blog/:id                Editar Post
/admin/blog/categories         Categorias
```

---

## Design System

### Identidade Visual

Estilo: **Editorial Luxury Brutalist**
- Sem bordas arredondadas (`borderRadius: 0px` global)
- Tipografia serif para títulos + sans para corpo
- Paleta neutra com acento dourado

### Fontes (Google Fonts)

| Família | Uso |
|---------|-----|
| Montserrat 700 | H1, H2, H3 (bold, forte, contemporâneo) |
| DM Sans | H4–H6, corpo, UI |
| DM Mono | Labels, tags, monoespaçado |

```css
font-display   → Montserrat, sans-serif (weight: 700)
font-sans      → DM Sans, sans-serif
font-mono      → DM Mono, monospace
```

### Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--background` | `#F2F0EB` | Fundo da página |
| `--foreground` | `#141414` | Texto principal |
| `--primary` | `#212E3F` | Navy — botões, headers |
| `--primary-foreground` | `#F0ECE3` | Texto sobre primary |
| `--secondary` | `#E8E4DD` | Backgrounds secundários |
| `--accent` | `#DCB464` | Dourado — destaques |
| `--border` | `rgba(0,0,0,0.1)` | Bordas |
| `--muted` | `#F5F3EE` | Backgrounds sutis |

Variáveis CSS: `hsl(--nome)` → usar com `bg-background`, `text-foreground`, `border-border`, etc.

### Espaçamento Fluido

```css
.section-spacing  → padding-top/bottom: clamp(3rem, 2rem + 5vw, 6rem)
.container-sm     → max-w-7xl mx-auto, padding fluido
```

Usar sempre `.section-spacing` para espaçamento vertical de seções.

### Tipografia Fluida

```css
--text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)
--text-sm:   clamp(0.875rem, 0.825rem + 0.25vw, 1rem)
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
--text-4xl:  clamp(2.25rem, 1.8rem + 2.25vw, 3.5rem)
```

### Classes Utilitárias Customizadas

```css
.section-spacing     → Espaçamento padrão de seção
.container-sm        → Container centralizado com padding fluido
.mockup-frame        → Gradiente para frames de mockup
.mockup-gloss        → Efeito gloss ::after
.grain               → Textura noise no fundo
.accent-border       → Barra dourada ::before (60px × 3px)
```

### Breakpoints

```
sm: 640px   → Tablet pequeno
md: 768px   → Tablet
lg: 1024px  → Desktop
xl: 1280px  → Desktop grande
2xl: 1536px → Wide
```

---

## Componentes Principais

### Header — Comportamento de Scroll

O header esconde ao descer e reaparece ao subir (scroll-hide/show):

- `visible = false` → `scrollY` descendo > 4px e posição > 80px
- `visible = true` → `scrollY` subindo > 4px **ou** posição < 80px (topo)
- Transição CSS `translate-y` (`duration-300`)

```tsx
// Hook interno em Header.tsx
const lastScrollY = useRef(0);
// diff > 4  → esconde
// diff < -4 → mostra
// scrollY < 80 → sempre mostra
```

Não alterar os thresholds (4px / 80px) sem testar no mobile — valores menores causam flickering.

### RevealSection

Animação ao entrar no viewport.

```tsx
<RevealSection variant="up" delay={0.1}>
  <p>Conteúdo animado</p>
</RevealSection>
```

Variantes: `up` | `down` | `left` | `right` | `fade` | `scale`

### ServiceMockupCard

Card de case com tema e fit configuráveis.

```tsx
<ServiceMockupCard
  title="Nome do cliente"
  subtitle="Subtítulo"
  tag="CASE"
  evidence="Resultado obtido"
  imageSrc={imagemImportada}
  ratio="16/10"
  theme="branding"
  fit="contain"   // "cover" (padrão) | "contain" (sem corte)
/>
```

Temas: `branding` | `social` | `naming` | `visual` | `personal`

### CasesCarousel

Carrossel Embla com controles prev/next.

```tsx
<CasesCarousel items={gestaoSocialCases} />
```

Interface do item em `src/data/serviceMockups.ts`.

### AnimatedNumber

```tsx
<AnimatedNumber value={100} suffix="+" duration={1200} />
<AnimatedNumber value={3} prefix="×" />
<AnimatedNumber value={95} suffix="%" />
```

### ComparisonTable

```tsx
<ComparisonTable
  before={["Item ruim 1", "Item ruim 2"]}
  after={["Item bom 1", "Item bom 2"]}
/>
```

---

## Padrão de Página de Serviço

Cada página de serviço segue estrutura similar:

```tsx
export default function NomeServico() {
  return (
    <>
      <Helmet><title>...</title></Helmet>
      <Layout>
        <Hero />
        <AntesDepois />       {/* Problema vs. Solução */}
        <Processo />          {/* Etapas do serviço */}
        <Entregaveis />       {/* O que o cliente recebe */}
        <OQueFalamDeNos />    {/* Depoimentos/screenshots */}
        <PreviewOperacao />   {/* Mockups/cases */}
        <Investimento />      {/* Preços e pacotes */}
        <Depoimentos />       {/* Cards de clientes */}
        <Formulario />        {/* Formulário de contato */}
      </Layout>
    </>
  );
}
```

### ConsultoriaEstrategica.tsx — Posicionamento e ordem atual

**Posicionamento:** Diagnóstico de marketing 360° — avalia Meta Ads, Google Ads, funil de conversão, gestão de leads, posicionamento de marca, comunicação cross-channel e alinhamento marketing+vendas.

**Ordem das seções:**
1. Hero — tagline focada em conversão ("Quanto está convertendo?"), não em liderança de mercado
2. **Sintomas** *(nova)* — 6 cenários de dor concretos (ativação antes da qualificação)
3. **OQueAnalisamos** *(nova)* — 7 pilares do diagnóstico 360° em grid de cards
4. ParaQuemE — 8 critérios (inclui tráfego pago sem ROI e marketing+vendas desalinhados)
5. Metodologia — Fase 01 inclui auditoria de Meta/Google Ads e fluxo de leads explicitamente
6. Modalidades
7. Liderança
8. CasesConsultoria — challenges reescritos com contexto de performance/leads
9. FAQ — inclui perguntas sobre análise de ads e alinhamento marketing+vendas
10. FormularioQualificacao

---

### GestaoRedesSociais.tsx — Ordem atual

1. Hero
2. AntesDepois
3. Processo
4. Entregaveis
5. **OQueFalamDeNos** (carrossel com dep-1 a dep-9)
6. PreviewOperacao
7. Investimento
8. Depoimentos
9. Formulario

---

## Carrossel Embla — Padrão de Implementação

```tsx
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

function MeuCarrossel({ items }: { items: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-3 md:-ml-5">
          {items.map((src, i) => (
            <div key={i} className="pl-3 md:pl-5 min-w-0 shrink-0 grow-0 basis-4/5 sm:basis-1/2 lg:basis-1/3">
              {/* conteúdo do slide */}
            </div>
          ))}
        </div>
      </div>
      {/* Controles */}
      <div className="flex items-center justify-between mt-5">
        <span className="text-xs font-mono text-foreground/40">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canScrollPrev}
            className="w-10 h-10 border border-border disabled:opacity-25">
            ←
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canScrollNext}
            className="w-10 h-10 bg-primary text-primary-foreground disabled:opacity-25">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Responsividade padrão de slides:**
- Mobile: `basis-4/5` (80% da largura)
- Tablet: `sm:basis-1/2`
- Desktop: `lg:basis-1/3`

---

## Dados Mockados (serviceMockups.ts)

```typescript
interface ServiceMockupItem {
  title: string;
  subtitle: string;
  tag: string;
  evidence: string;
  imageSrc: string;
  ratio: "4/3" | "16/10" | "3/4";
  theme: "branding" | "social" | "naming" | "visual" | "personal";
  fit?: "cover" | "contain";
}
```

**Arrays disponíveis:**
- `brandingEmpresarialMockups[]` — 3 cases
- `identidadeVisualMockups[]` — 3 cases
- `gestaoSocialCases[]` — 3 cases (fit: "contain")
- `socialEditorialCycle[]` — estratégia editorial
- `socialDashboardKpis[]` — KPIs de exemplo
- `namingCases[]` — 3 cases
- `namingScorecard[]` — 5 métricas
- `brandingPessoalResults[]` — 4 cases

---

## Formulários e Leads

Cada página de serviço envia leads ao CRM Supabase via hook `useSubmitLead`:

```typescript
const { submit, isLoading } = useSubmitLead("gestao-redes-sociais");

// FormSource disponíveis:
type FormSource =
  | "consultoria-estrategica"
  | "branding-empresarial"
  | "branding-pessoal"
  | "identidade-visual"
  | "naming"
  | "gestao-redes-sociais"
```

---

## Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_CRM_SUPABASE_URL=https://...
VITE_CRM_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## Fluxo de Deploy

```bash
# 1. Desenvolvimento
npm run dev               # localhost:8080

# 2. Antes de commitar — sempre verificar o build
npm run build

# 3. Commit e push para develop
git add src/...
git commit -m "feat: descrição"
git push origin develop

# 4. Deploy para produção
git checkout main
git merge develop
git push origin main      # Vercel faz deploy automático
```

---

## OG Tags / Compartilhamento em Redes Sociais

### Como funciona (duas camadas)

**Camada 1 — Prerender no build** (`scripts/prerender.mjs`):
- Gera `dist/blog/[slug]/index.html` para cada post publicado no Supabase no momento do deploy
- Também gera HTML estático para todas as 7 rotas de serviço
- O Vercel serve esses arquivos estáticos antes dos rewrites → bots recebem HTML correto instantaneamente

**Camada 2 — Edge Middleware** (`middleware.ts`, raiz do projeto):
- Intercepta requests de bots sociais (LinkedIn, WhatsApp, Facebook, etc.) para `/blog/*`
- Busca dados do post em tempo real via Supabase REST API
- Retorna HTML mínimo com OG tags corretas para posts que não têm arquivo estático (publicados após o último deploy)
- Usuários normais não são afetados — passam direto para o SPA

### O que isso significa na prática

- **Posts existentes no deploy**: servidos pela Camada 1 (arquivo estático, máxima velocidade)
- **Posts novos publicados após deploy**: cobertos pela Camada 2 automaticamente, sem precisar de novo deploy
- **Resultado**: qualquer post compartilhado no LinkedIn/WhatsApp/etc. sempre mostra título, descrição e imagem do post

### OG image dos posts de blog
- Campo `featured_image_url` no Supabase: caminho relativo (ex: `/blog/hero-slug.svg`)
- Ambas as camadas convertem para URL absoluta: `https://sourcemkt.com.br/blog/hero-slug.svg`
- Fallback se não houver imagem: `https://sourcemkt.com.br/og-image.png`

---

## Adicionando Imagens ao Projeto

Imagens devem estar dentro de `src/assets/` para o Vite bundlar corretamente.

```bash
# Imagens brutas ficam em (fora do src):
Clientes/
Brand/
Equipe/

# Copiar para src/assets antes de importar:
cp "Clientes/Gestão de Redes Sociais/O que falam de nos/1.png" src/assets/cases/gestao-redes/depoimentos/dep-1.png
```

**Import estático no componente:**
```tsx
import dep1 from "@/assets/cases/gestao-redes/depoimentos/dep-1.png";
```

---

## Padrões de Código

### Seção com título padrão

```tsx
<section className="section-spacing bg-background">
  <div className="container-sm max-w-5xl">
    <RevealSection>
      <div className="mb-10 space-y-3">
        <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">
          Label
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">Título da Seção</h2>
        <p className="text-foreground/55 text-sm max-w-xl">
          Descrição breve.
        </p>
      </div>
    </RevealSection>
    {/* conteúdo */}
  </div>
</section>
```

### Responsividade

- Mobile-first sempre
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Texto: `text-2xl md:text-3xl lg:text-4xl`
- Gaps: `gap-4 md:gap-6 lg:gap-8`
- Padding: `px-4 md:px-8` ou usar `container-sm`

### Opacidades de texto

```
text-foreground          → Texto principal
text-foreground/70       → Secundário
text-foreground/55       → Terciário
text-foreground/40       → Labels/captions
```

---

## Componentes ShadCN Mais Usados

| Componente | Import |
|------------|--------|
| Button | `@/components/ui/button` |
| Input | `@/components/ui/input` |
| Card | `@/components/ui/card` |
| Dialog | `@/components/ui/dialog` |
| Form | `@/components/ui/form` |
| Tabs | `@/components/ui/tabs` |
| Badge | `@/components/ui/badge` |
| Separator | `@/components/ui/separator` |
| Accordion | `@/components/ui/accordion` |
| Select | `@/components/ui/select` |

Para adicionar novo componente ShadCN:
```bash
npx shadcn@latest add [componente]
```

---

## Ícones

Usar **Lucide React** (já instalado):
```tsx
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
```

---

## Contato e Integração WhatsApp

```
Número: (11) 93729-2921
Link: https://wa.me/5511937292921?text=...
```

---

## Observações Importantes

1. **`object-contain` vs `object-cover`**: Usar `fit="contain"` no `ServiceMockupCard` quando a imagem não pode ser cortada (ex: screenshots de feed de redes sociais).
2. **Imagens grandes**: As 9 imagens de depoimentos têm ~1-2MB cada. Considerar compressão futura com WebP.
3. **CasesCarousel vs carrossel inline**: O `CasesCarousel` usa dados do `serviceMockups.ts`. Para carrosseis com imagens próprias (como `OQueFalamDeNos`), implementar diretamente na página.
4. **TypeScript relaxado**: `noImplicitAny: false` e `strictNullChecks: false` — o projeto aceita tipos menos rígidos para facilitar desenvolvimento rápido.
5. **Supabase opcional**: Todas as queries têm fallback para dados mockados quando o Supabase não está configurado.

---

## Blog — Regras de Conteúdo HTML

### Espaçamento obrigatório entre blocos

**Todo post de blog criado ou editado por IA deve ter `<p></p>` entre cada bloco de conteúdo.** Isso garante legibilidade visual consistente no site.

Padrão obrigatório para todos os arquivos em `content/blog/`:

```html
<!-- CORRETO — com separadores -->
<p>Parágrafo introdutório.</p>

<p></p>

<h2>Título da Seção</h2>

<p></p>

<p>Primeiro parágrafo da seção.</p>

<p></p>

<p>Segundo parágrafo.</p>

<p></p>

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<p></p>

<h2>Próxima Seção</h2>

<!-- ERRADO — sem separadores -->
<p>Parágrafo introdutório.</p>
<h2>Título da Seção</h2>
<p>Primeiro parágrafo da seção.</p>
```

**Razão técnica:** TipTap serializa linhas em branco como `<p></p>`. O CSS `prose` do Tailwind sofre de margin collapse em parágrafos vazios. O fix já está aplicado em `BlogPost.tsx` com `[&_p:empty]:min-h-[1.5em]`. Sem o `<p></p>` no HTML, não há espaço visual entre os blocos.

### Script de espaçamento automático

Para posts já existentes sem espaçamento:
```bash
node scripts/add-blog-spacing.mjs  # aplica aos posts 01-03
```

### Atualizar conteúdo de post existente via script

Usar PATCH com filtro por slug (não POST/upsert — o upsert tenta inserir com campos nulos):
```js
fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.{slug}`, {
  method: 'PATCH',
  headers: HEADERS,
  body: JSON.stringify({ content: novoHTML, updated_at: new Date().toISOString() })
})
```
