

## Plano de Implementacao

### 1. Botoes Secundarios (Outline) - Estilo Global

Atualizar a variante `outline` no componente `Button` (`src/components/ui/button.tsx`) para aplicar o novo estilo em todo o site:

- Border: 2px solida em azul petroleo (cor primary)
- Texto: azul petroleo (cor primary)  
- Padding: 16px horizontal, 12px vertical
- Border-radius: 6px
- Hover: background azul petroleo, texto branco
- Transicao: 0.3s ease

### 2. Header - Fundo Escuro com Contraste

Transformar o header (`src/components/layout/Header.tsx`) para usar fundo escuro (azul petroleo ou preto) com textos em branco, criando contraste com a logo:

- Background: azul petroleo `#0A4D68` (cor primary)
- Textos de navegacao: branco
- Hover dos links: branco com opacidade ou accent
- Logo: altura 40px desktop, 32px mobile (ja e link para homepage)
- Botao CTA do header: branco com texto azul petroleo (invertido)
- Dropdowns: manter fundo escuro consistente com textos claros

### Detalhes Tecnicos

**Arquivo `src/components/ui/button.tsx`:**
- Variante `outline`: alterar para `border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300`
- Tamanho default: ajustar padding para `px-4 py-3`
- Border-radius: `rounded-[6px]`

**Arquivo `src/components/layout/Header.tsx`:**
- Classe do `<header>`: trocar `bg-background/95` por `bg-primary` (azul petroleo)
- Border inferior: remover ou tornar sutil (`border-primary/20`)
- Links de navegacao: `text-white/80 hover:text-white`
- Link bold (Consultoria): `text-white font-semibold`
- Botao chevron dos dropdowns: `text-white/80`
- Logo: `h-10 md:h-10` no desktop (40px), adicionar classe responsiva `h-8` no mobile (32px). Adicionar `brightness-0 invert` para garantir que a logo fique branca sobre fundo escuro
- Botao CTA: `bg-white text-primary hover:bg-white/90`
- Dropdown menus: `bg-primary border-white/20` com links `text-white/80 hover:text-white`
- Menu mobile: fundo `bg-primary` com textos brancos

**Arquivo `src/pages/Index.tsx`:**
- Verificar se os botoes outline existentes na hero ja usam classes inline que precisam ser ajustadas para herdar o novo estilo global

