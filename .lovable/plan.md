

# SM Agency — Site Corporativo Premium

## Visão Geral
Site corporativo de alta sofisticação para a SM Agency (Source Marketing Agency), consultoria de branding e marketing para empresas estabelecidas. O objetivo é posicionar a empresa no segmento high-ticket, comunicando autoridade e criando barreiras naturais de qualificação para leads.

---

## Fase 1: Fundação e Homepage (implementação inicial)

### Design System
- **Paleta**: Azul petróleo (#0A4D68) como primária, cinza carvão (#2C2C2C), cinza claro (#F5F5F5), acento laranja (#E07B39) apenas para micro-interações, branco e preto
- **Tipografia**: Fonte serif elegante (Playfair Display) para headings, sans-serif limpa (Inter) para body text
- **Estilo**: Cantos arredondados suaves (8-12px), sombras sutis, espaçamento generoso (120-150px entre seções), muito branco, animações sutis de fade-in no scroll
- **Logos**: Usar a versão "sm." no header (fundo azul petróleo) e variações conforme contexto

### Componentes Globais
- **Header fixo** com logo SM à esquerda, navegação centralizada com dropdowns (Branding → Empresarial/Pessoal e Serviços → Identidade Visual/Gestão Redes/Naming), CTA "Agendar Diagnóstico" à direita
- **Footer** com 3 colunas: logo + redes sociais, links rápidos, contato (email, WhatsApp, "Atendimento em todo Brasil"), rodapé com CNPJ e copyright
- **Menu hamburguer** responsivo no mobile

### Homepage (/)
1. **Hero Section**: Título "Sua empresa é sólida. Sua marca ainda não comunica isso." com subtítulo qualificador, dois CTAs (primário azul petróleo + secundário outline), foto da Ana ou Thiago à direita
2. **Autoridade e Credenciais**: 3 colunas — Estratégia 360°, Execução sem Fricção, Resultados Mensuráveis
3. **Liderança Estratégica**: Fotos e bios da Ana Santos e Thiago Bianchi lado a lado com suas especializações
4. **Serviços Principais**: 3 cards grandes com valores (Consultoria a partir de R$48k, Branding Empresarial R$25k, Branding Pessoal R$18k)
5. **Serviços Especializados**: 3 cards menores e mais discretos (Identidade Visual, Gestão de Redes, Naming)
6. **Cases de Transformação**: 3 cards com placeholder para cases futuros
7. **Prova Social**: Carrossel de depoimentos com placeholders
8. **CTA Final**: Background azul petróleo com "Agendar Diagnóstico Gratuito"

---

## Fase 2: Páginas de Serviços Principais

### Consultoria Estratégica (/consultoria-estrategica)
- Hero com qualificação explícita (faturamento acima de R$500k/ano)
- Seção "Para Quem É" com checklist de critérios e box de capacidade limitada (6 empresas/trimestre)
- Metodologia em 5 fases com timeline visual (Auditoria → Desenvolvimento → Performance → Roadmap → Acompanhamento)
- Tabela comparativa de 3 modalidades (Remota, Híbrida, Presencial)
- 3 boxes de investimento (Essencial R$35-48k, Completa R$55-75k, Hands-On R$85-140k)
- Accordion de detalhamento de precificação
- Liderança do projeto (Ana e Thiago)
- FAQ com accordion
- Formulário extenso de qualificação (nome, email, empresa, cargo, faturamento, escopo, modalidade, budget, timeline)

### Branding Empresarial (/branding-empresarial)
- Hero + explicação do que é branding empresarial
- Antes/Depois comparativo (Sem vs Com branding estratégico)
- Processo em 5 etapas (Diagnóstico → Estruturação → Posicionamento → Tom de Voz → Manual)
- Grid do que está incluído (6 itens com ícones)
- Investimento a partir de R$25k, prazo 6-8 semanas
- Box comparativo "Branding vs Consultoria"
- Formulário de contato simplificado

### Branding Pessoal (/branding-pessoal)
- Hero focado em líderes e especialistas
- Antes/Depois comparativo
- Processo em 5 etapas
- "Para Quem É" com checklist
- Investimento a partir de R$18k, 5-7 semanas
- Depoimento destacado
- Formulário de contato

---

## Fase 3: Páginas Complementares

### Quem Somos (/quem-somos)
- Hero institucional "Transformamos Negócios em Marcas de Referência"
- Nossa História narrativa (fundação e evolução da SM)
- 3 valores fundamentais (Profundidade, Transparência, Resultados)
- Perfis aprofundados de Ana e Thiago com bios completas e mini-galerias
- Seção "Equipe de Estrategistas"
- Números de impacto (10+ anos, 100+ marcas, 6 projetos/trimestre)
- Portfolio com filtros por categoria
- CTA final

### Identidade Visual (/identidade-visual)
- Hero com box de atenção (serviço para quem já tem estratégia definida)
- Antes/Depois, processo em 5 etapas
- Grid de entregáveis, investimento a partir de R$8k
- Portfolio visual

### Gestão de Redes Sociais (/gestao-redes-sociais)
- Mesma estrutura, com box indicando necessidade de posicionamento prévio
- Foco em conteúdo estratégico alinhado à marca

### Naming (/naming)
- Mesma estrutura das páginas de serviço especializado
- Foco em criação de nomes únicos e estratégicos

---

## Aspectos Técnicos
- **Formulários**: Validação com Zod, campos obrigatórios marcados, sem backend inicialmente (placeholder para integração futura)
- **Animações**: Fade-in no scroll via Intersection Observer, hover com elevação nos botões e sombra nos cards
- **Responsividade**: Mobile-first, breakpoints em 768px e 1024px
- **SEO**: Meta titles/descriptions únicos por página, headers semânticos, URLs amigáveis em português
- **Acessibilidade**: Contraste WCAG AA, labels em formulários, navegação por teclado
- **Sem backend necessário inicialmente** — formulários podem ser conectados futuramente via Supabase ou serviço externo

